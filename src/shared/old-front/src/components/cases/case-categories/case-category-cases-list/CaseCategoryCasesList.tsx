'use client'

import { useState } from 'react'
import c from './CaseCategoryCasesList.module.scss'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { casesApi } from '@/api/cases-api/cases/cases.api'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import PageBlockLoadingData from '@/components/page-block-components/page-block-loading-data/PageBlockLoadingData'
import PageBlockNoData from '@/components/page-block-components/page-block-no-data/PageBlockNoData'
import { mapCasesToTableRows } from '@/shared/lib/dataToTableMap'
import PageBlockTable from '@/components/page-block-components/page-block-table/PageBlockTable'
import { PAGE_PATHS } from '@/shared/types-enums/paths'
import PageBlockChangePage from '@/components/page-block-components/page-block-change-page/PageBlockChangePage'

interface Props {
	caseTypeId: number
}

const CaseCategoryCasesList: React.FC<Props> = ({ caseTypeId }) => {
	const [page, setPage] = useState<number>(1)

	const limit = 8

	const { data, isLoading, error } = useQuery({
		queryKey: [QUERY_KEYS.CASES_KEY, page, caseTypeId],
		queryFn: () => {
			const offset = (page - 1) * limit
			const params: Record<string, any> = {
				offset,
				limit,
				typeId: caseTypeId,
			}

			return casesApi.list(params)
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

	const maxPage = Math.ceil(data.count / limit)

	const tableData = mapCasesToTableRows(data.rows)

	return (
		<div className={c.table}>
			<p className={c.table__title}>Lista spraw z tą kategorią</p>
			<PageBlockTable
				itemPath={PAGE_PATHS.CASES_ITEMS_PATH}
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

export default CaseCategoryCasesList
