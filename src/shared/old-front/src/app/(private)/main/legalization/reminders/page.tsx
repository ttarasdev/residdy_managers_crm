'use client'

import PageTitle from '@/components/page-components/page-title/PageTitle'
import c from './CaseRemindersPage.module.scss'
import CaseRemindersBlock from '@/components/cases/case-reminders/case-reminders-block/CaseRemindersBlock'
import PageBlockTipList from '@/components/page-block-components/page-block-tip-list/PageBlockTipList'
import { casesBlockTipList } from '@/shared/constants/tips-data'

const CaseRemindersPage = () => {
	return (
		<div className={c.page}>
			<PageTitle title="Zarządzanie iprzypomniałkami do spraw legalizacji" />
			<div className={c.page__row}>
				<CaseRemindersBlock />
				<PageBlockTipList tips={casesBlockTipList} />
			</div>
		</div>
	)
}

export default CaseRemindersPage
