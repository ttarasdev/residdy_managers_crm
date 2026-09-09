'use client'

import PageTitle from '@/components/page-components/page-title/PageTitle'
import c from './SpecialistsPage.module.scss'
import SpecialistsBlock from '@/components/specialists/specialists-block/SpecialistsBlock'

const SpecialistsPage = () => {
	return (
		<div className={c.page}>
			<PageTitle title="Specialists" />
			<div className={c.page__row}>
				<SpecialistsBlock />
			</div>
		</div>
	)
}

export default SpecialistsPage
