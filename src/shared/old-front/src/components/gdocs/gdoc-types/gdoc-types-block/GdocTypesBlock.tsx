'use client'

import { useState } from 'react'
import c from './GdocTypesBlock.module.scss'
import { GdocTypeStatus } from '@/api/gdocs-api/gdocs-types/gdocs-types.types'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { gdocsTypesApi } from '@/api/gdocs-api/gdocs-types/gdocs-types.api'
import PageBlockLoadingData from '@/components/page-block-components/page-block-loading-data/PageBlockLoadingData'
import PageBlockNoData from '@/components/page-block-components/page-block-no-data/PageBlockNoData'
import { mapGdocTypesToTableRows } from '@/shared/lib/dataToTableMap'
import PageBlockHeader from '@/components/page-block-components/page-block-header/PageBlockHeader'
import { gdocTypeStatusSelectData } from '@/shared/constants/form-select-data'
import PageBlockTable from '@/components/page-block-components/page-block-table/PageBlockTable'
import { PAGE_PATHS } from '@/shared/types-enums/paths'
import PageBlockChangePage from '@/components/page-block-components/page-block-change-page/PageBlockChangePage'
import GdocTypeAddForm from '../gdoc-type-add-form/GdocTypeAddForm'

const GdocTypesBlock = () => {
	const [isFormOpened, setIsFormOpened] = useState(false)
	const [page, setPage] = useState<number>(1)
	const [status, setStatus] = useState<GdocTypeStatus | null>(null)

	const limit = 8

	const { data, isLoading, error } = useQuery({
		queryKey: [QUERY_KEYS.GDOC_TYPES, status, page],
		queryFn: () => {
			const offset = (page - 1) * limit
			const params: Record<string, any> = {
				page,
				offset,
				limit,
			}
			if (status) params.status = status
			return gdocsTypesApi.list(params)
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

	const tableData = mapGdocTypesToTableRows(data.items)

	return (
		<div className={c.block}>
			<PageBlockHeader<GdocTypeStatus>
				status={status}
				setStatus={setStatus}
				statusItems={gdocTypeStatusSelectData}
				title="Lista kategorii generowania plików"
				openAddForm={() => setIsFormOpened(true)}
			/>
			<PageBlockTable
				itemPath={PAGE_PATHS.GDOCS_TYPES}
				data={tableData}
			/>
			<PageBlockChangePage
				page={page}
				setPage={setPage}
				maxPage={maxPage}
			/>
			{isFormOpened && (
				<GdocTypeAddForm onClose={() => setIsFormOpened(false)} />
			)}
		</div>
	)
}

export default GdocTypesBlock
