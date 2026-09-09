'use client'

import c from './FormVariantsList.module.scss'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { useState } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import PageBlockLoadingData from '@/components/page-block-components/page-block-loading-data/PageBlockLoadingData'
import PageBlockNoData from '@/components/page-block-components/page-block-no-data/PageBlockNoData'
import PageBlockChangePage from '@/components/page-block-components/page-block-change-page/PageBlockChangePage'
import type { InlineImageRef } from '@/api/mails-api/mail-jobs/mail-jobs.types'
import { PRIVATE_BUCKETS } from '@/shared/types-enums/buckets'
import { VariantSize } from '@/shared/types-enums/media'
import { companyVariantsApi } from '@/api/media/company-variants/company-variants.api'
import { CompanyVariant } from '@/api/media/company-variants/company-variants.types'
import { JwtCompanyVariantImage } from '@/components/features-components/img-containers/JwtCompanyVariantImage'

interface Props {
	bucket: PRIVATE_BUCKETS
	queryKeys: QUERY_KEYS[]
	cid: string
	assetSizeToUse?: VariantSize
	previewSize?: VariantSize
	inlineImages: InlineImageRef[] | null
	setInlineImages: React.Dispatch<
		React.SetStateAction<InlineImageRef[] | null>
	>
	title?: string
}

const FormVariantsInlineImagesListMulti: React.FC<Props> = ({
	bucket,
	queryKeys,
	cid,
	assetSizeToUse = VariantSize.MEDIUM,
	previewSize = VariantSize.MEDIUM,
	inlineImages,
	setInlineImages,
	title = 'wybierz obrazy',
}) => {
	const [page, setPage] = useState(1)
	const limit = 40

	const { data, isLoading, error } = useQuery({
		queryKey: [...queryKeys, bucket, page],
		queryFn: () => companyVariantsApi.list({ bucket, page, limit }),
		placeholderData: keepPreviousData,
		staleTime: 60_000,
	})

	const active = inlineImages ?? []

	const pickAssetId = (v: CompanyVariant) => {
		switch (assetSizeToUse) {
			case VariantSize.SMALL:
				return v.smallAssetId
			case VariantSize.LARGE:
				return v.largeAssetId
			case VariantSize.MEDIUM:
			default:
				return v.mediumAssetId
		}
	}

	const isActive = (mediaAssetId: number) =>
		active.some((x) => x.mediaAssetId === mediaAssetId)

	const toggle = (v: CompanyVariant) => {
		const mediaAssetId = pickAssetId(v)

		setInlineImages((prev) => {
			const arr = prev ?? []
			const idx = arr.findIndex((x) => x.mediaAssetId === mediaAssetId)

			if (idx >= 0) {
				const next = [...arr.slice(0, idx), ...arr.slice(idx + 1)]
				return next.length ? next : null
			}

			return [...arr, { mediaAssetId, cid }]
		})
	}

	if (isLoading)
		return (
			<div className={c.items__container}>
				<PageBlockLoadingData />
			</div>
		)
	if (error || !data)
		return (
			<div className={c.items__container}>
				<PageBlockNoData />
			</div>
		)

	const maxPage = Math.ceil(data.total / limit)

	return (
		<div className={c.items__container}>
			{title} (CID: {cid})
			<div className={c.items}>
				{data.items.map((v: CompanyVariant) => {
					const mediaAssetId = pickAssetId(v)

					return (
						<div
							key={v.id}
							className={`${c.items__item} ${
								isActive(mediaAssetId) ? c.active : ''
							}`}
							onClick={() => toggle(v)}
						>
							<div className={c.items__image}>
								<JwtCompanyVariantImage
									variantId={v.id}
									alt="variant"
									size={previewSize}
									fill
									style={{ objectFit: 'cover' }}
								/>
							</div>
						</div>
					)
				})}
			</div>
			<PageBlockChangePage
				page={page}
				setPage={setPage}
				maxPage={maxPage}
			/>
		</div>
	)
}

export default FormVariantsInlineImagesListMulti
