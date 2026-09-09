import PageTitle from '@/components/page-components/page-title/PageTitle'
import c from './CasesPage.module.scss'
import CasesItemsBlock from '@/components/cases/cases/cases-items-block/CasesItemsBlock'
import PageBlockTipList from '@/components/page-block-components/page-block-tip-list/PageBlockTipList'
import { casesBlockTipList } from '@/shared/constants/tips-data'
import CaseCategoriesBlock from '@/components/cases/case-categories/case-categories-block/CaseCategoriesBlock'
import CasesStatusStats from '@/components/cases/cases/cases-status-stats/CasesStatusStats'
import CaseInstructionsBlock from '@/components/cases/case-instructions/case-instruction-block/CaseInstructionsBlock'
import CaseRemindersBlock from '@/components/cases/case-reminders/case-reminders-block/CaseRemindersBlock'

const LegalizationPage = () => {
	return (
		<div className={c.page}>
			<PageTitle title="Zarządzanie sprawami legalizacji" />
			<div className={c.page__row}>
				<CasesItemsBlock />
				<PageBlockTipList tips={casesBlockTipList} />
			</div>
			<div className={c.page__row}>
				<CasesStatusStats />
				<CaseCategoriesBlock />
			</div>
			<div className={c.page__row}>
				<CaseInstructionsBlock />
				<CaseRemindersBlock />
			</div>
		</div>
	)
}

export default LegalizationPage
