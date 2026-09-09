'use client'

import { useState } from 'react'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { ArrowDown, ArrowUp, Layers, Plus, Pencil, Trash2 } from 'lucide-react'
import { getOperation, normalizeRows } from '../data'
import type { Operation } from '../types'
import { useRoles } from '../../../shared/hooks/useRoles'
import { Button } from '../../../components/ui/Button'
import { State } from '../../../components/ui/State'
import { ActionDialog } from './ActionDialog'
import { RecordDetails } from './RecordDetails'
import c from './crm.module.scss'

export function CaseWorkspace({
    resource,
    record,
}: {
    resource: string
    record: Record<string, unknown>
}) {
    return (
        <OrderedCollection
            resource={
                resource === 'cases' ? 'case-stages' : 'case-instruction-blocks'
            }
            parentKey={resource === 'cases' ? 'caseId' : 'instructionId'}
            parentId={Number(record.id)}
            lan={String(record.lan ?? 'PL')}
        />
    )
}

function OrderedCollection({
    resource,
    parentKey,
    parentId,
    lan,
}: {
    resource: string
    parentKey: string
    parentId: number
    lan: string
}) {
    const { hasAnyRole } = useRoles()

    const client = useQueryClient()

    const method =
        resource === 'case-stages'
            ? 'listByCase'
            : resource === 'case-stage-tasks'
              ? 'listByStage'
              : 'listByInstruction'

    const list = getOperation(resource, method)!

    const create = getOperation(resource, 'create')!

    const query = useQuery({
        queryKey: ['crm', resource, parentId],
        queryFn: async ({ signal }) => {
            const records: Record<string, unknown>[] = []

            let page = 1

            while (true) {
                const result = normalizeRows(
                    await list.execute([parentId, { page, limit: 100 }], {
                        signal,
                    }),
                )

                records.push(...result.rows)

                if (!result.rows.length || records.length >= result.total)
                    return records

                page++
            }
        },
    })

    const [expanded, setExpanded] = useState<Set<number>>(() => new Set())

    const [action, setAction] = useState<{
        operation: Operation
        record?: Record<string, unknown>
    } | null>(null)

    const reorder = getOperation(resource, 'reorder')!

    const move = useMutation({
        mutationFn: ({
            id,
            direction,
        }: {
            id: unknown
            direction: 'up' | 'down'
        }) => reorder.execute([id, { direction }]),
        onSuccess: () => {
            void client.invalidateQueries({ queryKey: ['crm'] })
        },
    })

    const title =
        resource === 'case-stages'
            ? 'Etapy sprawy'
            : resource === 'case-stage-tasks'
              ? 'Zadania etapu'
              : 'Bloki instrukcji'

    const sort = resource === 'case-stages' ? 'stageNo' : 'sortKey'

    const rows = [...(query.data ?? [])].sort(
        (a, b) => Number(a[sort]) - Number(b[sort]),
    )

    return (
        <section className={c.collection}>
            <div className={c.cardHeader}>
                <div>
                    <h2>
                        <Layers size={18} /> {title}
                    </h2>
                    <p className={c.description}>
                        {rows.length} elementów · kolejność zapisana na serwerze
                    </p>
                </div>
                <Button
                    variant="primary"
                    disabled={!hasAnyRole(create.roles)}
                    onClick={() => setAction({ operation: create })}
                >
                    <Plus size={15} />
                    Dodaj
                </Button>
            </div>
            {move.error && (
                <p role="alert" className={c.error}>
                    {move.error.message}
                </p>
            )}
            {query.isPending || query.error ? (
                <State
                    loading={query.isPending}
                    error={query.error}
                    onRetry={() => {
                        void query.refetch()
                    }}
                />
            ) : !rows.length ? (
                <State empty="Nie ma jeszcze elementów. Dodaj pierwszy." />
            ) : (
                rows.map((row, index) => (
                    <div className={c.orderedItem} key={String(row.id)}>
                        <header className={c.orderedHeader}>
                            <span className={c.orderNumber}>{index + 1}</span>
                            <div className={c.grow}>
                                <h3>
                                    {String(
                                        row.title ?? row.type ?? `#${row.id}`,
                                    )}
                                </h3>
                                {row.subtitle ? (
                                    <p className={c.description}>
                                        {String(row.subtitle)}
                                    </p>
                                ) : null}
                            </div>
                            <div className={c.actions}>
                                <Button
                                    aria-label="Przesuń w górę"
                                    disabled={
                                        index === 0 ||
                                        move.isPending ||
                                        query.isFetching ||
                                        !hasAnyRole(reorder.roles)
                                    }
                                    onClick={() =>
                                        move.mutate({
                                            id: row.id,
                                            direction: 'up',
                                        })
                                    }
                                >
                                    <ArrowUp size={15} />
                                </Button>
                                <Button
                                    aria-label="Przesuń w dół"
                                    disabled={
                                        index === rows.length - 1 ||
                                        move.isPending ||
                                        query.isFetching ||
                                        !hasAnyRole(reorder.roles)
                                    }
                                    onClick={() =>
                                        move.mutate({
                                            id: row.id,
                                            direction: 'down',
                                        })
                                    }
                                >
                                    <ArrowDown size={15} />
                                </Button>
                                {['update', 'remove'].map((name) => (
                                    <Button
                                        key={name}
                                        aria-label={
                                            name === 'update'
                                                ? 'Edytuj element'
                                                : 'Usuń element'
                                        }
                                        disabled={
                                            !hasAnyRole(
                                                getOperation(resource, name)!
                                                    .roles,
                                            )
                                        }
                                        onClick={() =>
                                            setAction({
                                                operation: getOperation(
                                                    resource,
                                                    name,
                                                )!,
                                                record: row,
                                            })
                                        }
                                    >
                                        {name === 'update' ? (
                                            <Pencil size={15} />
                                        ) : (
                                            <Trash2 size={15} />
                                        )}
                                    </Button>
                                ))}
                            </div>
                        </header>
                        {resource === 'case-stages' ? (
                            <details
                                className={c.taskDetails}
                                onToggle={(event) => {
                                    const open = event.currentTarget.open

                                    setExpanded((previous) => {
                                        const next = new Set(previous)

                                        if (open) next.add(Number(row.id))
                                        else next.delete(Number(row.id))

                                        return next
                                    })
                                }}
                            >
                                <summary>Pokaż zadania</summary>
                                {expanded.has(Number(row.id)) && (
                                    <OrderedCollection
                                        resource="case-stage-tasks"
                                        parentKey="stageId"
                                        parentId={Number(row.id)}
                                        lan={lan}
                                    />
                                )}
                            </details>
                        ) : (
                            <div className={c.itemDetails}>
                                <RecordDetails value={row} />
                            </div>
                        )}
                    </div>
                ))
            )}
            {action && (
                <ActionDialog
                    {...action}
                    preset={{ [parentKey]: parentId, lan }}
                    onClose={() => setAction(null)}
                />
            )}
        </section>
    )
}
