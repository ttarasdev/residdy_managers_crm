'use client'

import PageTitle from '@/components/page-components/page-title/PageTitle'
import c from './RemindersPage.module.scss'

const RemindersPage = () => {
	return (
		<div className={c.page}>
			<PageTitle title="Reminders" />
			<div className={c.page__row}></div>
		</div>
	)
}

export default RemindersPage
