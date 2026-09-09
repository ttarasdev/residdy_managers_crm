'use client'

import { useQuery } from '@tanstack/react-query'
import Image, { ImageProps } from 'next/image'
import { API_URL } from '@/shared/config/env'
import { companyAssetsApi } from '@/api/media/company-assets/company-assets.api'
import PageBlockLoadingData from '../../page-block-components/page-block-loading-data/PageBlockLoadingData'

interface Props extends Omit<ImageProps, 'src'> {
	assetId: number
}

export const JwtCompanyImage: React.FC<Props> = ({
	assetId,
	alt = '',
	...imgProps
}) => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['company-asset-url', assetId],
		queryFn: () => companyAssetsApi.getSignedUrl(assetId),
		staleTime: 60_000,
	})

	if (isLoading) return <PageBlockLoadingData />
	if (isError || !data?.url) return <div>⚠️ image</div>

	const signedUrl = `${API_URL}${data.url}`
	const isSvg = signedUrl.endsWith('.svg')

	if (isSvg) {
		return <img src={signedUrl} alt={alt} {...imgProps} />
	}

	return (
		<Image
			sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
			{...imgProps}
			alt={alt}
			src={signedUrl}
			priority
		/>
	)
}
