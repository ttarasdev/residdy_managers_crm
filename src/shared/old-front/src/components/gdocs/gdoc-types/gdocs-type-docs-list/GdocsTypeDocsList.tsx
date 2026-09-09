'use client'

import { useState } from 'react'
import c from './GdocsTypeDocsList.module.scss'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { gdocsApi } from '@/api/gdocs-api/gdocs/gdocs.api'
import PageBlockLoadingData from '@/components/page-block-components/page-block-loading-data/PageBlockLoadingData'
import PageBlockNoData from '@/components/page-block-components/page-block-no-data/PageBlockNoData'
import { mapGdocsToTableRows } from '@/shared/lib/dataToTableMap'
import PageBlockTable from '@/components/page-block-components/page-block-table/PageBlockTable'
import { PAGE_PATHS } from '@/shared/types-enums/paths'
import PageBlockChangePage from '@/components/page-block-components/page-block-change-page/PageBlockChangePage'

interface Props {
	gDocTypeId: number
}

const GdocsTypeDocsList: React.FC<Props> = ({ gDocTypeId }) => {
	const [page, setPage] = useState<number>(1)

	const limit = 8

	const { data, isLoading, error } = useQuery({
		queryKey: [QUERY_KEYS.GDOCS, page, gDocTypeId],
		queryFn: () => {
			const offset = (page - 1) * limit
			const params: Record<string, any> = {
				offset,
				limit,
				gDocTypeId,
			}

			return gdocsApi.list(params)
		},
		placeholderData: keepPreviousData,
	})

	if (isLoading)
		return (
			<div className={c.table}>
				<PageBlockLoadingData />
			</div>
		)
	if (error || !data)
		return (
			<div className={c.table}>
				<PageBlockNoData />
			</div>
		)

	const maxPage = Math.ceil(data.total / limit)

	const tableData = mapGdocsToTableRows(data.items)

	return (
		<div className={c.table}>
			<p className={c.table__title}>Lista dokumentów z tą kategorią</p>
			<PageBlockTable
				itemPath={PAGE_PATHS.GDOCS_ITEMS}
				data={tableData}
			/>
			<PageBlockChangePage
				page={page}
				setPage={setPage}
				maxPage={maxPage}
			/>
		</div>
	)
}

export default GdocsTypeDocsList
