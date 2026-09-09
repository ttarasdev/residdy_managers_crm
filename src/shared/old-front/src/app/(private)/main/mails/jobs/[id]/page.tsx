'use client'

import { usePathname } from 'next/navigation'
import MailNewsletterBlock from '@/components/mails/mail-newsletter/mail-newsletter-block/MailNewsletterBlock'
import c from './MailJobPage.module.scss'

const MailJobPage = () => {
	const pathname = usePathname()
	const id = Number(pathname.split('/').at(-1))

	return (
		<div className={c.page}>
			<MailNewsletterBlock id={id} />
		</div>
	)
}

export default MailJobPage
