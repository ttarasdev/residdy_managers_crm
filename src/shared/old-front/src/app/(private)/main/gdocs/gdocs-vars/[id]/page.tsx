'use client'

import { usePathname } from 'next/navigation'
import c from './GdocsVarPage.module.scss'
import GdocsVarBlock from '@/components/gdocs/gdoc-vars/gdoc-var-block/GdocsVarBlock'

const GdocsVarPage = () => {
	const pathname = usePathname()
	const id = Number(pathname.split('/').at(-1))
	return (
		<div className={c.page}>
			<GdocsVarBlock id={id} />
		</div>
	)
}

export default GdocsVarPage
