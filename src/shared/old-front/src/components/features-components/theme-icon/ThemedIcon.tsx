'use client'

import Image from 'next/image'
import { useThemeStore } from '@/shared/theme/theme.store'
import { Theme } from '@/shared/types-enums/theme'

type Props = {
	path: string
	className?: string
	width?: number
	height?: number
}

export function ThemedIcon({
	path,
	className,
	width = 15,
	height = 15,
}: Props) {
	const theme = useThemeStore((s) => s.theme)

	const iconColor = theme === Theme.BLACK ? 'white' : 'black'

	return (
		<Image
			src={`${path}_${iconColor}.svg`}
			width={width}
			height={height}
			alt="icon"
			className={className}
			priority
		/>
	)
}
