import c from './CaseInstructionPage.module.scss'
import PageTitle from '@/components/page-components/page-title/PageTitle'
import CaseInstructionsBlock from '@/components/cases/case-instructions/case-instruction-block/CaseInstructionsBlock'
import PageBlockTipList from '@/components/page-block-components/page-block-tip-list/PageBlockTipList'
import { casesBlockTipList } from '@/shared/constants/tips-data'

const InstructionsPage = () => {
	return (
		<div className={c.page}>
			<PageTitle title="Zarządzanie instrukcjami do spraw legalizacji" />
			<div className={c.page__row}>
				<CaseInstructionsBlock />
				<PageBlockTipList tips={casesBlockTipList} />
			</div>
		</div>
	)
}

export default InstructionsPage
