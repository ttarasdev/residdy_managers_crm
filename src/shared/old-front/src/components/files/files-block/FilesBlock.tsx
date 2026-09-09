'use client'

import { useState } from 'react'
import c from './FilesBlock.module.scss'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import PageBlockLoadingData from '@/components/page-block-components/page-block-loading-data/PageBlockLoadingData'
import PageBlockNoData from '@/components/page-block-components/page-block-no-data/PageBlockNoData'
import PageBlockHeader from '@/components/page-block-components/page-block-header/PageBlockHeader'
import PageBlockChangePage from '@/components/page-block-components/page-block-change-page/PageBlockChangePage'
import FilesTable from '../files-table/FilesTable'
import { PRIVATE_BUCKETS } from '@/shared/types-enums/buckets'
import { MediaTypeEnum } from '@/shared/types-enums/media'
import { companyAssetsApi } from '@/api/media/company-assets/company-assets.api'
import CompanyAssetAddForm from '@/components/media/media-add-item-form/CompanyAssetAddForm'

interface Props {
	defaultBucket: PRIVATE_BUCKETS
}

const FilesBlock: React.FC<Props> = ({ defaultBucket }) => {
	const [isFormOpened, setIsFormOpened] = useState(false)
	const [page, setPage] = useState<number>(1)
	const [isPopular, setIsPopular] = useState<boolean | null>(null)
	const [bucket, setBucket] = useState<PRIVATE_BUCKETS>(defaultBucket)

	const { data, isLoading, error } = useQuery({
		queryKey: [QUERY_KEYS.MEDIA_ICON_KEY, bucket, page],
		queryFn: () =>
			companyAssetsApi.list({
				bucket: bucket,
				page,
				limit: 40,
			}),
		placeholderData: keepPreviousData,
		staleTime: 60_000,
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

	const maxPage = Math.ceil(data.total / 40)

	return (
		<div className={c.block}>
			<PageBlockHeader
				isPopular={isPopular}
				setIsPopular={setIsPopular}
				title="pliki do wysylania"
				openAddForm={() => setIsFormOpened(true)}
			/>
			<FilesTable data={data.items} bucket={bucket} page={page} />
			<PageBlockChangePage
				page={page}
				setPage={setPage}
				maxPage={maxPage}
			/>
			{isFormOpened && (
				<CompanyAssetAddForm
					bucket={bucket}
					onClose={() => setIsFormOpened(false)}
				/>
			)}
		</div>
	)
}

export default FilesBlock
