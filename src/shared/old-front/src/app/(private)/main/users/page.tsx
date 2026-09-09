'use client'

import PageTitle from '@/components/page-components/page-title/PageTitle'
import c from './UsersPage.module.scss'

const UsersPage = () => {
	return (
		<div className={c.page}>
			<PageTitle title="Users" />
			<div className={c.page__row}></div>
		</div>
	)
}

export default UsersPage
