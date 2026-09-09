'use client'

import c from './CasesPage.module.scss'
import PageTitle from '@/components/page-components/page-title/PageTitle'
import CasesItemsBlock from '@/components/cases/cases/cases-items-block/CasesItemsBlock'
import PageBlockTipList from '@/components/page-block-components/page-block-tip-list/PageBlockTipList'
import { casesBlockTipList } from '@/shared/constants/tips-data'

const LegalizationCasesPage = () => {
	return (
		<div className={c.page}>
			<PageTitle title="Zarządzanie sprawami legalizacji" />
			<div className={c.page__row}>
				<CasesItemsBlock />
				<PageBlockTipList tips={casesBlockTipList} />
			</div>
		</div>
	)
}

export default LegalizationCasesPage
