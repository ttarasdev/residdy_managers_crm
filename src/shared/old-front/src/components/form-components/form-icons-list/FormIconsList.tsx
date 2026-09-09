'use client'

import c from './FormIconsList.module.scss'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { useState } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import PageBlockLoadingData from '@/components/page-block-components/page-block-loading-data/PageBlockLoadingData'
import PageBlockChangePage from '@/components/page-block-components/page-block-change-page/PageBlockChangePage'
import PageBlockNoData from '@/components/page-block-components/page-block-no-data/PageBlockNoData'
import { PUBLIC_BUCKETS } from '@/shared/types-enums/buckets'
import { publicAssetsApi } from '@/api/media/public-assets/public-assets.api'
import { IconContainer } from '@/components/library/icon-container/IconContainer'

interface Props {
	bucket: PUBLIC_BUCKETS
	queryKeys: QUERY_KEYS[]
	activeIconId: number | null
	chooseItem: (id: number) => void
}

const FormIconsList: React.FC<Props> = ({
	bucket,
	chooseItem,
	activeIconId,
}) => {
	const [page, setPage] = useState(1)
	const limit = 40

	const { data, isLoading, error } = useQuery({
		queryKey: [QUERY_KEYS.MEDIA_ICON_KEY, page, PUBLIC_BUCKETS.ICONS],
		queryFn: () =>
			publicAssetsApi.list({
				bucket: bucket,
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
				{data.rows.map((i) => (
					<div
						key={i.id}
						className={`${c.items__item} ${
							i.id == activeIconId ? c.active : ''
						}`}
						onClick={() => chooseItem(i.id)}
					>
						<div className={c.items__image}>
							<IconContainer item={i} />
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

export default FormIconsList
