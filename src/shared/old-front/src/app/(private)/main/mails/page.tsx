'use client'

import PageTitle from '@/components/page-components/page-title/PageTitle'
import c from './MailsPage.module.scss'
import MailNewslettersBlock from '@/components/mails/mail-newsletter/mail-newsletters-block/MailNewslettersBlock'
import PageBlockTipList from '@/components/page-block-components/page-block-tip-list/PageBlockTipList'
import { casesBlockTipList } from '@/shared/constants/tips-data'
import FilesBlock from '@/components/files/files-block/FilesBlock'
import MailNewsletterVariantsBlock from '@/components/mails/mail-newsletter/mail-newsletter-variants-block/MailNewsletterVariantsBlock'
import { PRIVATE_BUCKETS } from '@/shared/types-enums/buckets'

const MailsPage = () => {
	return (
		<div className={c.page}>
			<PageTitle title="mails" />
			<div className={c.page__row}>
				<MailNewslettersBlock />
				<PageBlockTipList tips={casesBlockTipList} />
			</div>
			<div className={c.page__row}>
				<FilesBlock defaultBucket={PRIVATE_BUCKETS.MAIL_ATTACHMENTS} />
				<MailNewsletterVariantsBlock />
			</div>
		</div>
	)
}

export default MailsPage
