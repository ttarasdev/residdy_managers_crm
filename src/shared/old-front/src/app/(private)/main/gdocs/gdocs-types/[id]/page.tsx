'use client'

import { usePathname } from 'next/navigation'
import c from './GdocsTypePage.module.scss'
import GdocTypeBlock from '@/components/gdocs/gdoc-types/gdoc-type-block/GdocTypeBlock'

const GdocsTypePage = () => {
	const pathname = usePathname()
	const id = Number(pathname.split('/').at(-1))
	return (
		<div className={c.page}>
			<GdocTypeBlock id={id} />
		</div>
	)
}

export default GdocsTypePage
