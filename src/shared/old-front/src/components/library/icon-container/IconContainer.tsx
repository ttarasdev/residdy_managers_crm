'use client'

import Image from 'next/image'
import { API_URL } from '@/shared/config/env'
import { PublicAsset } from '@/api/media/public-assets/public-assets.types'
import c from './IconContainer.module.scss'

interface Props {
	item?: PublicAsset | null
	br?: string
}

export const IconContainer: React.FC<Props> = ({ item, br }) => {
	if (!item?.url) {
		return (
			<div style={{ borderRadius: br ? br : '10px' }} className={c.img} />
		)
	}

	const src = item.url.startsWith('http') ? item.url : `${API_URL}${item.url}`

	return (
		<Image
			style={{ borderRadius: br ? br : '10px' }}
			className={c.img}
			alt={item.originalName || 'icon'}
			src={src}
			fill
			sizes="120px"
			priority
		/>
	)
}
