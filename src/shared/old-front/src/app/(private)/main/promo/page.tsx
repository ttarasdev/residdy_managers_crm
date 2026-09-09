'use client'

import PageTitle from '@/components/page-components/page-title/PageTitle'
import c from './PromoPage.module.scss'
import PromocodesBlock from '@/components/promocodes/promocodes-block/PromocodesBlock'
import PageBlockTipList from '@/components/page-block-components/page-block-tip-list/PageBlockTipList'
import { casesBlockTipList } from '@/shared/constants/tips-data'

const PromoPage = () => {
	return (
		<div className={c.page}>
			<PageTitle title="Promo" />
			<div className={c.page__row}>
				<PromocodesBlock />
				<PageBlockTipList tips={casesBlockTipList} />
			</div>
		</div>
	)
}

export default PromoPage
