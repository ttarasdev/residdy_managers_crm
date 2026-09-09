import type { FieldSchema, Operation } from './types'
import { isRecord } from './data'
import { getFieldRules } from './field-rules'
import { label } from './labels'

export function validateAction(
    operation: Operation,
    values: Record<string, unknown>,
) {
    for (const field of operation.args)
        validateField(field, values[field.name], operation.resource)
}

function validateField(field: FieldSchema, value: unknown, resource: string) {
    const empty = value === undefined || value === null || value === ''

    if (empty) {
        if (!field.optional && !(field.nullable && value === null))
            throw new Error(`Uzupełnij pole: ${label(field.name)}`)

        return
    }

    const rules = getFieldRules(resource, field.name)

    if (field.kind === 'number') {
        const number = Number(value)

        if (
            !Number.isFinite(number) ||
            (rules.min !== undefined && number < rules.min) ||
            (rules.max !== undefined && number > rules.max) ||
            (rules.step === 1 && !Number.isInteger(number)) ||
            (resource === 'subscription-plans' &&
                field.name === 'retentionMonths' &&
                number === 0)
        )
            throw new Error(`Nieprawidłowa wartość: ${label(field.name)}`)
    }

    if (
        typeof value === 'string' &&
        ((rules.minLength !== undefined && value.length < rules.minLength) ||
            (rules.maxLength !== undefined && value.length > rules.maxLength) ||
            (rules.pattern &&
                !new RegExp(`^(?:${rules.pattern})$`).test(value)))
    )
        throw new Error(`Nieprawidłowa wartość: ${label(field.name)}`)

    if (
        field.kind === 'file' &&
        rules.maxFileSize &&
        value instanceof File &&
        (!value.size || value.size > rules.maxFileSize)
    )
        throw new Error(rules.hint ?? 'Nieprawidłowy plik')

    if (field.kind === 'object') {
        for (const child of field.fields ?? [])
            validateField(
                child,
                isRecord(value) ? value[child.name] : undefined,
                resource,
            )
    }

    if (field.kind === 'array') {
        for (const item of Array.isArray(value) ? value : [])
            validateField(field.item!, item, resource)
    }

    if (
        field.kind === 'enum' &&
        !field.choices?.some((choice) => String(choice) === String(value))
    )
        throw new Error(`Wybierz prawidłową wartość: ${label(field.name)}`)
}
