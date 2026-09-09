'use client'

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import c from './IconLibraryBlock.module.scss'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { useState } from 'react'
import { PUBLIC_BUCKETS } from '@/shared/types-enums/buckets'
import { publicAssetsApi } from '@/api/media/public-assets/public-assets.api'
import PageBlockLoadingData from '@/components/page-block-components/page-block-loading-data/PageBlockLoadingData'
import PageBlockNoData from '@/components/page-block-components/page-block-no-data/PageBlockNoData'
import PublicAssetAddForm from '@/components/media/media-add-item-form/PublicAssetAddForm'
import PageBlockHeader from '@/components/page-block-components/page-block-header/PageBlockHeader'
import PageBlockChangePage from '@/components/page-block-components/page-block-change-page/PageBlockChangePage'
import Image from 'next/image'
import IconLibraryItem from '../icon-library-item/IconLibraryItem'
import IconAddForm from '../icon-add-form/IconAddForm'

const IconLibraryBlock = () => {
	const [page, setPage] = useState(1)
	const [isFormOpened, setIsFormOpened] = useState(false)
	const [isPopular, setIsPopular] = useState<boolean | null>(null)

	const limit = 40

	const { data, isLoading, error } = useQuery({
		queryKey: [QUERY_KEYS.MEDIA_ICON_KEY, page, PUBLIC_BUCKETS.ICONS],
		queryFn: () => {
			const params: Record<string, any> = {
				bucket: PUBLIC_BUCKETS.ICONS,
				page,
				limit,
			}
			if (isPopular) params.isPopular = isPopular

			return publicAssetsApi.list(params)
		},
		placeholderData: keepPreviousData,
	})

	if (isLoading)
		return (
			<div className={c.block}>
				<PageBlockLoadingData />
			</div>
		)
	if (error || !data)
		return (
			<div className={c.block}>
				<PageBlockNoData />
			</div>
		)

	const maxPage = Math.ceil(data.total / limit)

	return (
		<div className={c.block}>
			<PageBlockHeader
				isPopular={isPopular}
				setIsPopular={setIsPopular}
				title="Ikonki"
				openAddForm={() => setIsFormOpened(true)}
			/>
			<div className={c.block__items}>
				{data.rows.map((i) => (
					<IconLibraryItem key={i.id} item={i} page={page} />
				))}
			</div>
			<PageBlockChangePage
				page={page}
				setPage={setPage}
				maxPage={maxPage}
			/>
			{isFormOpened && (
				<IconAddForm onClose={() => setIsFormOpened(false)} />
			)}
		</div>
	)
}

export default IconLibraryBlock
