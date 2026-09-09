'use client'

import { useState } from 'react'
import c from './SubBlockItem.module.scss'
import { ThemedIcon } from '@/components/features-components/theme-icon/ThemedIcon'
import { PublicAsset } from '@/api/media/public-assets/public-assets.types'
import { IconContainer } from '@/components/library/icon-container/IconContainer'

interface Props {
	icon?: PublicAsset
	title: string
	subtitle?: string
	itemId: number
	setChangeFormOpened?: (id: number) => void
	deleteItem?: (id: number) => void
	activeItemId?: number | null
	setActiveItemId?: (id: number | null) => void
	toggleUp?: (id: number) => void
	toggleDown?: (id: number) => void
}

const SubBlockItem: React.FC<Props> = ({
	itemId,
	icon,
	title,
	subtitle,
	setChangeFormOpened,
	deleteItem,
	activeItemId,
	setActiveItemId,
	toggleUp,
	toggleDown,
}) => {
	const [isPopupOpened, setIsPopupOpened] = useState(false)

	const toggleDelete = () => {
		if (deleteItem) deleteItem(itemId)
		setIsPopupOpened(false)
	}

	const toggleChange = () => {
		if (setChangeFormOpened) setChangeFormOpened(itemId)
		setIsPopupOpened(false)
	}

	const up = () => {
		if (toggleUp) toggleUp(itemId)
		setIsPopupOpened(false)
	}

	const down = () => {
		if (toggleDown) toggleDown(itemId)
		setIsPopupOpened(false)
	}

	return (
		<div
			onClick={() => {
				if (setActiveItemId) setActiveItemId(itemId)
			}}
			className={`${c.item} ${activeItemId === itemId ? c.active : ''}`}
		>
			{icon && (
				<div className={c.item__iconContainer}>
					<div className={c.item__icon}>
						<IconContainer item={icon} />
					</div>
				</div>
			)}
			<div className={c.item__info}>
				<p className={c.item__title}>{title}</p>
				{subtitle && <p className={c.item__subtitle}>{subtitle}</p>}
			</div>
			<button
				onClick={(e) => {
					e.stopPropagation()
					setIsPopupOpened(!isPopupOpened)
				}}
				className={c.item__settings}
			>
				<ThemedIcon path="/block_icons/dotts" />
			</button>
			{isPopupOpened && (
				<div
					onClick={(e) => e.stopPropagation()}
					className={c.item__popup}
				>
					{toggleDown && toggleUp && (
						<div className={c.item__move}>
							<button onClick={up} className={c.item__up}>
								<ThemedIcon path="/block_icons/arrow" />
							</button>
							<button onClick={down} className={c.item__down}>
								<ThemedIcon path="/block_icons/arrow" />
							</button>
						</div>
					)}
					<div className={c.item__buttons}>
						{setChangeFormOpened && (
							<button
								type="button"
								onClick={(e) => {
									e.stopPropagation()
									toggleChange()
								}}
							>
								zmień
							</button>
						)}
						{deleteItem && (
							<button
								type="button"
								onClick={(e) => {
									e.stopPropagation()
									toggleDelete()
								}}
							>
								wyrzuć
							</button>
						)}
					</div>
				</div>
			)}
		</div>
	)
}

export default SubBlockItem
