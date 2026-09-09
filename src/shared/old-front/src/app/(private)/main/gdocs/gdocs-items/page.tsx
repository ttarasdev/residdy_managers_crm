'use client'

import PageTitle from '@/components/page-components/page-title/PageTitle'
import c from './GdocsItemsPage.module.scss'
import PageBlockTipList from '@/components/page-block-components/page-block-tip-list/PageBlockTipList'
import { casesBlockTipList } from '@/shared/constants/tips-data'
import GdocsBlock from '@/components/gdocs/gdocs/gdocs-block/GdocsBlock'

const GdocsPage = () => {
	return (
		<div className={c.page}>
			<PageTitle title="Gdocs" />
			<div className={c.page__row}>
				<GdocsBlock />
				<PageBlockTipList tips={casesBlockTipList} />
			</div>
		</div>
	)
}

export default GdocsPage
