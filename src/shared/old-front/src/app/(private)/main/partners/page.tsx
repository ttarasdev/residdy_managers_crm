'use client'

import PageTitle from '@/components/page-components/page-title/PageTitle'
import c from './PartnersPage.module.scss'
import PageBlockTipList from '@/components/page-block-components/page-block-tip-list/PageBlockTipList'
import { casesBlockTipList } from '@/shared/constants/tips-data'
import PartnersBlock from '@/components/partners/partners/partners-block/PartnersBlock'

const PartnersPage = () => {
	return (
		<div className={c.page}>
			<PageTitle title="Partners" />
			<div className={c.page__row}>
				<PartnersBlock />
			</div>
		</div>
	)
}

export default PartnersPage
