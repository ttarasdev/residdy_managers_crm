'use client'

import c from './PageBlockHeaderFilter.module.scss'
import { useState } from 'react'
import { ThemedIcon } from '@/components/features-components/theme-icon/ThemedIcon'

interface Props {
	setItem: (item: any) => void
	iconPath: string
	items: {
		title: string
		value: any
	}[]
}

const PageBlockHeaderFilter: React.FC<Props> = ({
	setItem,
	items,
	iconPath,
}) => {
	const [isOpened, setIsOpened] = useState(false)

	const chooseItem = (item: any) => {
		setItem(item)
		setIsOpened(false)
	}

	return (
		<div className={`${c.filter} ${isOpened ? c.open : ''}`}>
			<button
				onClick={() => setIsOpened(!isOpened)}
				className={c.filter__button}
			>
				<ThemedIcon path={iconPath} width={20} height={20} />
			</button>
			<div className={c.filter__items}>
				{items.map((i) => (
					<button
						key={i.title}
						onClick={() => chooseItem(i.value)}
						className={c.filter__item}
					>
						{i.title}
					</button>
				))}
			</div>
		</div>
	)
}

export default PageBlockHeaderFilter
