'use client'

import { useId, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { analyticsApi } from '../../../api/analytics/analytics.api'
import {
    AnalyticsGroup,
    type AnalyticsQuery,
} from '../../../api/analytics/analytics.types'
import { useRoles } from '../../../shared/hooks/useRoles'
import { Button } from '../../../components/ui/Button'
import { State } from '../../../components/ui/State'
import { DataTable } from './DataTable'
import { RecordDetails } from './RecordDetails'
import { isRecord, normalizeRows } from '../data'
import { label, operationLabels } from '../labels'
import c from './crm.module.scss'

const reports = [
    'overview',
    'subscriptions',
    'consultations',
    'usage',
    'revenue',
] as const

const metadata = new Set([
    'from',
    'to',
    'toExclusive',
    'timezone',
    'group',
    'generatedAt',
    'cacheSeconds',
    'stateIncludesDev',
    'generationHistoryComplete',
    'source',
    'paymentAdaptersConfigured',
    'excludesFeesAndTaxes',
])

export function AnalyticsPage() {
    const { hasAnyRole } = useRoles()

    const groupId = useId()

    const [report, setReport] = useState<(typeof reports)[number]>('overview')

    const [filters, setFilters] = useState<AnalyticsQuery>({
        group: AnalyticsGroup.DAY,
        page: 1,
        limit: 20,
    })

    const [draft, setDraft] = useState(filters)

    const [error, setError] = useState('')

    const query = useQuery({
        queryKey: ['crm', 'analytics', report, filters],
        enabled: hasAnyRole(['admin']),
        staleTime: 120_000,
        queryFn: ({ signal }) => analyticsApi[report](filters, { signal }),
    })

    const sections = Object.entries(query.data ?? {}).filter(
        ([key, value]) =>
            !metadata.has(key) && (Array.isArray(value) || isRecord(value)),
    )

    const paginated = sections.filter(
        ([, value]) => isRecord(value) && Array.isArray(value.rows),
    )

    const total = Math.max(
        0,
        ...paginated.map(([, value]) => normalizeRows(value).total),
    )

    const page = filters.page ?? 1

    const pages = Math.max(1, Math.ceil(total / (filters.limit ?? 20)))

    return (
        <div className={c.page}>
            <header className={c.pageHeader}>
                <div>
                    <p className={c.eyebrow}>Finanse</p>
                    <h1>Analityka</h1>
                    <p className={c.description}>
                        Raporty z serwera · daty UTC · maksymalnie 366 dni
                    </p>
                </div>
                <Button
                    disabled={query.isFetching}
                    onClick={() => {
                        void query.refetch()
                    }}
                >
                    Odśwież
                </Button>
            </header>
            <nav className={c.actions} aria-label="Raporty analityczne">
                {reports.map((name) => (
                    <Button
                        key={name}
                        aria-pressed={report === name}
                        variant={report === name ? 'primary' : 'secondary'}
                        onClick={() => {
                            setReport(name)

                            setFilters((value) => ({ ...value, page: 1 }))
                        }}
                    >
                        {operationLabels[name]}
                    </Button>
                ))}
            </nav>
            <form
                className={c.card}
                onSubmit={(event) => {
                    event.preventDefault()

                    const to = draft.to
                        ? Date.parse(draft.to)
                        : Date.parse(
                              new Date(Date.now() + 86400000)
                                  .toISOString()
                                  .slice(0, 10),
                          )

                    const from = draft.from
                        ? Date.parse(draft.from)
                        : to - 30 * 86400000

                    if (
                        !Number.isFinite(from) ||
                        !Number.isFinite(to) ||
                        from >= to ||
                        to - from > 366 * 86400000
                    ) {
                        setError(
                            'Wybierz zakres od 1 do 366 dni. Data „Do” nie jest wliczana.',
                        )

                        return
                    }

                    setError('')

                    setFilters({ ...draft, page: 1 })
                }}
            >
                <div className={c.fields}>
                    <label className={c.field}>
                        Od (UTC)
                        <input
                            type="date"
                            value={draft.from ?? ''}
                            onChange={(event) =>
                                setDraft({
                                    ...draft,
                                    from: event.target.value || undefined,
                                })
                            }
                        />
                    </label>
                    <label className={c.field}>
                        Do (UTC, bez tego dnia)
                        <input
                            type="date"
                            value={draft.to ?? ''}
                            onChange={(event) =>
                                setDraft({
                                    ...draft,
                                    to: event.target.value || undefined,
                                })
                            }
                        />
                    </label>
                    <div className={c.field}>
                        <label htmlFor={groupId}>Grupowanie</label>
                        <select
                            id={groupId}
                            value={draft.group}
                            onChange={(event) =>
                                setDraft({
                                    ...draft,
                                    group: event.target.value as AnalyticsGroup,
                                })
                            }
                        >
                            <option value="day">Dni</option>
                            <option value="month">Miesiące</option>
                        </select>
                    </div>
                    <div className={c.actions}>
                        <Button type="submit" variant="primary">
                            Zastosuj filtry
                        </Button>
                    </div>
                </div>
                {error && (
                    <p className={c.error} role="alert">
                        {error}
                    </p>
                )}
            </form>
            {query.isPending || query.error ? (
                <State
                    loading={query.isPending}
                    error={query.error}
                    onRetry={() => {
                        void query.refetch()
                    }}
                />
            ) : (
                <>
                    <p className={c.description}>
                        {String(query.data.from).slice(0, 10)} —{' '}
                        {String(query.data.to).slice(0, 10)} (koniec wyłączny,
                        UTC). Raport wygenerowano:{' '}
                        {String(query.data.generatedAt)}.
                    </p>
                    {query.data.stateIncludesDev === true && (
                        <p className={c.description}>
                            Statystyki stanu obejmują również dane
                            deweloperskie.
                        </p>
                    )}
                    {(query.data.generationHistoryComplete === false ||
                        (isRecord(query.data.trialCohort) &&
                            query.data.trialCohort.historyComplete ===
                                false)) && (
                        <p className={c.description}>
                            Historia sprzed uruchomienia rejestrowania zdarzeń
                            jest niepełna.
                        </p>
                    )}
                    {report === 'revenue' && (
                        <p className={c.description}>
                            Kwoty są w najmniejszych jednostkach danej waluty,
                            bez opłat i podatków. Dane produkcyjne, sandbox i
                            symulacje są pokazane osobno.
                            {query.data.paymentAdaptersConfigured === false
                                ? ' Adaptery płatności nie są jeszcze skonfigurowane na serwerze.'
                                : ''}
                        </p>
                    )}
                    {sections.map(([key, value]) => {
                        const table =
                            Array.isArray(value) ||
                            (isRecord(value) && Array.isArray(value.rows))

                        const rows = normalizeRows(value).rows

                        return (
                            <section className={c.card} key={key}>
                                <h2>{label(key)}</h2>
                                {table ? (
                                    rows.length ? (
                                        <DataTable
                                            rows={rows}
                                            columns={[
                                                ...new Set(
                                                    rows.flatMap(Object.keys),
                                                ),
                                            ]}
                                        />
                                    ) : (
                                        <State empty="Brak danych w tym zakresie" />
                                    )
                                ) : (
                                    <RecordDetails value={value} />
                                )}
                            </section>
                        )
                    })}
                    {paginated.length > 0 && (
                        <footer className={c.tableFooter}>
                            <span>
                                Strona zestawień {page} / {pages}
                            </span>
                            <div className={c.actions}>
                                <Button
                                    disabled={page <= 1 || query.isFetching}
                                    onClick={() =>
                                        setFilters({
                                            ...filters,
                                            page: page - 1,
                                        })
                                    }
                                >
                                    Poprzednia
                                </Button>
                                <Button
                                    disabled={page >= pages || query.isFetching}
                                    onClick={() =>
                                        setFilters({
                                            ...filters,
                                            page: page + 1,
                                        })
                                    }
                                >
                                    Następna
                                </Button>
                            </div>
                        </footer>
                    )}
                </>
            )}
        </div>
    )
}
