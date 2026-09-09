'use client'

import c from './PageBlockCard.module.scss'
import { useState } from 'react'
import { ThemedIcon } from '@/components/features-components/theme-icon/ThemedIcon'
import Image from 'next/image'
import { PAGE_PATHS } from '@/shared/types-enums/paths'
import { VariantSize } from '@/shared/types-enums/media'
import { JwtCompanyVariantImage } from '@/components/features-components/img-containers/JwtCompanyVariantImage'
import { JwtCompanyImage } from '@/components/features-components/img-containers/JwtCompanyImage'

interface Props {
	id: number
	variantId?: number | null
	iconId?: number
	title?: string
	subtitle?: string
	infoBlock?: string
	info?: string
	leftStatus?: string
	leftStatusIcon?: string
	rightStatus?: string
	rightStatusIcon?: string

	toggleFirstButton?: (id: number) => void
	toggleSecondButton?: (id: number) => void
	toggleThirdButton?: (id: number) => void

	firstButtonTitle?: string
	secondButtonTitle?: string
	thirdButtonTitle?: string

	openItemPage?: (id: number) => void
	itemPagePath?: PAGE_PATHS
}

const PageBlockCard: React.FC<Props> = ({
	id,
	variantId,
	iconId,
	title,
	subtitle,
	info,
	infoBlock,
	leftStatus,
	leftStatusIcon,
	rightStatus,
	rightStatusIcon,
	firstButtonTitle,
	toggleFirstButton,
	secondButtonTitle,
	toggleSecondButton,
	thirdButtonTitle,
	toggleThirdButton,
	openItemPage,
}) => {
	const [isPopupOpened, setIsPopupOpened] = useState(false)

	const toggleFirst = (id: number) => {
		if (toggleFirstButton) toggleFirstButton(id)
		setIsPopupOpened(false)
	}

	const toggleSecond = (id: number) => {
		if (toggleSecondButton) toggleSecondButton(id)
		setIsPopupOpened(false)
	}

	const toggleThird = (id: number) => {
		if (toggleThirdButton) toggleThirdButton(id)
		setIsPopupOpened(false)
	}

	return (
		<div
			className={c.card}
			onClick={openItemPage ? () => openItemPage(id) : () => {}}
		>
			<div className={c.card__top}>
				{iconId && (
					<div className={c.card__icon}>
						<JwtCompanyImage
							assetId={iconId}
							alt={iconId.toString()}
							fill
							style={{ objectFit: 'cover' }}
						/>
					</div>
				)}
				{variantId && (
					<div className={c.card__variant}>
						<JwtCompanyVariantImage
							variantId={variantId}
							alt={variantId.toString()}
							size={VariantSize.MEDIUM}
							fill
							style={{ objectFit: 'cover' }}
						/>
					</div>
				)}
				<div className={c.card__mainInfo}>
					{title && <p className={c.card__title}>{title}</p>}
					{title && <p className={c.card__subtitle}>{subtitle}</p>}
					{title && <p className={c.card__infoBlock}>{infoBlock}</p>}
					<button
						onClick={(e) => {
							e.stopPropagation()
							setIsPopupOpened(!isPopupOpened)
						}}
						className={c.card__settings}
					>
						<ThemedIcon path="/block_icons/dotts" />
					</button>
				</div>
			</div>
			<div className={c.card__info}>{info}</div>
			<div className={c.card__statuses}>
				{leftStatus && leftStatusIcon && (
					<p className={c.card__leftStatus}>
						<Image
							src={leftStatusIcon}
							alt="s"
							width={15}
							height={15}
						/>

						<span>{leftStatus}</span>
					</p>
				)}
				{rightStatus && rightStatusIcon && (
					<p className={c.card__rightStatus}>
						<Image
							src={rightStatusIcon}
							alt="s"
							width={15}
							height={15}
						/>

						<span>{rightStatus}</span>
					</p>
				)}
			</div>
			{isPopupOpened && (
				<div className={c.card__popup}>
					{firstButtonTitle && toggleFirstButton && (
						<button
							onClick={() => toggleFirst(id)}
							className={c.card__button}
						>
							{firstButtonTitle}
						</button>
					)}
					{secondButtonTitle && toggleSecondButton && (
						<button
							onClick={() => toggleSecond(id)}
							className={c.card__button}
						>
							{secondButtonTitle}
						</button>
					)}
					{thirdButtonTitle && toggleThirdButton && (
						<button
							onClick={() => toggleThird(id)}
							className={c.card__button}
						>
							{thirdButtonTitle}
						</button>
					)}
				</div>
			)}
		</div>
	)
}

export default PageBlockCard
