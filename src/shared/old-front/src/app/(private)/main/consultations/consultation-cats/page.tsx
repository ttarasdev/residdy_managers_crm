'use client'

import c from './ConsultationCatsPage.module.scss'
import PageTitle from '@/components/page-components/page-title/PageTitle'
import ConsultationsCatsBlock from '@/components/consultations/consultation-cats/consultation-cats-block/ConsultationsCatsBlock'

const ConsultationCatsPage = () => {
	return (
		<div className={c.page}>
			<PageTitle title="Typy konsultacji" />
			<div className={c.page__row}>
				<ConsultationsCatsBlock />
			</div>
		</div>
	)
}

export default ConsultationCatsPage
