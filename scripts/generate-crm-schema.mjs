import ts from 'typescript'
import { readdirSync, writeFileSync } from 'node:fs'
import { join, relative } from 'node:path'

const files = []

function collect(dir) {
    for (const item of readdirSync(dir, { withFileTypes: true })) {
        const path = join(dir, item.name)

        if (item.isDirectory()) collect(path)
        else if (path.endsWith('.ts')) files.push(path)
    }
}

collect('src/api')

const program = ts.createProgram(files, {
    strict: true,
    target: ts.ScriptTarget.ES2022,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    module: ts.ModuleKind.ESNext,
    skipLibCheck: true,
})

const checker = program.getTypeChecker()

function schema(type, name, optional = false, depth = 0) {
    let nullable = false

    if (type.isUnion()) {
        const members = type.types.filter(
            (t) => !(t.flags & (ts.TypeFlags.Undefined | ts.TypeFlags.Null)),
        )

        nullable = type.types.some((t) => t.flags & ts.TypeFlags.Null)

        if (members.length === 1) type = members[0]
        else if (members.every((t) => t.flags & ts.TypeFlags.StringLiteral))
            return {
                name,
                kind: 'enum',
                optional,
                nullable,
                choices: members.map((t) => t.value),
            }
        else if (members.every((t) => t.flags & ts.TypeFlags.BooleanLiteral))
            return { name, kind: 'boolean', optional, nullable }
    }

    const base = { name, optional, nullable }

    if (type.flags & ts.TypeFlags.StringLiteral)
        return { ...base, kind: 'enum', choices: [type.value] }

    if (type.flags & ts.TypeFlags.StringLike) return { ...base, kind: 'string' }

    if (type.flags & ts.TypeFlags.NumberLike) return { ...base, kind: 'number' }

    if (type.flags & ts.TypeFlags.BooleanLike)
        return { ...base, kind: 'boolean' }

    if (type.symbol?.name === 'File') return { ...base, kind: 'file' }

    if (checker.isArrayType(type))
        return {
            ...base,
            kind: 'array',
            item: schema(
                checker.getIndexTypeOfType(type, ts.IndexKind.Number),
                'item',
                false,
                depth + 1,
            ),
        }

    if (
        depth > 5 ||
        !type.getProperties().length ||
        checker.getIndexTypeOfType(type, ts.IndexKind.String)
    )
        return { ...base, kind: 'json' }

    return {
        ...base,
        kind: 'object',
        fields: type
            .getProperties()
            .map((p) =>
                schema(
                    checker.getTypeOfSymbolAtLocation(
                        p,
                        p.valueDeclaration ?? p.declarations[0],
                    ),
                    p.name,
                    !!(p.flags & ts.SymbolFlags.Optional),
                    depth + 1,
                ),
            ),
    }
}

let imports = "import type { Operation } from '../types'\n"

const operations = []

for (const path of files.filter((f) => f.endsWith('.api.ts')).sort()) {
    const source = program.getSourceFile(path)

    const resource = path.split('/').at(-2)

    let api

    function visit(node) {
        if (
            ts.isVariableDeclaration(node) &&
            node.initializer &&
            ts.isObjectLiteralExpression(node.initializer)
        ) {
            api = node.name.getText(source)

            imports += `import { ${api} } from '../../../api/${relative('src/api', path).replace(/\.ts$/, '')}'\n`

            for (const prop of node.initializer.properties) {
                if (
                    !ts.isPropertyAssignment(prop) ||
                    !ts.isArrowFunction(prop.initializer)
                )
                    continue

                const method = prop.name.getText(source)

                const fn = prop.initializer

                const args = fn.parameters
                    .filter((p) => p.name.getText(source) !== 'options')
                    .map((p) =>
                        schema(
                            checker.getTypeAtLocation(p),
                            p.name.getText(source),
                            !!p.questionToken || !!p.initializer,
                        ),
                    )

                const comment =
                    prop
                        .getFullText(source)
                        .match(/\/\*\*([\s\S]*?)\*\//)?.[1] ?? ''

                const roles = (comment.match(/roles: ([\w, ]+)/)?.[1] ?? '')
                    .trim()
                    .split(/,\s*/)
                    .filter(Boolean)
                    .map((r) => (r === 'sender' ? 'writer' : r))

                const verb =
                    comment.match(/\b(GET|POST|PATCH|DELETE|PUT)\b/)?.[1] ??
                    'POST'

                operations.push({
                    id: `${resource}.${method}`,
                    resource,
                    method,
                    verb,
                    roles,
                    args,
                    execute: `(args, options) => ${api}.${method}(${args
                        .map(
                            (_, index) =>
                                `args[${index}] as Parameters<typeof ${api}.${method}>[${index}]`,
                        )
                        .concat('options')
                        .join(', ')})`,
                })
            }
        }

        ts.forEachChild(node, visit)
    }

    visit(source)
}

const entries = operations
    .map(
        ({ execute, ...op }) =>
            `    { ...${JSON.stringify(op)}, execute: ${execute} }`,
    )
    .join(',\n')

writeFileSync(
    'src/features/crm/generated/operations.ts',
    `${imports}\n// Generated from src/api. Run node scripts/generate-crm-schema.mjs after contract changes.\nexport const operations: readonly Operation[] = [\n${entries}\n]\n`,
)

console.log(`Generated ${operations.length} API operations`)
