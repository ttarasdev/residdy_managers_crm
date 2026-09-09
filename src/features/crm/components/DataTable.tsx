'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Badge } from '../../../components/ui/Badge'
import { getValue, rowName } from '../data'
import { label, valueLabel } from '../labels'
import c from './crm.module.scss'

export function DataTable({
    rows,
    columns,
    href,
    onSelect,
}: {
    rows: Record<string, unknown>[]
    columns: string[]
    href?: (row: Record<string, unknown>) => string
    onSelect?: (row: Record<string, unknown>) => void
}) {
    return (
        <div className={c.tableScroll}>
            <table className={c.table}>
                <thead>
                    <tr>
                        {columns.map((key) => (
                            <th key={key}>{label(key.split('.').at(-1)!)}</th>
                        ))}
                        {(href || onSelect) && (
                            <th>
                                <span className={c.srOnly}>Szczegóły</span>
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={String(row.id ?? row.key ?? index)}>
                            {columns.map((key) => (
                                <td key={key}>
                                    {/status|verified|isActive|isPopular|isPinned|available|enabled/i.test(
                                        key,
                                    ) ? (
                                        <Badge value={getValue(row, key)} />
                                    ) : (
                                        displayValue(getValue(row, key), key)
                                    )}
                                </td>
                            ))}
                            {(href || onSelect) && (
                                <td>
                                    {href ? (
                                        <Link
                                            className={c.rowLink}
                                            href={href(row)}
                                            aria-label={`Otwórz ${rowName(row)}`}
                                        >
                                            <ArrowUpRight size={17} />
                                        </Link>
                                    ) : (
                                        <button
                                            type="button"
                                            className={c.rowLink}
                                            onClick={() => onSelect?.(row)}
                                            aria-label={`Otwórz ${rowName(row)}`}
                                        >
                                            <ArrowUpRight size={17} />
                                        </button>
                                    )}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export function displayValue(value: unknown, key = ''): string {
    if (value === undefined || value === null || value === '') return '—'

    if (typeof value === 'boolean') return valueLabel(value)

    if (Array.isArray(value))
        return (
            value
                .map((item) =>
                    typeof item === 'object' && item
                        ? rowName(item as Record<string, unknown>)
                        : String(item),
                )
                .join(', ') || '—'
        )

    if (typeof value === 'object')
        return rowName(value as Record<string, unknown>)

    if (
        /(At|Date)$/.test(key) &&
        typeof value === 'string' &&
        !Number.isNaN(Date.parse(value))
    )
        return new Intl.DateTimeFormat('pl-PL', {
            dateStyle: 'medium',
            timeStyle: 'short',
        }).format(new Date(value))

    return String(value)
}
