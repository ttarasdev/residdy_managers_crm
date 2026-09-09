'use client'

import PageTitle from '@/components/page-components/page-title/PageTitle'
import c from './GdocsVarsPage.module.scss'
import PageBlockTipList from '@/components/page-block-components/page-block-tip-list/PageBlockTipList'
import { casesBlockTipList } from '@/shared/constants/tips-data'
import GdocVarsBlock from '@/components/gdocs/gdoc-vars/gdoc-vars-block/GdocVarsBlock'

const GdocsVarsPage = () => {
	return (
		<div className={c.page}>
			<PageTitle title="Generacja dokumentów - zmienne" />
			<div className={c.page__row}>
				<GdocVarsBlock />
				<PageBlockTipList tips={casesBlockTipList} />
			</div>
		</div>
	)
}

export default GdocsVarsPage
