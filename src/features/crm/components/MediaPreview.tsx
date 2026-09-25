'use client'

import Image from 'next/image'
import { publicAssetsApi } from '../../../api/media/public-assets/public-assets.api'
import { useQuery } from '@tanstack/react-query'
import { privateVariantsApi } from '../../../api/media/private-variants/private-variants.api'
import { PrivateAssetPreview } from '../../../components/form-components/private-media-list/PrivateMediaList'
import c from './crm.module.scss'

export function MediaPreview({ variantId }: { variantId: number }) {
    const query = useQuery({
        queryKey: ['crm', 'private-variants', 'preview', variantId],
        queryFn: ({ signal }) =>
            privateVariantsApi.getById(variantId, { signal }),
        staleTime: 60_000,
    })

    return (
        <div className={c.mediaPreview}>
            {query.data ? (
                <PrivateAssetPreview id={query.data.mediumAssetId} />
            ) : (
                <span>
                    {query.error
                        ? 'Nie można wyświetlić zdjęcia'
                        : 'Ładowanie zdjęcia…'}
                </span>
            )}
        </div>
    )
}

export function PublicImagePreview({ assetId }: { assetId: number }) {
    const query = useQuery({
        queryKey: ['crm', 'public-assets', 'preview', assetId],
        queryFn: ({ signal }) => publicAssetsApi.getById(assetId, { signal }),
        staleTime: 60000,
    })

    const base = process.env.NEXT_PUBLIC_API_URL

    const path = query.data?.url

    if (!base || !path?.startsWith('/public/'))
        return (
            <span>
                {query.error
                    ? 'Nie można wyświetlić obrazu'
                    : 'Ładowanie obrazu…'}
            </span>
        )

    return (
        <div className={c.mediaPreview}>
            <Image
                src={new URL(path, base).toString()}
                alt="Podgląd reklamy"
                width={400}
                height={400}
                unoptimized
                style={{ objectFit: 'contain', width: '100%', height: 200 }}
            />
        </div>
    )
}
