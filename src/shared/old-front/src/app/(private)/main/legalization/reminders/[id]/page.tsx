'use client'

import { usePathname } from 'next/navigation'
import c from './CaseRemindersItemPage.module.scss'
import PageTitle from '@/components/page-components/page-title/PageTitle'
import CaseReminderItemBlock from '@/components/cases/case-reminders/case-reminder-item-block/CaseReminderItemBlock'

const CaseRemindersItemPage = () => {
	const pathname = usePathname()
	const id = Number(pathname.split('/').at(-1))

	return (
		<div className={c.page}>
			<PageTitle title="Zarządzanie przypomnieniem do spraw legalizacji" />
			<div className={c.page__row}>
				<CaseReminderItemBlock id={id} />
			</div>
		</div>
	)
}

export default CaseRemindersItemPage
