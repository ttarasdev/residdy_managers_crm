'use client'

import { useQuery } from '@tanstack/react-query'
import { ImageProps } from 'next/image'
import { companyVariantsApi } from '@/api/media/company-variants/company-variants.api'
import { JwtCompanyImage } from './JwtCompanyImage'
import PageBlockLoadingData from '../../page-block-components/page-block-loading-data/PageBlockLoadingData'
import { VariantSize } from '@/shared/types-enums/media'

interface Props extends Omit<ImageProps, 'src'> {
	variantId: number
	size?: VariantSize
}

export const JwtCompanyVariantImage: React.FC<Props> = ({
	variantId,
	size = VariantSize.SMALL,
	alt = '',
	...imgProps
}) => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['company-variant', variantId],
		queryFn: () => companyVariantsApi.getById(variantId),
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

	return <JwtCompanyImage assetId={assetId} alt={alt} {...imgProps} />
}
