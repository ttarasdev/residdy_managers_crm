'use client'

import PageTitle from '@/components/page-components/page-title/PageTitle'
import c from './FaqPage.module.scss'

const FaqPage = () => {
	return (
		<div className={c.page}>
			<PageTitle title="FAQ" />
			<div className={c.page__row}></div>
		</div>
	)
}

export default FaqPage
