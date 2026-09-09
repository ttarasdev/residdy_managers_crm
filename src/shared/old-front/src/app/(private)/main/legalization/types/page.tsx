'use client'

import PageTitle from '@/components/page-components/page-title/PageTitle'
import c from './TypesPage.module.scss'
import CasesStatusStats from '@/components/cases/cases/cases-status-stats/CasesStatusStats'
import CaseCategoriesBlock from '@/components/cases/case-categories/case-categories-block/CaseCategoriesBlock'

const LegalizationTypesPage = () => {
	return (
		<div className={c.page}>
			<PageTitle title="Zarządzanie typami sprawam legalizacji" />
			<div className={c.page__row}>
				<CasesStatusStats />
				<CaseCategoriesBlock />
			</div>
		</div>
	)
}

export default LegalizationTypesPage
