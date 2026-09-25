'use client'

import { isBannerActionAvailable } from '../banner-actions'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import {
    ArrowLeft,
    Filter,
    Plus,
    RefreshCw,
    Search,
    Settings2,
} from 'lucide-react'
import { useAuth } from '../../../shared/hooks/useAuth'
import { useRoles } from '../../../shared/hooks/useRoles'
import { getResource } from '../catalog'
import {
    getOperation,
    getOperations,
    normalizeRows,
    rowId,
    isRecord,
    buildArgs,
    initialValues,
} from '../data'
import { readResource } from '../read-resource'
import { operationLabels } from '../labels'
import type { Operation } from '../types'
import { Button } from '../../../components/ui/Button'
import { State } from '../../../components/ui/State'
import { DataTable } from './DataTable'
import { RecordDetails } from './RecordDetails'
import { SchemaForm } from './SchemaForm'
import { ActionDialog } from './ActionDialog'
import { MediaLibrary } from './MediaLibrary'
import type { MediaKind } from '../media'
import { AnalyticsPage } from './AnalyticsPage'
import { RecordActions } from './RecordActions'
import { TrialSettings } from './TrialSettings'
import { CaseWorkspace } from './CaseWorkspace'
import c from './crm.module.scss'

export function ResourcePage(props: { resource: string; id?: string }) {
    if (
        !props.id &&
        ['public-assets', 'private-assets', 'private-variants'].includes(
            props.resource,
        )
    )
        return (
            <MediaLibrary
                key={props.resource}
                kind={props.resource as MediaKind}
            />
        )

    if (props.resource === 'analytics') return <AnalyticsPage />

    return (
        <Suspense fallback={<State loading />}>
            <ResourceContent
                key={`${props.resource}:${props.id ?? ''}`}
                {...props}
            />
        </Suspense>
    )
}

function ResourceContent({
    resource: resourceId,
    id,
}: {
    resource: string
    id?: string
}) {
    const resource = getResource(resourceId)!

    const router = useRouter()

    const searchParams = useSearchParams()

    const { hasAnyRole } = useRoles()

    const { manager } = useAuth()

    const all = getOperations(resourceId)

    const list =
        all.find((item) => item.method === 'list') ??
        all.find((item) => item.method.startsWith('listBy'))

    const detail = getOperation(resourceId, 'getById')

    const current = id ? detail : list

    const [filtersOpen, setFiltersOpen] = useState(false)

    const [selectedRow, setSelectedRow] = useState<Record<
        string,
        unknown
    > | null>(null)

    const [search, setSearch] = useState('')

    const [filter, setFilter] = useState<Record<string, unknown>>(() => {
        const value = current ? initialValues(current) : {}

        for (const argument of current?.args ?? []) {
            if (argument.kind === 'object')
                value[argument.name] = {
                    page: 1,
                    limit: 20,
                    ...Object.fromEntries(
                        (argument.fields ?? [])
                            .filter((field) => searchParams.has(field.name))
                            .map((field) => [
                                field.name,
                                searchParams.get(field.name),
                            ]),
                    ),
                }
            else
                value[argument.name] =
                    id ?? searchParams.get(argument.name) ?? undefined
        }

        return value
    })

    const [draft, setDraft] = useState(filter)

    const [action, setAction] = useState<{
        operation: Operation
        record?: Record<string, unknown>
        preset?: Record<string, unknown>
    } | null>(null)

    let args: unknown[] = []

    let inputError: Error | undefined

    try {
        args = current ? buildArgs(current, filter) : []
    } catch (error) {
        inputError =
            error instanceof Error ? error : new Error('Nieprawidłowe filtry')
    }

    const allowed = hasAnyRole(resource.roles)

    const ready =
        !!current &&
        !inputError &&
        allowed &&
        hasAnyRole(current.roles) &&
        current.args.every(
            (field, index) =>
                field.optional ||
                field.kind === 'object' ||
                args[index] !== undefined,
        )

    const query = useQuery({
        queryKey: ['crm', resourceId, current?.method, args],
        enabled: ready,
        queryFn: ({ signal }) =>
            id &&
            ['specialists', 'consultation-categories'].includes(resourceId)
                ? readResource(resourceId, Number(id), { signal })
                : current!.execute(args, { signal }),
    })

    const result = normalizeRows(query.data)

    const record = id && isRecord(query.data) ? query.data : undefined

    const canChangeMedia =
        !['public-assets', 'private-assets', 'private-variants'].includes(
            resourceId,
        ) ||
        (record &&
            (hasAnyRole(['admin']) ||
                Number(record.ownerAccountId ?? record.createdByAccountId) ===
                    manager?.accountId))

    const methods = all.filter(
        (item) =>
            (canChangeMedia ||
                !['remove', 'togglePopular'].includes(item.method)) &&
            ![
                'list',
                'getById',
                'login',
                'forgotPassword',
                'resetPassword',
                'confirm',
                'resend',
                'getMe',
                'uploadMyAvatar',
                'trialSettings',
                'updateTrialSettings',
            ].includes(item.method) &&
            !item.method.startsWith('listBy'),
    )

    const rowMethods = methods.filter(
        (item) =>
            item.args[0]?.kind !== 'object' &&
            item.args[0]?.kind !== 'file' &&
            item.args.length > 0 &&
            !['register', 'create'].includes(item.method),
    )

    const pageMethods = methods.filter((item) => !rowMethods.includes(item))

    const qField = current?.args.find((item) => item.name === 'query')

    const page = isRecord(filter.query) ? Number(filter.query.page ?? 1) : 1

    const limit = isRecord(filter.query) ? Number(filter.query.limit ?? 20) : 20

    const paginate = (next: number) =>
        setFilter((value) => ({
            ...value,
            query: {
                ...(isRecord(value.query) ? value.query : {}),
                page: next,
            },
        }))

    const visibleRows = result.rows.filter(
        (row) =>
            !search ||
            Object.values(row)
                .filter(
                    (value) =>
                        typeof value === 'string' || typeof value === 'number',
                )
                .some((value) =>
                    String(value).toLowerCase().includes(search.toLowerCase()),
                ),
    )

    const effectiveColumns = resource.columns.filter((key) =>
        result.rows.some((row) => key.includes('.') || key in row),
    )

    const columns = effectiveColumns.length
        ? effectiveColumns
        : Object.keys(result.rows[0] ?? {})
              .filter(
                  (key) =>
                      !isRecord(result.rows[0][key]) &&
                      !Array.isArray(result.rows[0][key]),
              )
              .slice(0, 6)

    function openAction(
        operation: Operation,
        selected?: Record<string, unknown>,
    ) {
        const first = operation.args[0]

        setAction({
            operation,
            record: selected,
            preset: {
                ...(isRecord(filter.query) ? filter.query : {}),
                ...filter,
                ...(id &&
                first &&
                first.name === detail?.args[0]?.name &&
                selected?.[first.name] === undefined &&
                first.kind !== 'object' &&
                first.kind !== 'file'
                    ? { [first.name]: id }
                    : {}),
            },
        })
    }

    if (!allowed)
        return (
            <div className={c.page}>
                <State empty="Nie masz dostępu do tego obszaru" />
            </div>
        )

    return (
        <div className={c.page}>
            <header className={c.pageHeader}>
                <div>
                    {id && (
                        <Link className={c.back} href={resource.path}>
                            <ArrowLeft size={14} />
                            {resource.title}
                        </Link>
                    )}
                    <p className={c.eyebrow}>{resource.group}</p>
                    <h1>
                        {id ? `${resource.title} · #${id}` : resource.title}
                    </h1>
                    <p className={c.description}>{resource.description}</p>
                </div>
                <div className={c.actions}>
                    <Button
                        aria-label="Odśwież"
                        onClick={() => {
                            if (ready) void query.refetch()
                        }}
                        disabled={!ready || query.isFetching}
                    >
                        <RefreshCw size={16} />
                    </Button>
                    {(id ? [...pageMethods, ...rowMethods] : pageMethods)
                        .filter((operation) =>
                            isBannerActionAvailable(operation, record),
                        )
                        .filter(
                            (item) =>
                                !['progress', 'build', 'tick'].includes(
                                    item.method,
                                ),
                        )
                        .map((operation) => (
                            <Button
                                key={operation.id}
                                variant={
                                    ['create', 'register'].includes(
                                        operation.method,
                                    )
                                        ? 'primary'
                                        : 'secondary'
                                }
                                disabled={!hasAnyRole(operation.roles)}
                                title={
                                    !hasAnyRole(operation.roles)
                                        ? 'Brak uprawnień'
                                        : undefined
                                }
                                onClick={() => openAction(operation, record)}
                            >
                                {['create', 'register'].includes(
                                    operation.method,
                                ) && <Plus size={16} />}
                                {operationLabels[operation.method]}
                            </Button>
                        ))}
                </div>
            </header>
            {!id && current && hasAnyRole(current.roles) && (
                <section className={c.card}>
                    <div className={c.toolbar}>
                        <label className={c.search}>
                            <Search size={16} />
                            <input
                                aria-label="Szukaj na stronie"
                                placeholder="Szukaj na tej stronie…"
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                            />
                        </label>
                        <Button
                            onClick={() => setFiltersOpen(!filtersOpen)}
                            aria-expanded={filtersOpen}
                        >
                            <Filter size={15} />
                            Filtry
                        </Button>
                        <span className={c.counter}>
                            {result.total} rekordów
                        </span>
                    </div>
                    {(filtersOpen || !ready) && (
                        <form
                            className={c.filterPanel}
                            onSubmit={(event) => {
                                event.preventDefault()

                                setFilter({
                                    ...draft,
                                    ...(isRecord(draft.query)
                                        ? { query: { ...draft.query, page: 1 } }
                                        : {}),
                                })

                                setFiltersOpen(false)
                            }}
                        >
                            <SchemaForm
                                resource={resourceId}
                                fields={current.args.map((field) =>
                                    field.name === 'query'
                                        ? {
                                              ...field,
                                              fields: field.fields?.filter(
                                                  (item) =>
                                                      ![
                                                          'page',
                                                          'limit',
                                                          'offset',
                                                      ].includes(item.name),
                                              ),
                                          }
                                        : field,
                                )}
                                value={draft}
                                onChange={setDraft}
                            />
                            <Button type="submit" variant="primary">
                                Zastosuj filtry
                            </Button>
                        </form>
                    )}
                </section>
            )}
            {current ? (
                !ready ? (
                    <State
                        error={inputError}
                        empty={
                            current && !hasAnyRole(current.roles)
                                ? 'Brak uprawnień do pobrania danych tego modułu'
                                : 'Uzupełnij filtry lub identyfikator, aby pobrać dane'
                        }
                    />
                ) : query.isPending || query.error ? (
                    <State
                        loading={query.isPending}
                        error={query.error}
                        onRetry={() => {
                            void query.refetch()
                        }}
                    />
                ) : id && record ? (
                    <>
                        <section className={c.card}>
                            <RecordDetails
                                resource={resourceId}
                                value={
                                    ['cases', 'case-instructions'].includes(
                                        resourceId,
                                    )
                                        ? Object.fromEntries(
                                              Object.entries(record).filter(
                                                  ([key]) =>
                                                      ![
                                                          'stages',
                                                          'blocks',
                                                      ].includes(key),
                                              ),
                                          )
                                        : record
                                }
                            />
                        </section>
                        {(resourceId === 'cases' ||
                            resourceId === 'case-instructions') && (
                            <CaseWorkspace
                                resource={resourceId}
                                record={record}
                            />
                        )}
                        {resourceId === 'partner-companies' && (
                            <section className={c.card}>
                                <div className={c.cardHeader}>
                                    <h2>Profil firmy</h2>
                                    <div className={c.actions}>
                                        {getOperations(
                                            'partner-company-info',
                                        ).map((operation) => (
                                            <Button
                                                key={operation.id}
                                                disabled={
                                                    !hasAnyRole(operation.roles)
                                                }
                                                onClick={() =>
                                                    setAction({
                                                        operation,
                                                        record: isRecord(
                                                            record.info,
                                                        )
                                                            ? record.info
                                                            : record,
                                                        preset: {
                                                            id: record.id,
                                                            companyId:
                                                                record.id,
                                                        },
                                                    })
                                                }
                                            >
                                                {
                                                    operationLabels[
                                                        operation.method
                                                    ]
                                                }
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        )}
                    </>
                ) : (
                    <section className={c.card}>
                        {!visibleRows.length ? (
                            <State empty="Brak rekordów dla wybranych filtrów" />
                        ) : (
                            <DataTable
                                rows={visibleRows}
                                columns={columns}
                                href={
                                    detail
                                        ? (row) =>
                                              `${resource.path}/${encodeURIComponent(String(rowId(row, detail)))}`
                                        : undefined
                                }
                                onSelect={
                                    !detail
                                        ? (row) => setSelectedRow(row)
                                        : undefined
                                }
                            />
                        )}
                        {qField && (
                            <footer className={c.tableFooter}>
                                <span>{result.total} rekordów</span>
                                <div className={c.pager}>
                                    <Button
                                        disabled={page <= 1 || query.isFetching}
                                        onClick={() => paginate(page - 1)}
                                    >
                                        Poprzednia
                                    </Button>
                                    <span>
                                        {page} /{' '}
                                        {Math.max(
                                            1,
                                            Math.ceil(result.total / limit),
                                        )}
                                    </span>
                                    <Button
                                        disabled={
                                            page * limit >= result.total ||
                                            query.isFetching
                                        }
                                        onClick={() => paginate(page + 1)}
                                    >
                                        Następna
                                    </Button>
                                </div>
                            </footer>
                        )}
                    </section>
                )
            ) : (
                <section className={c.card}>
                    <div className={c.workspaceIntro}>
                        <Settings2 />
                        <h2>
                            {detail ? 'Otwórz rekord' : 'Wybierz działanie'}
                        </h2>
                        <p>
                            {detail
                                ? 'Podaj identyfikator, aby otworzyć istniejący plik lub rekord.'
                                : resource.description}
                        </p>
                        {detail && (
                            <form
                                onSubmit={(event) => {
                                    event.preventDefault()

                                    const value = new FormData(
                                        event.currentTarget,
                                    ).get('id')

                                    router.push(
                                        `${resource.path}/${encodeURIComponent(String(value))}`,
                                    )
                                }}
                                className={c.actions}
                            >
                                <input
                                    name="id"
                                    aria-label="ID rekordu"
                                    required
                                    placeholder="ID rekordu"
                                />
                                <Button type="submit">Otwórz</Button>
                            </form>
                        )}
                    </div>
                </section>
            )}
            {methods.some((item) =>
                ['progress', 'build', 'tick'].includes(item.method),
            ) && (
                <section className={c.card}>
                    <div className={c.cardHeader}>
                        <div>
                            <h2>Przetwarzanie</h2>
                            <p className={c.description}>
                                Przygotowanie odbiorców, postęp i uruchomienie
                                kolejki.
                            </p>
                        </div>
                        <div className={c.actions}>
                            {methods
                                .filter((item) =>
                                    ['progress', 'build', 'tick'].includes(
                                        item.method,
                                    ),
                                )
                                .map((operation) => (
                                    <Button
                                        key={operation.id}
                                        disabled={!hasAnyRole(operation.roles)}
                                        onClick={() =>
                                            openAction(operation, record)
                                        }
                                    >
                                        {operationLabels[operation.method]}
                                    </Button>
                                ))}
                        </div>
                    </div>
                </section>
            )}
            {!id && rowMethods.length > 0 && !detail && (
                <section className={c.card}>
                    <div className={c.cardHeader}>
                        <h2>Operacje na rekordzie</h2>
                        <div className={c.actions}>
                            {rowMethods.map((operation) => (
                                <Button
                                    key={operation.id}
                                    disabled={!hasAnyRole(operation.roles)}
                                    onClick={() => openAction(operation)}
                                >
                                    {operationLabels[operation.method]}
                                </Button>
                            ))}
                        </div>
                    </div>
                </section>
            )}
            {resourceId === 'subscription-plans' && !id && <TrialSettings />}
            {resourceId === 'legal-documents' && record && (
                <Link
                    className={c.back}
                    href={`/main/resources/legal-document-versions?${new URLSearchParams({ code: String(record.code) })}`}
                >
                    Wersje dokumentu i publikacja PDF →
                </Link>
            )}
            {selectedRow && (
                <RecordActions
                    resource={resourceId}
                    record={selectedRow}
                    operations={rowMethods}
                    onClose={() => setSelectedRow(null)}
                    onAction={(operation) => {
                        openAction(operation, selectedRow)

                        setSelectedRow(null)
                    }}
                />
            )}
            {action && (
                <ActionDialog
                    key={action.operation.id}
                    {...action}
                    onSuccess={() => {
                        if (resourceId === 'partner-banners') setAction(null)

                        if (id && action.operation.method === 'remove')
                            router.replace(resource.path)
                    }}
                    onClose={() => setAction(null)}
                />
            )}
        </div>
    )
}
