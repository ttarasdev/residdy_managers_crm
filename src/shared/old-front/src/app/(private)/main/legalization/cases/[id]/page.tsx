'use client'

import CaseBlock from '@/components/cases/cases/case-block/CaseBlock'
import { usePathname } from 'next/navigation'
import c from './CasePage.module.scss'

const CaseItemPage = () => {
	const pathname = usePathname()
	const id = Number(pathname.split('/').at(-1))

	return (
		<div className={c.page}>
			<CaseBlock id={id} />
		</div>
	)
}

export default CaseItemPage
