'use client'

import { MailJob } from '@/api/mails-api/mail-jobs/mail-jobs.types'
import c from './MailNewletterCHangeForm.module.scss'

interface Props {
	data: MailJob
	onClose: () => void
}

const MailNewsletterChangeForm: React.FC<Props> = ({ data, onClose }) => {
	return <div>example</div>
}

export default MailNewsletterChangeForm
