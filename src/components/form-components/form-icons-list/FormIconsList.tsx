'use client'
/* eslint-disable @next/next/no-img-element -- Small API-hosted icon previews use their public URLs directly. */

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { publicAssetsApi } from '../../../api/media/public-assets/public-assets.api'
import { PublicBucket } from '../../../api/media/files/files.types'
import FormList, { type SelectionProps } from '../form-list/FormList'

export default function FormIconsList(props: SelectionProps) {
    const [page, setPage] = useState(1)

    const query = useQuery({
        queryKey: ['form-options', 'icons', page],
        queryFn: ({ signal }) =>
            publicAssetsApi.list(
                { bucket: PublicBucket.ICONS, page, limit: 40 },
                { signal },
            ),
    })

    return (
        <FormList
            {...props}
            title="Wybierz ikonę"
            grid
            items={(query.data?.rows ?? []).map((item) => ({
                id: item.id,
                title: item.originalName,
                preview: <img src={item.url} width={30} height={30} alt="" />,
            }))}
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
