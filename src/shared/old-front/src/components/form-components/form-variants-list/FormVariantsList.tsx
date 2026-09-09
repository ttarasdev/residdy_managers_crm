'use client'

import c from './FormVariantsList.module.scss'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { useState } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import PageBlockLoadingData from '@/components/page-block-components/page-block-loading-data/PageBlockLoadingData'
import PageBlockNoData from '@/components/page-block-components/page-block-no-data/PageBlockNoData'
import PageBlockChangePage from '@/components/page-block-components/page-block-change-page/PageBlockChangePage'
import { PRIVATE_BUCKETS } from '@/shared/types-enums/buckets'
import { companyVariantsApi } from '@/api/media/company-variants/company-variants.api'
import { JwtCompanyVariantImage } from '@/components/features-components/img-containers/JwtCompanyVariantImage'
import { VariantSize } from '@/shared/types-enums/media'

interface Props {
	bucket: PRIVATE_BUCKETS
	queryKeys: QUERY_KEYS[]
	activeVariantId: number | null
	chooseItem: (id: number) => void
}

const FormVariantsList: React.FC<Props> = ({
	bucket,
	queryKeys,
	chooseItem,
	activeVariantId,
}) => {
	const [page, setPage] = useState(1)
	const limit = 40

	const { data, isLoading, error } = useQuery({
		queryKey: [...queryKeys, bucket, page],
		queryFn: () =>
			companyVariantsApi.list({
				bucket,
				page,
				limit: limit,
			}),
		placeholderData: keepPreviousData,
		staleTime: 60_000,
	})

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

	const maxPage = Math.ceil(data.total / 40)

	return (
		<div className={c.items__container}>
			wybierz ikonę
			<div className={c.items}>
				{data.items.map((i) => (
					<div
						key={i.id}
						className={`${c.items__item} ${
							i.id == activeVariantId ? c.active : ''
						}`}
						onClick={() => chooseItem(i.id)}
					>
						<div className={c.items__image}>
							<JwtCompanyVariantImage
								variantId={i.id}
								alt={'variant'}
								size={VariantSize.MEDIUM}
								fill
								style={{ objectFit: 'cover' }}
							/>
						</div>
					</div>
				))}
			</div>
			<PageBlockChangePage
				page={page}
				setPage={setPage}
				maxPage={maxPage}
			/>
		</div>
	)
}

export default FormVariantsList
