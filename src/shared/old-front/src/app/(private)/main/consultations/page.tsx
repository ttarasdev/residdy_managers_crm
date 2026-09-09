'use client'

import PageTitle from '@/components/page-components/page-title/PageTitle'
import c from './ConsultationsPage.module.scss'
import ConsultationsCatsBlock from '@/components/consultations/consultation-cats/consultation-cats-block/ConsultationsCatsBlock'

const GdocsPage = () => {
	return (
		<div className={c.page}>
			<PageTitle title="Konsultacje" />
			<div className={c.page__row}>
				<ConsultationsCatsBlock />
			</div>
		</div>
	)
}

export default GdocsPage
