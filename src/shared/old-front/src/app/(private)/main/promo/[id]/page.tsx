'use client'

import { usePathname } from 'next/navigation'
import c from './PromocodePage.module.scss'
import PageBlockTipList from '@/components/page-block-components/page-block-tip-list/PageBlockTipList'
import { casesBlockTipList } from '@/shared/constants/tips-data'
import PromocodeBlock from '@/components/promocodes/promocode-block/PromocodeBlock'

const PromocodePage = () => {
	const pathname = usePathname()
	const id = Number(pathname.split('/').at(-1))

	return (
		<div className={c.page}>
			<div className={c.page__row}>
				<PromocodeBlock id={id} />
				<PageBlockTipList tips={casesBlockTipList} />
			</div>
		</div>
	)
}

export default PromocodePage
