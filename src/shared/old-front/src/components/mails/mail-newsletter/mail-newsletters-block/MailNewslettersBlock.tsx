'use client'

import { useState } from 'react'
import c from './MailNewslettersBlock.module.scss'
import { MailJobStatus } from '@/api/mails-api/mail-jobs/mail-jobs.types'
import { MailAccount } from '@/api/mails-api/mail-accounts/mail-accounts.types'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { mailJobsApi } from '@/api/mails-api/mail-jobs/mail-jobs.api'
import PageBlockNoData from '@/components/page-block-components/page-block-no-data/PageBlockNoData'
import PageBlockLoadingData from '@/components/page-block-components/page-block-loading-data/PageBlockLoadingData'
import { mapMailJobsToTableRows } from '@/shared/lib/dataToTableMap'
import PageBlockHeader from '@/components/page-block-components/page-block-header/PageBlockHeader'
import { mailJobsStatusSelectData } from '@/shared/constants/form-select-data'
import PageBlockTable from '@/components/page-block-components/page-block-table/PageBlockTable'
import { PAGE_PATHS } from '@/shared/types-enums/paths'
import PageBlockChangePage from '@/components/page-block-components/page-block-change-page/PageBlockChangePage'
import MailNewsletterAddForm from '../mail-newsletter-add-form/MailNewsletterAddForm'

const MailNewslettersBlock = () => {
	const [isFormOpened, setIsFormOpened] = useState(false)
	const [status, setStatus] = useState<MailJobStatus | null>(null)
	const [account, setAccount] = useState<MailAccount | null>(null)
	const [page, setPage] = useState<number>(1)

	const limit = 10

	const { data, isLoading, error } = useQuery({
		queryKey: [QUERY_KEYS.MAIL_JOBS, status, account, page],
		queryFn: () => {
			const offset = (page - 1) * limit
			const params: Record<string, any> = {
				offset,
				limit,
			}
			if (status) params.status = status
			if (account) params.account = account

			return mailJobsApi.list(params)
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

	const tableData = mapMailJobsToTableRows(data.rows)

	return (
		<div className={c.block}>
			<PageBlockHeader<MailJobStatus>
				status={status}
				setStatus={setStatus as any}
				statusItems={mailJobsStatusSelectData}
				title="newslettery"
				openAddForm={() => setIsFormOpened(true)}
			/>
			<PageBlockTable itemPath={PAGE_PATHS.MAIL_JOBS} data={tableData} />
			<PageBlockChangePage
				page={page}
				setPage={setPage}
				maxPage={maxPage}
			/>
			{isFormOpened && (
				<MailNewsletterAddForm onClose={() => setIsFormOpened(false)} />
			)}
		</div>
	)
}

export default MailNewslettersBlock
