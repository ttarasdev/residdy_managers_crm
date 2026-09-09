'use client'

import PageBlockHeader from '@/components/page-block-components/page-block-header/PageBlockHeader'
import c from './CasesItemsBlock.module.scss'
import { useState } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { casesApi } from '@/api/cases-api/cases/cases.api'
import CasesAddForm from '../cases-add-form/CasesAddForm'
import PageBlockTable from '@/components/page-block-components/page-block-table/PageBlockTable'
import { PAGE_PATHS } from '@/shared/types-enums/paths'
import PageBlockChangePage from '@/components/page-block-components/page-block-change-page/PageBlockChangePage'
import { mapCasesToTableRows } from '@/shared/lib/dataToTableMap'
import PageBlockLoadingData from '@/components/page-block-components/page-block-loading-data/PageBlockLoadingData'
import { Languages } from '@/shared/types-enums/lans'
import PageBlockNoData from '@/components/page-block-components/page-block-no-data/PageBlockNoData'
import { caseStatusSelectData } from '@/shared/constants/form-select-data'
import { CaseStatus } from '@/api/cases-api/cases/cases.type'

const CasesItemsBlock = () => {
	const [isFormOpened, setIsFormOpened] = useState(false)
	const [page, setPage] = useState<number>(1)
	const [lan, setLan] = useState<Languages | null>(null)
	const [isPopular, setIsPopular] = useState<boolean | null>(null)
	const [status, setStatus] = useState<CaseStatus | null>(null)

	const limit = 8

	const { data, isLoading, error } = useQuery({
		queryKey: [QUERY_KEYS.CASES_KEY, page, lan, isPopular, status],
		queryFn: () => {
			const offset = (page - 1) * limit
			const params: Record<string, any> = {
				offset,
				limit,
			}
			if (lan) params.lan = lan
			if (isPopular) params.isPopular = isPopular
			if (status) params.status = status

			return casesApi.list(params)
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

	const tableData = mapCasesToTableRows(data.rows)

	return (
		<div className={c.block}>
			<PageBlockHeader<CaseStatus>
				lan={lan}
				setLan={setLan}
				status={status}
				setStatus={setStatus as any}
				statusItems={caseStatusSelectData}
				isPopular={isPopular}
				setIsPopular={setIsPopular}
				title="Sprawy legalizacji"
				openAddForm={() => setIsFormOpened(true)}
			/>
			<PageBlockTable
				itemPath={PAGE_PATHS.CASES_ITEMS_PATH}
				data={tableData}
			/>
			<PageBlockChangePage
				page={page}
				setPage={setPage}
				maxPage={maxPage}
			/>
			{isFormOpened && (
				<CasesAddForm onClose={() => setIsFormOpened(false)} />
			)}
		</div>
	)
}

export default CasesItemsBlock
