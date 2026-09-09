'use client'

import { caseTypesApi } from '@/api/cases-api/cases-types/case-types.api'
import c from './CaseCategoriesBlock.module.scss'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { CaseTypeStatus } from '@/api/cases-api/cases-types/case-types.types'
import { Languages } from '@/shared/types-enums/lans'
import PageBlockLoadingData from '@/components/page-block-components/page-block-loading-data/PageBlockLoadingData'
import { mapCaseTypesToTableRows } from '@/shared/lib/dataToTableMap'
import PageBlockHeader from '@/components/page-block-components/page-block-header/PageBlockHeader'
import PageBlockTable from '@/components/page-block-components/page-block-table/PageBlockTable'
import { PAGE_PATHS } from '@/shared/types-enums/paths'
import PageBlockChangePage from '@/components/page-block-components/page-block-change-page/PageBlockChangePage'
import PageBlockNoData from '@/components/page-block-components/page-block-no-data/PageBlockNoData'
import CaseCategoriesAddForm from '../case-categories-add-form/CaseCategoriesAddForm'
import { caseTypeStatusFilterData } from '@/shared/constants/new-filters-data'

const CaseCategoriesBlock = () => {
	const [isFormOpened, setIsFormOpened] = useState(false)
	const [page, setPage] = useState<number>(1)
	const [lan, setLan] = useState<Languages | null>(null)
	const [isPopular, setIsPopular] = useState<boolean | null>(null)
	const [status, setStatus] = useState<CaseTypeStatus | null>(null)

	const limit = 8

	const { data, isLoading, error } = useQuery({
		queryKey: [QUERY_KEYS.CASE_TYPES_KEY, status, page, lan, isPopular],
		queryFn: () => {
			const offset = (page - 1) * limit
			const params: Record<string, any> = {
				page,
				offset,
				limit,
			}
			if (status) params.status = status
			if (lan) params.lan = lan
			if (isPopular) params.isPopular = isPopular
			return caseTypesApi.list(params)
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

	const maxPage = Math.ceil(data.count / limit)

	const tableData = mapCaseTypesToTableRows(data.rows)

	return (
		<div className={c.block}>
			<PageBlockHeader<CaseTypeStatus>
				lan={lan}
				setLan={setLan}
				status={status}
				setStatus={setStatus}
				statusItems={caseTypeStatusFilterData}
				isPopular={isPopular}
				setIsPopular={setIsPopular}
				title="Typy spraw legalizacji"
				openAddForm={() => setIsFormOpened(true)}
			/>
			<PageBlockTable
				itemPath={PAGE_PATHS.CASES_TYPES_PATH}
				data={tableData}
			/>
			<PageBlockChangePage
				page={page}
				setPage={setPage}
				maxPage={maxPage}
			/>
			{isFormOpened && (
				<CaseCategoriesAddForm onClose={() => setIsFormOpened(false)} />
			)}
		</div>
	)
}

export default CaseCategoriesBlock
