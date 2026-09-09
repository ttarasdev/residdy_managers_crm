'use client'

import type { ReactNode } from 'react'
import c from './FormList.module.scss'

export interface FormListItem {
    id: number
    title: string
    subtitle?: string
    preview?: ReactNode
}

export interface SelectionProps {
    value: readonly number[]
    onChange: (ids: number[]) => void
    multiple?: boolean
    disabled?: boolean
}

interface Props extends SelectionProps {
    title: string
    items: readonly FormListItem[]
    loading?: boolean
    error?: Error | null
    onRetry?: () => void
    page?: number
    total?: number
    limit?: number
    onPageChange?: (page: number) => void
    grid?: boolean
    variantGrid?: boolean
}

export default function FormList({
    title,
    items,
    value,
    onChange,
    multiple = false,
    disabled,
    loading,
    error,
    onRetry,
    page = 1,
    total = items.length,
    limit = 40,
    onPageChange,
    grid,
    variantGrid,
}: Props) {
    return (
        <fieldset className={c.container} disabled={disabled || loading}>
            <legend>{title}</legend>
            <div className={grid ? c.images : c.items} aria-busy={loading}>
                {error ? (
                    <div role="alert">
                        {error.message}
                        <button type="button" onClick={onRetry}>
                            Spróbuj ponownie
                        </button>
                    </div>
                ) : loading ? (
                    <p role="status">Ładowanie...</p>
                ) : !items.length ? (
                    <p>Brak danych</p>
                ) : (
                    items.map((item) => (
                        <button
                            type="button"
                            key={item.id}
                            title={item.title}
                            aria-label={item.title}
                            aria-pressed={value.includes(item.id)}
                            className={`${grid ? (variantGrid ? c.variantItem : c.imageItem) : c.item} ${value.includes(item.id) ? c.active : ''}`}
                            onClick={() =>
                                onChange(
                                    multiple
                                        ? value.includes(item.id)
                                            ? value.filter(
                                                  (id) => id !== item.id,
                                              )
                                            : [...value, item.id]
                                        : [item.id],
                                )
                            }
                        >
                            {item.preview}
                            {!grid && (
                                <span>
                                    <span className={c.item__title}>
                                        {item.title}
                                    </span>
                                    {item.subtitle && (
                                        <span className={c.item__subtitle}>
                                            {item.subtitle}
                                        </span>
                                    )}
                                </span>
                            )}
                        </button>
                    ))
                )}
            </div>
            {onPageChange && total > limit && (
                <div className={c.pagination}>
                    <button
                        type="button"
                        disabled={page <= 1 || loading}
                        onClick={() => onPageChange(page - 1)}
                    >
                        ‹
                    </button>
                    <span>
                        {page} / {Math.ceil(total / limit)}
                    </span>
                    <button
                        type="button"
                        disabled={page * limit >= total || loading}
                        onClick={() => onPageChange(page + 1)}
                    >
                        ›
                    </button>
                </div>
            )}
        </fieldset>
    )
}
