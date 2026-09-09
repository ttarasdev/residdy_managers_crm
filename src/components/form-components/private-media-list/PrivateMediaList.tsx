'use client'

/* eslint-disable @next/next/no-img-element -- Authenticated blobs cannot be fetched by the image optimizer. */
import { useEffect, useRef, useState } from 'react'
import { useQueries, useQuery } from '@tanstack/react-query'
import { privateAssetsApi } from '../../../api/media/private-assets/private-assets.api'
import { privateVariantsApi } from '../../../api/media/private-variants/private-variants.api'
import FormList, { type SelectionProps } from '../form-list/FormList'

export function PrivateAssetPreview({ id }: { id: number }) {
    const query = useQuery({
        queryKey: ['private-file-preview', id],
        queryFn: ({ signal }) => privateAssetsApi.download(id, { signal }),
        staleTime: 60_000,
    })

    const image = useRef<HTMLImageElement>(null)

    useEffect(() => {
        const element = image.current

        const blob = query.data

        if (
            !element ||
            !blob ||
            ![
                'image/jpeg',
                'image/png',
                'image/webp',
                'image/gif',
                'image/avif',
            ].includes(blob.type)
        )
            return

        const url = URL.createObjectURL(blob)

        element.src = url

        return () => {
            element.removeAttribute('src')

            URL.revokeObjectURL(url)
        }
    }, [query.data])

    return query.isError ? <span>Błąd obrazu</span> : <img ref={image} alt="" />
}

export interface PrivateMediaListProps extends SelectionProps {
    ids: readonly number[]
    title?: string
}

export default function PrivateMediaList({
    ids,
    title = 'Wybierz pliki',
    kind,
    ...selection
}: PrivateMediaListProps & { kind: 'asset' | 'variant' }) {
    return (
        <MediaPage
            key={JSON.stringify([ids, kind])}
            ids={ids}
            kind={kind}
            title={title}
            {...selection}
        />
    )
}

function MediaPage({
    ids,
    title = 'Wybierz pliki',
    kind,
    ...selection
}: PrivateMediaListProps & { kind: 'asset' | 'variant' }) {
    const [page, setPage] = useState(1)

    const uniqueIds = [...new Set(ids)]

    const queries = useQueries({
        queries: uniqueIds.slice((page - 1) * 40, page * 40).map((id) => ({
            queryKey: ['form-options', kind, id],
            queryFn: async ({ signal }: { signal: AbortSignal }) => {
                if (kind === 'variant') {
                    const item = await privateVariantsApi.getById(id, {
                        signal,
                    })

                    return {
                        id: item.id,
                        title: item.originalName,
                        previewId: item.smallAssetId,
                    }
                }

                const item = await privateAssetsApi.getById(id, { signal })

                return {
                    id: item.id,
                    title: item.originalName,
                    previewId: null,
                }
            },
        })),
    })

    return (
        <FormList
            {...selection}
            title={title}
            grid={kind === 'variant'}
            variantGrid={kind === 'variant'}
            items={queries.flatMap((query) =>
                query.data
                    ? [
                          {
                              id: query.data.id,
                              title: query.data.title,
                              preview: query.data.previewId ? (
                                  <PrivateAssetPreview
                                      id={query.data.previewId}
                                  />
                              ) : undefined,
                          },
                      ]
                    : [],
            )}
            loading={queries.some((query) => query.isPending)}
            error={queries.find((query) => query.error)?.error}
            onRetry={() => {
                queries.forEach((query) => {
                    void query.refetch()
                })
            }}
            page={page}
            total={uniqueIds.length}
            onPageChange={setPage}
        />
    )
}
