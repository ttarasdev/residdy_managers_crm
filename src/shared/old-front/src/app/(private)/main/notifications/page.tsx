'use client'

import PageTitle from '@/components/page-components/page-title/PageTitle'
import c from './NotificationsPage.module.scss'

const NotificationsPage = () => {
	return (
		<div className={c.page}>
			<PageTitle title="Notifications" />
			<div className={c.page__row}></div>
		</div>
	)
}

export default NotificationsPage
