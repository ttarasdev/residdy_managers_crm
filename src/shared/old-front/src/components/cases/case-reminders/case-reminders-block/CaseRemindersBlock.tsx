'use client'

import { useState } from 'react'
import c from './CaseRemindersBlock.module.scss'
import { Languages } from '@/shared/types-enums/lans'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { caseRemindersApi } from '@/api/cases-api/case-reminders/case-reminders.api'
import PageBlockLoadingData from '@/components/page-block-components/page-block-loading-data/PageBlockLoadingData'
import PageBlockNoData from '@/components/page-block-components/page-block-no-data/PageBlockNoData'
import PageBlockHeader from '@/components/page-block-components/page-block-header/PageBlockHeader'
import {
	mapCaseInstructionsToTableRows,
	mapCaseRemindersToTableRows,
} from '@/shared/lib/dataToTableMap'
import PageBlockTable from '@/components/page-block-components/page-block-table/PageBlockTable'
import { PAGE_PATHS } from '@/shared/types-enums/paths'
import PageBlockChangePage from '@/components/page-block-components/page-block-change-page/PageBlockChangePage'
import CaseReminderAddForm from '../case-reminder-add-form/CaseReminderAddForm'

const CaseRemindersBlock = () => {
	const [isFormOpened, setIsFormOpened] = useState(false)
	const [page, setPage] = useState<number>(1)
	const [lan, setLan] = useState<Languages | null>(null)

	const limit = 10

	const { data, isLoading, error } = useQuery({
		queryKey: [QUERY_KEYS.CASE_REMINDERS_KEY, page, lan],
		queryFn: () => {
			const offset = (page - 1) * limit
			const params: Record<string, any> = {
				offset,
				limit,
			}
			if (lan !== null) params.lan = lan
			return caseRemindersApi.getAll(params)
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

	const tableData = mapCaseRemindersToTableRows(data.rows)

	return (
		<div className={c.block}>
			<PageBlockHeader
				lan={lan}
				setLan={setLan}
				title="Przypomnialki do zadań"
				openAddForm={() => setIsFormOpened(true)}
			/>
			<PageBlockTable
				itemPath={PAGE_PATHS.CASE_REMINDERS_PATH}
				data={tableData}
			/>
			<PageBlockChangePage
				page={page}
				setPage={setPage}
				maxPage={maxPage}
			/>
			{isFormOpened && (
				<CaseReminderAddForm onClose={() => setIsFormOpened(false)} />
			)}
		</div>
	)
}

export default CaseRemindersBlock
