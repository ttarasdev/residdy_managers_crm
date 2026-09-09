'use client'

import { usePathname } from 'next/navigation'
import c from './GdocsItemPage.module.scss'
import GdocBlock from '@/components/gdocs/gdocs/gdoc-block/GdocBlock'

const GdocsItemPage = () => {
	const pathname = usePathname()
	const id = Number(pathname.split('/').at(-1))
	return (
		<div className={c.page}>
			<GdocBlock id={id} />
		</div>
	)
}

export default GdocsItemPage
