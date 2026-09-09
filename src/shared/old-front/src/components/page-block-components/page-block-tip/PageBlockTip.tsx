'use client'

import { Tip } from '@/shared/types-enums/tip'
import c from './PageBlockTip.module.scss'
import Link from 'next/link'
import { ThemedIcon } from '@/components/features-components/theme-icon/ThemedIcon'
import { useThemeStore } from '@/shared/theme/theme.store'
import { Theme } from '@/shared/types-enums/theme'

interface Props {
	tip: Tip
}

const bgClasses = [
	c.bg1,
	c.bg2,
	c.bg3,
	c.bg4,
	c.bg5,
	c.bg6,
	c.bg7,
	c.bg8,
	c.bg9,
	c.bg10,
]

const PageBlockTip: React.FC<Props> = ({ tip }) => {
	const index = (Number(tip.tipNo) - 1) % bgClasses.length
	const bgClass = bgClasses[index]

	const theme = useThemeStore((s) => s.theme)

	const isBlack = theme === Theme.BLACK

	return (
		<div className={`${c.tip} ${isBlack ? bgClass : ''}`}>
			<p className={c.tip__title}>{tip.title}</p>
			<p className={c.tip__text}>{tip.text}</p>

			<div className={c.tip__footer}>
				<p className={c.tip__no}>{tip.tipNo}</p>
				<Link href={tip.path} className={c.tip__arrow}>
					<ThemedIcon
						width={20}
						height={20}
						path="/block_icons/arrow_dia"
					/>
				</Link>
			</div>
		</div>
	)
}

export default PageBlockTip
