'use client'

import { useState } from 'react'
import c from './MailNewsletterBlock.module.scss'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import { mailJobsApi } from '@/api/mails-api/mail-jobs/mail-jobs.api'
import PageBlockLoadingData from '@/components/page-block-components/page-block-loading-data/PageBlockLoadingData'
import PageBlockNoData from '@/components/page-block-components/page-block-no-data/PageBlockNoData'
import ItemBlockTop from '@/components/page-block-components/item-page/item-block-top/ItemBlockTop'
import ItemBlockHeader from '@/components/page-block-components/item-page/item-block-header/ItemBlockHeader'
import { formatDate } from '@/shared/lib/date'
import MailNewsletterScheduleForm from '../mail-newsletter-schedule-form/MailNewsletterScheduleForm'
import CreatedByCard from '@/components/manager-components/created-by-card/CreatedByCard'
import UserAudienceCard from '@/components/users/user-audience-card/UserAudienceCard'

interface Props {
	id: number
}

const MailNewsletterBlock: React.FC<Props> = ({ id }) => {
	const [isChangeFormOpened, setIsChangeFormOpened] = useState(false)
	const [isScheduleFormOpened, setIsScheduleFormOpened] = useState(false)
	const { data, isLoading, error } = useQuery({
		queryKey: [QUERY_KEYS.MAIL_JOBS, id],
		queryFn: () => mailJobsApi.getById({ id }),
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

	return (
		<div className={c.block}>
			<ItemBlockTop
				title={data.title}
				subtitle={data.subject}
				setIsFormOpened={() => setIsChangeFormOpened(true)}
				setIsSecondFormOpened={() => setIsScheduleFormOpened(true)}
				secondButtonTitle="zaplanuj"
			/>
			<ItemBlockHeader
				id={data.id}
				status={data.status.toString()}
				createdAt={formatDate(data.createdAt)}
			/>
			<div className={c.block__row}>
				<p className={c.block__text}>{data.text}</p>
				<div className={c.block__info}>
					<CreatedByCard id={data.createdByManagerId} />
					{data.audienceJson && (
						<UserAudienceCard audience={data.audienceJson} />
					)}
				</div>
			</div>
			{isChangeFormOpened && <span></span>}
			{isScheduleFormOpened && (
				<MailNewsletterScheduleForm
					id={id}
					onClose={() => setIsScheduleFormOpened(false)}
				/>
			)}
		</div>
	)
}

export default MailNewsletterBlock
