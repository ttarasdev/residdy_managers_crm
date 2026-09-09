'use client'

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import c from './CaseReminderItemBlock.module.scss'
import { useState } from 'react'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { caseRemindersApi } from '@/api/cases-api/case-reminders/case-reminders.api'
import PageBlockLoadingData from '@/components/page-block-components/page-block-loading-data/PageBlockLoadingData'
import PageBlockNoData from '@/components/page-block-components/page-block-no-data/PageBlockNoData'
import ItemBlockTop from '@/components/page-block-components/item-page/item-block-top/ItemBlockTop'
import ItemBlockHeader from '@/components/page-block-components/item-page/item-block-header/ItemBlockHeader'
import { formatDate } from '@/shared/lib/date'
import CaseReminderChangeForm from '../case-reminder-change-form/CaseReminderChangeForm'
import ItemBlockText from '@/components/page-block-components/item-page/item-block-text/ItemBlockText'

interface Props {
	id: number
}

const CaseReminderItemBlock: React.FC<Props> = ({ id }) => {
	const [isChangeFormOpened, setIsChangeFormOpened] = useState(false)

	const { data, isLoading, error } = useQuery({
		queryKey: [QUERY_KEYS.CASE_REMINDERS_KEY, id],
		queryFn: () => caseRemindersApi.getOne(id),
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

	return (
		<div className={c.block}>
			<ItemBlockTop
				title={data.topic}
				subtitle={data.lan}
				setIsFormOpened={() => setIsChangeFormOpened(true)}
			/>
			<ItemBlockHeader
				id={data.id}
				lan={data.lan}
				createdAt={formatDate(data.createdAt)}
			/>
			<div className={c.block__row}>
				<ItemBlockText text={data.text} />
			</div>
			{isChangeFormOpened && (
				<CaseReminderChangeForm
					reminder={data}
					onClose={() => setIsChangeFormOpened(false)}
				/>
			)}
		</div>
	)
}

export default CaseReminderItemBlock
