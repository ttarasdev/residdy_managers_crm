'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import FormList, { type SelectionProps } from './FormList'
import { lookupSources, type LookupFilters } from './lookup-sources'

export interface ApiFormListProps extends SelectionProps {
    title?: string
    filters?: LookupFilters
}

export default function ApiFormList({
    source,
    filters = {},
    ...props
}: ApiFormListProps & { source: keyof typeof lookupSources }) {
    return (
        <QueryList
            key={JSON.stringify([source, filters])}
            source={source}
            filters={filters}
            {...props}
        />
    )
}

function QueryList({
    source,
    filters = {},
    title = 'Wybierz',
    ...selection
}: ApiFormListProps & { source: keyof typeof lookupSources }) {
    const [page, setPage] = useState(1)

    const query = useQuery({
        queryKey: ['form-options', source, filters, page],
        queryFn: ({ signal }) => lookupSources[source](page, filters, signal),
    })

    return (
        <FormList
            {...selection}
            title={title}
            items={query.data?.rows ?? []}
            loading={query.isPending}
            error={query.error}
            onRetry={() => {
                void query.refetch()
            }}
            page={page}
            total={query.data?.total ?? 0}
            onPageChange={setPage}
        />
    )
}
