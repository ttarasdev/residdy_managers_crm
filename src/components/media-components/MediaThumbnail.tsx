'use client'

/* eslint-disable @next/next/no-img-element -- Public SVGs and authenticated blob previews are rendered directly. */
import { useQuery } from '@tanstack/react-query'
import { FileImage, FileText } from 'lucide-react'
import { publicAssetsApi } from '../../api/media/public-assets/public-assets.api'
import { privateAssetsApi } from '../../api/media/private-assets/private-assets.api'
import { privateVariantsApi } from '../../api/media/private-variants/private-variants.api'
import { PrivateAssetPreview } from '../form-components/private-media-list/PrivateMediaList'
import type { MediaKind } from '../../features/crm/media'
import s from './media.module.scss'

export function MediaThumbnail({
    kind,
    id,
    icon = false,
    row,
    large = false,
}: {
    kind: MediaKind
    id: number
    icon?: boolean
    row?: Record<string, unknown>
    large?: boolean
}) {
    const query = useQuery({
        queryKey: ['crm', kind, 'thumbnail', id],
        enabled: Number.isInteger(id) && id > 0 && !row,
        queryFn: async ({ signal }) =>
            kind === 'public-assets'
                ? publicAssetsApi.getById(id, { signal })
                : kind === 'private-variants'
                  ? privateVariantsApi.getById(id, { signal })
                  : privateAssetsApi.getById(id, { signal }),
        staleTime: 60_000,
    })

    const data = row ?? (query.data as Record<string, unknown> | undefined)

    const url =
        typeof data?.url === 'string' &&
        data.url.startsWith('/public/') &&
        process.env.NEXT_PUBLIC_API_URL
            ? new URL(data.url, process.env.NEXT_PUBLIC_API_URL).toString()
            : undefined

    if (!Number.isInteger(id) || id < 1) return null

    return (
        <span
            className={`${s.thumbnail} ${icon ? s.icon : ''} ${large ? s.large : ''} ${data?.bucket === 'instruction_headers' ? s.cover : ''}`}
        >
            {kind === 'public-assets' && url ? (
                <img
                    src={url}
                    alt={String(data?.originalName ?? 'Podgląd')}
                    loading="lazy"
                />
            ) : kind === 'private-variants' && data?.smallAssetId ? (
                <PrivateAssetPreview
                    id={Number(
                        large
                            ? (data.largeAssetId ??
                                  data.mediumAssetId ??
                                  data.smallAssetId)
                            : data.smallAssetId,
                    )}
                />
            ) : kind === 'private-assets' ? (
                /\.(png|jpe?g|webp|avif|gif)$/i.test(
                    String(data?.relPath ?? data?.originalName ?? ''),
                ) ? (
                    <PrivateAssetPreview id={id} />
                ) : (
                    <FileText size={32} />
                )
            ) : (
                <span>
                    {query.isError ? 'Błąd podglądu' : <FileImage size={28} />}
                </span>
            )}
        </span>
    )
}
