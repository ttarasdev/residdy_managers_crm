import type { FieldSchema, Operation } from './types'
import { operations } from './generated/operations'

export function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export function getValue(value: unknown, path: string): unknown {
    return path
        .split('.')
        .reduce<unknown>(
            (current, key) => (isRecord(current) ? current[key] : undefined),
            value,
        )
}

export function getOperation(resource: string, method: string) {
    return operations.find(
        (item) => item.resource === resource && item.method === method,
    )
}

export function getOperations(resource: string) {
    return operations.filter((item) => item.resource === resource)
}

export function normalizeRows(data: unknown): {
    rows: Record<string, unknown>[]
    total: number
} {
    if (Array.isArray(data))
        return {
            rows: data.map((value) =>
                isRecord(value)
                    ? value
                    : { id: value, account: value, name: value },
            ),
            total: data.length,
        }

    if (isRecord(data)) {
        const rows = data.rows ?? data.items

        if (Array.isArray(rows))
            return {
                rows: rows.filter(isRecord),
                total: Number(data.total ?? rows.length),
            }

        return { rows: [data], total: 1 }
    }

    return { rows: [], total: 0 }
}

export function rowName(row: Record<string, unknown>) {
    return String(
        row.title ??
            row.name ??
            row.name_pl ??
            row.titlePL ??
            row.titlePl ??
            row.labelPL ??
            row.topic ??
            row.code ??
            row.originalName ??
            row.email ??
            row.id ??
            'Szczegóły',
    )
}

export function rowId(row: Record<string, unknown>, operation?: Operation) {
    const key = operation?.args[0]?.name ?? 'id'

    return row[key] ?? row.id ?? row.account
}

export function cleanValue(field: FieldSchema, value: unknown): unknown {
    if (
        value === undefined ||
        (value === '' && field.kind !== 'string') ||
        value === null
    )
        return field.nullable && value === null ? null : undefined

    if (field.kind === 'number') {
        const number = Number(value)

        if (!Number.isFinite(number)) throw new Error('Wpisz prawidłową liczbę')

        return number
    }

    if (field.kind === 'enum')
        return (
            field.choices?.find((choice) => String(choice) === String(value)) ??
            value
        )

    if (field.kind === 'boolean') return value === true || value === 'true'

    if (field.kind === 'array')
        return (Array.isArray(value) ? value : [])
            .map((item) => cleanValue(field.item!, item))
            .filter((item) => item !== undefined)

    if (field.kind === 'object')
        return Object.fromEntries(
            (field.fields ?? [])
                .map((item) => [
                    item.name,
                    cleanValue(
                        item,
                        isRecord(value) ? value[item.name] : undefined,
                    ),
                ])
                .filter(([, value]) => value !== undefined),
        )

    return value
}

export function buildArgs(
    operation: Operation,
    values: Record<string, unknown>,
) {
    return operation.args.map(
        (field) =>
            cleanValue(field, values[field.name]) ??
            (field.kind === 'object' ? {} : undefined),
    )
}

export function initialValues(
    operation: Operation,
    record?: Record<string, unknown>,
    preset: Record<string, unknown> = {},
) {
    return Object.fromEntries(
        operation.args.map((field) => [
            field.name,
            field.kind === 'object'
                ? {
                      ...Object.fromEntries(
                          (field.fields ?? [])
                              .map((child) => [
                                  child.name,
                                  recordField(record, child.name) ??
                                      preset[child.name],
                              ])
                              .filter(([, value]) => value !== undefined),
                      ),
                      ...(isRecord(preset[field.name])
                          ? (preset[field.name] as Record<string, unknown>)
                          : {}),
                  }
                : (preset[field.name] ?? record?.[field.name]),
        ]),
    )
}

function recordField(
    record: Record<string, unknown> | undefined,
    name: string,
) {
    if (record?.[name] !== undefined) return record[name]

    const responseKey: Record<string, string> = {
        audience: 'audienceJson',
        attachments: 'attachmentsJson',
        inlineImages: 'inlineImagesJson',
    }

    if (record?.[responseKey[name]] !== undefined)
        return record[responseKey[name]]

    if (isRecord(record?.conditions) && record.conditions[name] !== undefined)
        return record.conditions[name]

    const relations: Record<string, string> = {
        categoryIds: 'categories',
        variableIds: 'variables',
        roleIds: 'roles',
        accountIds: 'accounts',
    }

    const nested = record?.[relations[name]]

    return Array.isArray(nested)
        ? nested.filter(isRecord).map((item) => item.id)
        : undefined
}
