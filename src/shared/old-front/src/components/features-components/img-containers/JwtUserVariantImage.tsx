'use client'

import { useQuery } from '@tanstack/react-query'
import { ImageProps } from 'next/image'
import { userVariantsApi } from '@/api/media/user-variants/user-variants.api'
import { JwtUserImage } from './JwtUserImage'
import PageBlockLoadingData from '../../page-block-components/page-block-loading-data/PageBlockLoadingData'
import { VariantSize } from '@/shared/types-enums/media'

interface Props extends Omit<ImageProps, 'src'> {
	userId: number
	variantId: number
	size?: VariantSize
}

export const JwtUserVariantImage: React.FC<Props> = ({
	userId,
	variantId,
	size = VariantSize.SMALL,
	alt = '',
	...imgProps
}) => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['user-variant', userId, variantId],
		queryFn: () => userVariantsApi.getByUserId(userId, variantId),
		staleTime: 60_000,
	})

	if (isLoading) return <PageBlockLoadingData />
	if (isError || !data) return <div>⚠️ variant</div>

	const assetId =
		size === VariantSize.SMALL
			? data.smallAsset.id
			: size === VariantSize.LARGE
			? data.largeAsset.id
			: data.mediumAsset.id

	return (
		<JwtUserImage
			userId={userId}
			assetId={assetId}
			alt={alt}
			{...imgProps}
		/>
	)
}
