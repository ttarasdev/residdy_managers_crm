'use client'

import { BUCKETS } from '@/shared/types-enums/buckets'
import c from './FormVariantsList.module.scss'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { useState } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { mediaVariantsApi } from '@/api/media/mediaVariants.api'
import PageBlockLoadingData from '@/components/page-block-components/page-block-loading-data/PageBlockLoadingData'
import PageBlockNoData from '@/components/page-block-components/page-block-no-data/PageBlockNoData'
import PageBlockChangePage from '@/components/page-block-components/page-block-change-page/PageBlockChangePage'
import {
	JwtVariantImage,
	VariantSize,
} from '@/components/features-components/img-containers/JwtVariantImage'

interface Props {
	bucket: BUCKETS
	queryKeys: QUERY_KEYS[]
	activeVariantIds: number[]
	setActiveVariantIds: React.Dispatch<React.SetStateAction<number[]>>
}

const FormVariantsListMulti: React.FC<Props> = ({
	bucket,
	queryKeys,
	activeVariantIds,
	setActiveVariantIds,
}) => {
	const toggle = (id: number) => {
		setActiveVariantIds((prev) =>
			prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
		)
	}

	const [page, setPage] = useState(1)
	const limit = 40

	const { data, isLoading, error } = useQuery({
		queryKey: [...queryKeys, bucket, page],
		queryFn: () => mediaVariantsApi.list({ bucket, page, limit }),
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

	const maxPage = Math.ceil(data.total / limit)

	return (
		<div className={c.items__container}>
			wybierz ikony
			<div className={c.items}>
				{data.items.map((i) => (
					<div
						key={i.id}
						className={`${c.items__item} ${
							activeVariantIds.includes(i.id) ? c.active : ''
						}`}
						onClick={() => toggle(i.id)}
					>
						<div className={c.items__image}>
							<JwtVariantImage
								variantId={i.id}
								alt={i.largeAsset.originalName}
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

export default FormVariantsListMulti
