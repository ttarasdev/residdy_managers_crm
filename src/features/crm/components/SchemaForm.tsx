'use client'

import { useId, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Plus, Trash2 } from 'lucide-react'
import { getFieldRules } from '../field-rules'
import { getRelation } from '../relations'
import type { FieldSchema } from '../types'
import { getOperation, isRecord, normalizeRows, rowName } from '../data'
import { label, valueLabel } from '../labels'
import { ActionDialog } from './ActionDialog'
import { Button } from '../../../components/ui/Button'
import TextInput from '../../../components/form-components/text-input/TextInput'
import FormTextarea from '../../../components/form-components/form-textarea/FormTextarea'
import MediaFileInput from '../../../components/form-components/media-file-input/MediaFileInput'
import { RichTextInput } from '../../../components/form-components/tiptap-input/RichTextInput'
import c from './crm.module.scss'

export function SchemaForm({
    fields,
    value,
    onChange,
    disabled,
    resource,
}: {
    fields: FieldSchema[]
    value: Record<string, unknown>
    onChange: (value: Record<string, unknown>) => void
    disabled?: boolean
    resource?: string
}) {
    return (
        <div className={c.fields}>
            {fields.map((field) => (
                <Field
                    key={field.name}
                    field={field}
                    value={value[field.name]}
                    onChange={(next) => {
                        const updated = { ...value, [field.name]: next }

                        if (
                            field.kind === 'file' &&
                            next instanceof File &&
                            isRecord(updated.dto) &&
                            !updated.dto.originalName
                        )
                            updated.dto = {
                                ...updated.dto,
                                originalName: next.name,
                            }

                        onChange(updated)
                    }}
                    disabled={disabled}
                    resource={resource}
                />
            ))}
        </div>
    )
}

function Field({
    field,
    value,
    onChange,
    disabled,
    resource,
}: {
    field: FieldSchema
    value: unknown
    onChange: (value: unknown) => void
    disabled?: boolean
    resource?: string
}) {
    const id = useId()

    const title = label(field.name)

    const relation = getRelation(field.name, resource)

    const required = !field.optional

    const rules = getFieldRules(resource, field.name)

    if (field.kind === 'object')
        return (
            <fieldset className={c.fieldset}>
                <legend>{title}</legend>
                <SchemaForm
                    resource={resource}
                    fields={field.fields ?? []}
                    value={isRecord(value) ? value : {}}
                    disabled={disabled}
                    onChange={onChange}
                />
            </fieldset>
        )

    if (field.name === 'html')
        return (
            <div className={c.fullField}>
                <label htmlFor={id}>{title} (HTML)</label>
                <textarea
                    id={id}
                    rows={10}
                    spellCheck={false}
                    value={typeof value === 'string' ? value : ''}
                    disabled={disabled}
                    required={required}
                    onChange={(event) => onChange(event.target.value)}
                />
                <span className={c.description}>
                    Kod wiadomości zachowuje formatowanie, linki i obrazy CID.
                </span>
            </div>
        )

    if (field.kind === 'json')
        return (
            <div className={c.fullField}>
                <span className={c.fieldLabel}>
                    {title}
                    {required && ' *'}
                </span>
                <RichTextInput
                    value={value}
                    format={field.name === 'html' ? 'html' : 'json'}
                    disabled={disabled}
                    onChange={onChange}
                />
            </div>
        )

    if (field.kind === 'array') {
        const items = Array.isArray(value) ? value : []

        return (
            <fieldset className={c.fieldset}>
                <legend>{title}</legend>
                {items.map((item, index) => (
                    <div key={index} className={c.arrayItem}>
                        <Field
                            field={{
                                ...field.item!,
                                name: relation
                                    ? field.name.replace(/Ids$/, 'Id')
                                    : `${field.name} ${index + 1}`,
                            }}
                            value={item}
                            disabled={disabled}
                            resource={resource}
                            onChange={(next) =>
                                onChange(
                                    items.map((current, position) =>
                                        position === index ? next : current,
                                    ),
                                )
                            }
                        />
                        <Button
                            aria-label={`Usuń ${title} ${index + 1}`}
                            disabled={disabled}
                            onClick={() =>
                                onChange(
                                    items.filter(
                                        (_, position) => position !== index,
                                    ),
                                )
                            }
                        >
                            <Trash2 size={16} />
                        </Button>
                    </div>
                ))}
                <Button
                    disabled={disabled}
                    onClick={() =>
                        onChange([
                            ...items,
                            field.item?.kind === 'object' ? {} : '',
                        ])
                    }
                >
                    <Plus size={15} />
                    Dodaj pozycję
                </Button>
            </fieldset>
        )
    }

    if (relation && field.kind === 'number')
        return (
            <div className={c.field}>
                <label htmlFor={id}>
                    {title}
                    {required && ' *'}
                </label>
                <EntityPicker
                    id={id}
                    resource={relation}
                    value={value}
                    required={required}
                    disabled={disabled}
                    onChange={onChange}
                />
            </div>
        )

    if (field.kind === 'enum' || field.kind === 'boolean')
        return (
            <div className={c.field}>
                <label htmlFor={id}>
                    {title}
                    {required && ' *'}
                </label>
                <select
                    id={id}
                    disabled={disabled}
                    required={required}
                    value={value === undefined ? '' : String(value)}
                    onChange={(event) =>
                        onChange(
                            event.target.value === ''
                                ? undefined
                                : field.kind === 'boolean'
                                  ? event.target.value === 'true'
                                  : event.target.value,
                        )
                    }
                >
                    <option value="">Wybierz…</option>
                    {(field.kind === 'boolean'
                        ? ['true', 'false']
                        : (field.choices ?? [])
                    ).map((choice) => (
                        <option key={String(choice)} value={String(choice)}>
                            {valueLabel(choice)}
                        </option>
                    ))}
                </select>
            </div>
        )

    const long = /description|subtitle|text|notes|reason|comment/i.test(
        field.name,
    )

    const date = /At$/.test(field.name)

    const type =
        field.kind === 'file'
            ? 'file'
            : field.kind === 'number'
              ? 'number'
              : /password/i.test(field.name)
                ? 'password'
                : /email/i.test(field.name)
                  ? 'email'
                  : /Url$/.test(field.name)
                    ? 'url'
                    : ['from', 'to'].includes(field.name)
                      ? 'date'
                      : date
                        ? 'datetime-local'
                        : 'text'

    let inputValue = value === undefined || value === null ? '' : String(value)

    if (date && inputValue && !Number.isNaN(Date.parse(inputValue))) {
        const parsed = new Date(inputValue)

        inputValue = new Date(
            parsed.getTime() - parsed.getTimezoneOffset() * 60_000,
        )
            .toISOString()
            .slice(0, 16)
    }

    const inputTitle = `${title}${required ? ' *' : ''}`

    return (
        <div className={long ? c.fullField : c.field}>
            {long ? (
                <FormTextarea
                    id={id}
                    inputTitle={inputTitle}
                    disabled={disabled}
                    required={required}
                    rows={4}
                    value={inputValue}
                    onChange={onChange}
                />
            ) : type === 'file' ? (
                <MediaFileInput
                    id={id}
                    inputTitle={inputTitle}
                    disabled={disabled}
                    required={required}
                    setFile={onChange}
                    accept={rules.accept}
                />
            ) : (
                <TextInput
                    id={id}
                    inputTitle={inputTitle}
                    type={type}
                    disabled={disabled}
                    required={required}
                    step={
                        rules.step ??
                        (field.kind === 'number' ? 'any' : undefined)
                    }
                    min={rules.min}
                    max={rules.max}
                    minLength={rules.minLength}
                    maxLength={rules.maxLength}
                    pattern={rules.pattern}
                    value={inputValue}
                    onChange={(next) =>
                        onChange(
                            date
                                ? next
                                    ? new Date(next).toISOString()
                                    : undefined
                                : next,
                        )
                    }
                />
            )}
            {rules.hint && <span className={c.description}>{rules.hint}</span>}
        </div>
    )
}

function EntityPicker({
    id,
    resource,
    value,
    onChange,
    required,
    disabled,
}: {
    id: string
    resource: string
    value: unknown
    onChange: (value: unknown) => void
    required: boolean
    disabled?: boolean
}) {
    const [upload, setUpload] = useState(false)

    const create = getOperation(resource, 'create')

    const uploadDialog =
        upload && create ? (
            <ActionDialog
                operation={create}
                onClose={() => setUpload(false)}
                onSuccess={(result) => {
                    const data =
                        isRecord(result) && isRecord(result.asset)
                            ? result.asset
                            : result

                    if (isRecord(data) && data.id) {
                        onChange(data.id)

                        setUpload(false)
                    }
                }}
            />
        ) : null

    const [search, setSearch] = useState('')

    const [page, setPage] = useState(1)

    const operation = getOperation(resource, 'list')

    const query = useQuery({
        queryKey: ['crm', resource, 'options', page],
        enabled: Boolean(operation),
        queryFn: ({ signal }) =>
            operation!.execute(
                [
                    {
                        page,
                        limit: 40,
                        ...(resource === 'public-assets'
                            ? { bucket: 'icons' }
                            : {}),
                    },
                ],
                { signal },
            ),
    })

    const result = normalizeRows(query.data)

    const rows = result.rows.filter((row) =>
        `${rowName(row)} ${row.id}`
            .toLowerCase()
            .includes(search.toLowerCase()),
    )

    if (!operation)
        return (
            <div className={c.picker}>
                <input
                    id={id}
                    type="number"
                    min={1}
                    required={required}
                    disabled={disabled}
                    placeholder="ID pliku z biblioteki"
                    value={value === undefined ? '' : String(value)}
                    onChange={(event) => onChange(event.target.value)}
                />
                {create && (
                    <Button disabled={disabled} onClick={() => setUpload(true)}>
                        <Plus size={15} />
                        Prześlij plik
                    </Button>
                )}
                {uploadDialog}
            </div>
        )

    return (
        <div className={c.picker}>
            {uploadDialog}
            <input
                aria-label="Filtruj dostępne pozycje"
                placeholder="Filtruj pozycje…"
                value={search}
                disabled={disabled}
                onChange={(event) => setSearch(event.target.value)}
            />
            <select
                id={id}
                required={required}
                disabled={disabled || query.isPending}
                value={value === undefined ? '' : String(value)}
                onChange={(event) => onChange(event.target.value)}
            >
                <option value="">
                    {query.isPending ? 'Ładowanie…' : 'Wybierz…'}
                </option>
                {value &&
                !rows.some((row) => String(row.id) === String(value)) ? (
                    <option value={String(value)}>#{String(value)}</option>
                ) : null}
                {rows.map((row) => (
                    <option key={String(row.id)} value={String(row.id)}>
                        {rowName(row)} · #{String(row.id)}
                    </option>
                ))}
            </select>
            {resource === 'public-assets' && create && (
                <Button disabled={disabled} onClick={() => setUpload(true)}>
                    <Plus size={15} />
                    Prześlij ikonę
                </Button>
            )}
            {query.error && (
                <p role="alert">
                    {query.error.message}
                    <Button
                        onClick={() => {
                            void query.refetch()
                        }}
                    >
                        Ponów
                    </Button>
                </p>
            )}
            {result.total > 40 && (
                <div className={c.pager}>
                    <Button
                        disabled={disabled || page === 1}
                        onClick={() => setPage(page - 1)}
                    >
                        ‹
                    </Button>
                    <span>
                        {page} / {Math.ceil(result.total / 40)}
                    </span>
                    <Button
                        disabled={disabled || page * 40 >= result.total}
                        onClick={() => setPage(page + 1)}
                    >
                        ›
                    </Button>
                </div>
            )}
        </div>
    )
}
