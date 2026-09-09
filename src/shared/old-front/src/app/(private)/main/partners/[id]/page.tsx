'use client'

import { usePathname } from 'next/navigation'
import c from './PartnerPage.module.scss'
import PartnerBlock from '@/components/partners/partners/partner-block/PartnerBlock'
import PartnerInfoBlock from '@/components/partners/partner-info/partner-info-block/PartnerInfoBlock'
import PartnersBannersBlock from '@/components/partners/partners-banners/partners-banners-block/PartnersBannersBlock'

const PartnerPage = () => {
	const pathname = usePathname()
	const id = Number(pathname.split('/').at(-1))

	return (
		<div className={c.page}>
			<div className={c.page__row}>
				<PartnerBlock id={id} />
			</div>
			<div className={c.page__row}>
				<PartnerInfoBlock id={id} />
			</div>
			<div className={c.page__row}>
				<PartnersBannersBlock partnerId={id} />
			</div>
		</div>
	)
}

export default PartnerPage
