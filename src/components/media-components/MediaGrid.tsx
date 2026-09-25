'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getOperation, normalizeRows } from '../../features/crm/data'
import { bucketLabels, type MediaPolicy } from '../../features/crm/media'
import { MediaThumbnail } from './MediaThumbnail'
import { State } from '../ui/State'
import { Button } from '../ui/Button'
import s from './media.module.scss'

export function MediaGrid({
    policy,
    selected,
    onSelect,
}: {
    policy: MediaPolicy
    selected?: number
    onSelect: (row: Record<string, unknown>) => void
}) {
    const [page, setPage] = useState(1)

    const query = useQuery({
        queryKey: ['crm', policy.kind, 'library', policy.bucket, page],
        queryFn: ({ signal }) =>
            getOperation(policy.kind, 'list')!.execute(
                [{ bucket: policy.bucket, page, limit: 24 }],
                { signal },
            ),
    })

    const result = normalizeRows(query.data)

    return (
        <>
            {query.isPending || query.error ? (
                <State
                    loading={query.isPending}
                    error={query.error}
                    onRetry={() => {
                        void query.refetch()
                    }}
                />
            ) : result.rows.length ? (
                <div
                    className={`${s.grid} ${policy.bucket === 'instruction_headers' ? s.headers : ''}`}
                >
                    {result.rows.map((row) => (
                        <button
                            type="button"
                            key={String(row.id)}
                            className={s.tile}
                            aria-pressed={selected === row.id}
                            aria-label={`Wybierz ${row.originalName ?? row.id}`}
                            onClick={() => onSelect(row)}
                        >
                            <MediaThumbnail
                                kind={policy.kind}
                                id={Number(row.id)}
                                icon={policy.icon}
                                row={row}
                            />
                            <small>{String(row.originalName ?? row.id)}</small>
                        </button>
                    ))}
                </div>
            ) : (
                <State
                    empty={`Brak plików: ${bucketLabels[policy.bucket ?? ''] ?? 'biblioteka'}`}
                />
            )}
            <div className={s.toolbar}>
                <Button disabled={page <= 1} onClick={() => setPage(page - 1)}>
                    Poprzednia
                </Button>
                <span>
                    {page} / {Math.max(1, Math.ceil(result.total / 24))}
                </span>
                <Button
                    disabled={page * 24 >= result.total || query.isFetching}
                    onClick={() => setPage(page + 1)}
                >
                    Następna
                </Button>
            </div>
        </>
    )
}
