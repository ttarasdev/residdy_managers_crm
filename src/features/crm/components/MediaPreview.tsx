'use client'

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
