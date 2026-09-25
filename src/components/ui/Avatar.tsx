'use client'

import { useQuery } from '@tanstack/react-query'
import { UserRound } from 'lucide-react'
import { privateVariantsApi } from '../../api/media/private-variants/private-variants.api'
import { PrivateAssetPreview } from '../form-components/private-media-list/PrivateMediaList'
import c from './Avatar.module.scss'

export function Avatar({
    variantId,
    size = 40,
}: {
    variantId?: number | null
    size?: number
}) {
    const query = useQuery({
        queryKey: ['crm', 'private-variants', 'avatar', variantId],
        enabled: Boolean(variantId),
        queryFn: ({ signal }) =>
            privateVariantsApi.getById(variantId!, { signal }),
        staleTime: 60_000,
    })

    return (
        <span
            className={c.avatar}
            style={{ width: size, height: size }}
            role="img"
            aria-label="Zdjęcie profilowe"
        >
            {query.data ? (
                <PrivateAssetPreview id={query.data.smallAssetId} />
            ) : (
                <UserRound size={size / 2} />
            )}
        </span>
    )
}
