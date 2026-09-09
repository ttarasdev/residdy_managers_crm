'use client'

import PageTitle from '@/components/page-components/page-title/PageTitle'
import c from './CaseInstructionItemPage.module.scss'
import CaseInstructionItemBlock from '@/components/cases/case-instructions/case-instruction-item-block/CaseInstructionItemBlock'
import { usePathname } from 'next/navigation'

const CaseInstructionPage = () => {
	const pathname = usePathname()
	const id = Number(pathname.split('/').at(-1))

	return (
		<div className={c.page}>
			<PageTitle title="Zarządzanie instrukcją do spraw legalizacji" />
			<div className={c.page__row}>
				<CaseInstructionItemBlock id={id} />
			</div>
		</div>
	)
}

export default CaseInstructionPage
