'use client'

import PageTitle from '@/components/page-components/page-title/PageTitle'
import c from './MailJobsPage.module.scss'
import MailNewslettersBlock from '@/components/mails/mail-newsletter/mail-newsletters-block/MailNewslettersBlock'
import PageBlockTipList from '@/components/page-block-components/page-block-tip-list/PageBlockTipList'
import { casesBlockTipList } from '@/shared/constants/tips-data'

const MailJobsPage = () => {
	return (
		<div className={c.page}>
			<PageTitle title="mails" />
			<div className={c.page__row}>
				<MailNewslettersBlock />
				<PageBlockTipList tips={casesBlockTipList} />
			</div>
		</div>
	)
}

export default MailJobsPage
