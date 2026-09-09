'use client'

import c from './PageBlockNoData.module.scss'
import Image from 'next/image'

interface Props {
	title?: string
	subtitle?: string
}

const PageBlockNoData: React.FC<Props> = ({
	title = 'Ups',
	subtitle = 'coś poszło nie tak',
}) => {
	return (
		<div className={c.nodata}>
			<Image
				width={100}
				height={100}
				alt="no data"
				src={'/system_icons/no_data.svg'}
				priority
			/>
			<p className={c.nodata__title}>{title}</p>
			<p className={c.nodata__subtitle}>{subtitle}</p>
		</div>
	)
}

export default PageBlockNoData
