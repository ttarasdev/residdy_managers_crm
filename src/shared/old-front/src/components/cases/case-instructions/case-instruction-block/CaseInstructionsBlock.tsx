'use client'

import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import c from './CaseInstructionsBlock.module.scss'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Languages } from '@/shared/types-enums/lans'
import { caseInstructionsApi } from '@/api/cases-api/case-instructions/case-instructions.api'
import PageBlockLoadingData from '@/components/page-block-components/page-block-loading-data/PageBlockLoadingData'
import PageBlockNoData from '@/components/page-block-components/page-block-no-data/PageBlockNoData'
import PageBlockHeader from '@/components/page-block-components/page-block-header/PageBlockHeader'
import PageBlockTable from '@/components/page-block-components/page-block-table/PageBlockTable'
import { PAGE_PATHS } from '@/shared/types-enums/paths'
import { mapCaseInstructionsToTableRows } from '@/shared/lib/dataToTableMap'
import PageBlockChangePage from '@/components/page-block-components/page-block-change-page/PageBlockChangePage'
import CaseInstructionAddForm from '../case-instruction-add-form/CaseInstructionAddForm'

const CaseInstructionsBlock = () => {
	const [isFormOpened, setIsFormOpened] = useState(false)
	const [page, setPage] = useState<number>(1)
	const [lan, setLan] = useState<Languages | null>(null)
	const [isPopular, setIsPopular] = useState<boolean | null>(null)

	const limit = 10

	const { data, isLoading, error } = useQuery({
		queryKey: [QUERY_KEYS.CASE_INSTRUCTIONS_KEY, page, lan, isPopular],
		queryFn: () => {
			const offset = (page - 1) * limit
			const params: Record<string, any> = {
				offset,
				limit,
			}
			if (lan !== null) params.lan = lan
			if (isPopular !== null) params.isPopular = isPopular
			return caseInstructionsApi.getAll(params)
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

	const tableData = mapCaseInstructionsToTableRows(data.rows)

	return (
		<div className={c.block}>
			<PageBlockHeader
				lan={lan}
				setLan={setLan}
				isPopular={isPopular}
				setIsPopular={setIsPopular}
				title="Instrukcje do spraw legalizacji"
				openAddForm={() => setIsFormOpened(true)}
			/>
			<PageBlockTable
				itemPath={PAGE_PATHS.CASE_INSTRUCTIONS_PATH}
				data={tableData}
			/>
			<PageBlockChangePage
				page={page}
				setPage={setPage}
				maxPage={maxPage}
			/>
			{isFormOpened && (
				<CaseInstructionAddForm
					onClose={() => setIsFormOpened(false)}
				/>
			)}
		</div>
	)
}

export default CaseInstructionsBlock
