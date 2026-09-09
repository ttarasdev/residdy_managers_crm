'use client'

import PageTitle from '@/components/page-components/page-title/PageTitle'
import c from './TypePage.module.scss'
import { usePathname } from 'next/navigation'
import CaseCategoryItemBlock from '@/components/cases/case-categories/case-category-item-block/CaseCategoryItemBlock'
import PageBlockTipList from '@/components/page-block-components/page-block-tip-list/PageBlockTipList'
import { casesBlockTipList } from '@/shared/constants/tips-data'

const TypePage = () => {
	const pathname = usePathname()
	const id = Number(pathname.split('/').at(-1))

	return (
		<div className={c.page}>
			<PageTitle title="Zarządzanie typami sprawam legalizacji" />
			<div className={c.page__row}>
				<CaseCategoryItemBlock id={id} />
				<PageBlockTipList tips={casesBlockTipList} />
			</div>
		</div>
	)
}

export default TypePage
