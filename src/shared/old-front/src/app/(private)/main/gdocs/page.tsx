'use client'

import PageTitle from '@/components/page-components/page-title/PageTitle'
import c from './GdocsPage.module.scss'
import GdocTypesBlock from '@/components/gdocs/gdoc-types/gdoc-types-block/GdocTypesBlock'
import PageBlockTipList from '@/components/page-block-components/page-block-tip-list/PageBlockTipList'
import { casesBlockTipList } from '@/shared/constants/tips-data'
import GdocsBlock from '@/components/gdocs/gdocs/gdocs-block/GdocsBlock'
import GdocVarsBlock from '@/components/gdocs/gdoc-vars/gdoc-vars-block/GdocVarsBlock'

const GdocsPage = () => {
	return (
		<div className={c.page}>
			<PageTitle title="Gdocs" />
			<div className={c.page__row}>
				<GdocTypesBlock />
				<PageBlockTipList tips={casesBlockTipList} />
			</div>
			<div className={c.page__row}>
				<GdocsBlock />
			</div>
			<div className={c.page__row}>
				<GdocVarsBlock />
			</div>
		</div>
	)
}

export default GdocsPage
