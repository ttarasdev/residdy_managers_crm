'use client'

import { useState } from 'react'
import c from './GdocsBlock.module.scss'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import PageBlockLoadingData from '@/components/page-block-components/page-block-loading-data/PageBlockLoadingData'
import PageBlockNoData from '@/components/page-block-components/page-block-no-data/PageBlockNoData'
import { mapGdocsToTableRows } from '@/shared/lib/dataToTableMap'
import PageBlockHeader from '@/components/page-block-components/page-block-header/PageBlockHeader'
import PageBlockTable from '@/components/page-block-components/page-block-table/PageBlockTable'
import { PAGE_PATHS } from '@/shared/types-enums/paths'
import PageBlockChangePage from '@/components/page-block-components/page-block-change-page/PageBlockChangePage'
import { gdocsApi } from '@/api/gdocs-api/gdocs/gdocs.api'
import { GdocTemplateStatus } from '@/api/gdocs-api/gdocs/gdocs.types'
import { gdocStatusFilterData } from '@/shared/constants/new-filters-data'
import GdocsAddForm from '../gdocs-add-form/GdocsAddForm'

const GdocsBlock = () => {
	const [isFormOpened, setIsFormOpened] = useState(false)
	const [page, setPage] = useState<number>(1)
	const [status, setStatus] = useState<GdocTemplateStatus | null>(null)

	const limit = 8

	const { data, isLoading, error } = useQuery({
		queryKey: [QUERY_KEYS.GDOCS, status, page],
		queryFn: () => {
			const offset = (page - 1) * limit
			const params: Record<string, any> = {
				page,
				offset,
				limit,
			}
			if (status) params.status = status
			return gdocsApi.list(params)
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

	const tableData = mapGdocsToTableRows(data.items)

	return (
		<div className={c.block}>
			<PageBlockHeader<GdocTemplateStatus>
				status={status}
				setStatus={setStatus}
				statusItems={gdocStatusFilterData}
				title="Lista kategorii generowania plików"
				openAddForm={() => setIsFormOpened(true)}
			/>
			<PageBlockTable
				itemPath={PAGE_PATHS.GDOCS_ITEMS}
				data={tableData}
			/>
			<PageBlockChangePage
				page={page}
				setPage={setPage}
				maxPage={maxPage}
			/>
			{isFormOpened && (
				<GdocsAddForm onClose={() => setIsFormOpened(false)} />
			)}
		</div>
	)
}

export default GdocsBlock
