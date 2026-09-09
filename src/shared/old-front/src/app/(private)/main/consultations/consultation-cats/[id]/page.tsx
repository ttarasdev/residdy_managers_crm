'use client'

import { usePathname } from 'next/navigation'
import c from './ConsultationCatPage.module.scss'
import ConsultationCatBlock from '@/components/consultations/consultation-cats/consultation-cat-block/ConsultationCatBlock'

const ConsultationCatPage = () => {
	const pathname = usePathname()
	const id = Number(pathname.split('/').at(-1))

	return (
		<div className={c.page}>
			<ConsultationCatBlock id={id} />
		</div>
	)
}

export default ConsultationCatPage
