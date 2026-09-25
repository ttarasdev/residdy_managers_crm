import { isRecord, normalizeRows } from './data'
import { label } from './labels'

export interface AnalyticsChartData {
    title: string
    kind: 'line' | 'bar'
    labels: string[]
    series: { label: string; values: number[] }[]
    note?: string
}

// Keep every backend dimension: providers, currencies and actions must not merge.
export function analyticsCharts(
    key: string,
    value: unknown,
    group: 'day' | 'month' = 'day',
): AnalyticsChartData[] {
    const rows = normalizeRows(value).rows

    const metric = key === 'series' ? 'amountMinor' : 'count'

    if (!rows.length || rows.some((row) => !Object.hasOwn(row, metric)))
        return []

    const groups = new Map<string, typeof rows>()

    for (const row of rows) {
        const currency = metric === 'amountMinor' ? String(row.currency) : ''

        groups.set(currency, [...(groups.get(currency) ?? []), row])
    }

    return [...groups].flatMap(([currency, items]) => {
        // Charts use JS numbers; the table retains exact large integer amounts.
        if (
            items.some(
                (row) =>
                    !Number.isSafeInteger(Number(row[metric])) ||
                    Number(row[metric]) < 0,
            )
        )
            return []

        const timeline = items.every((row) => typeof row.period === 'string')

        const dimensions = (row: Record<string, unknown>) =>
            Object.entries(row)
                .filter(
                    ([name]) =>
                        ![metric, 'period', 'currency', 'operations'].includes(
                            name,
                        ),
                )
                .map(
                    ([name, entry]) =>
                        `${label(name)}: ${label(String(entry))}`,
                )
                .join(' · ') || label(metric)

        const labels = timeline
            ? [...new Set(items.map((row) => String(row.period)))].sort()
            : items.map(dimensions)

        if (timeline && labels.length > 1) {
            const end = labels[labels.length - 1]

            const cursor = new Date(`${labels[0]}T00:00:00Z`)

            labels.length = 0

            while (Number.isFinite(+cursor) && labels.length < 367) {
                const period = cursor.toISOString().slice(0, 10)

                if (period > end) break

                labels.push(period)

                if (group === 'month')
                    cursor.setUTCMonth(cursor.getUTCMonth() + 1)
                else cursor.setUTCDate(cursor.getUTCDate() + 1)
            }
        }

        const names = timeline
            ? [...new Set(items.map(dimensions))]
            : [label(metric)]

        return [
            {
                title: `${label(key)}${currency ? ` · ${currency}` : ''}`,
                kind: timeline ? ('line' as const) : ('bar' as const),
                labels,
                series: names.map((name) => ({
                    label: name,
                    values: timeline
                        ? labels.map((period) =>
                              Number(
                                  items.find(
                                      (row) =>
                                          row.period === period &&
                                          dimensions(row) === name,
                                  )?.[metric] ?? 0,
                              ),
                          )
                        : items.map((row) => Number(row[metric])),
                })),
                note: currency
                    ? 'Produkcja · najmniejsze jednostki waluty. Dokładne kwoty w tabeli.'
                    : isRecord(value) && Array.isArray(value.rows)
                      ? 'Dane z bieżącej strony zestawienia.'
                      : undefined,
            },
        ]
    })
}
