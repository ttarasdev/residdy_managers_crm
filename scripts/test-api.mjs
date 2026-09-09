import {
    mkdtempSync,
    mkdirSync,
    readdirSync,
    readFileSync,
    rmSync,
    writeFileSync,
    symlinkSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, relative, resolve } from 'node:path'
import { spawnSync } from 'node:child_process'
import ts from 'typescript'

const sourceRoot = resolve('src')

const outputRoot = mkdtempSync(join(tmpdir(), 'residdy-api-test-'))

function compile(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
        const source = join(directory, entry.name)

        if (
            source === join(sourceRoot, 'shared', 'old-front') ||
            source === join(sourceRoot, 'shared', 'new-back') ||
            source === join(sourceRoot, 'shared', 'new-back-2') ||
            entry.name === 'app'
        )
            continue

        if (entry.isDirectory()) compile(source)
        else if (/\.tsx?$/.test(source)) {
            const target = join(
                outputRoot,
                relative(sourceRoot, source).replace(/\.tsx?$/, '.js'),
            )

            const result = ts.transpileModule(readFileSync(source, 'utf8'), {
                fileName: source,
                compilerOptions: {
                    module: ts.ModuleKind.CommonJS,
                    target: ts.ScriptTarget.ES2022,
                    jsx: ts.JsxEmit.ReactJSX,
                    esModuleInterop: true,
                },
            })

            mkdirSync(dirname(target), { recursive: true })

            writeFileSync(target, result.outputText)
        } else if (source.endsWith('.scss')) {
            const target = join(outputRoot, relative(sourceRoot, source))

            mkdirSync(dirname(target), { recursive: true })

            writeFileSync(target, '')
        }
    }
}

try {
    compile(sourceRoot)

    symlinkSync(
        resolve('node_modules'),
        join(outputRoot, 'node_modules'),
        'dir',
    )

    const result = spawnSync(
        process.execPath,
        [
            '--test',
            'tests/api.test.mjs',
            'tests/auth.test.mjs',
            'tests/crm.test.mjs',
        ],
        {
            stdio: 'inherit',
            env: {
                ...process.env,
                NODE_ENV: 'test',
                RESIDDY_API_TEST_DIR: join(outputRoot, 'api'),
                RESIDDY_TEST_DIR: outputRoot,
            },
        },
    )

    if (result.error) throw result.error

    process.exitCode = result.status ?? 1
} finally {
    rmSync(outputRoot, { recursive: true, force: true })
}
