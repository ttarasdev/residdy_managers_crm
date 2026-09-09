'use client'

import { JwtCompanyVariantImage } from '@/components/features-components/img-containers/JwtCompanyVariantImage'
import c from './ItemBlockTop.module.scss'
import { ThemedIcon } from '@/components/features-components/theme-icon/ThemedIcon'
import { VariantSize } from '@/shared/types-enums/media'
import { JwtCompanyImage } from '@/components/features-components/img-containers/JwtCompanyImage'
import { PublicAsset } from '@/api/media/public-assets/public-assets.types'
import { IconContainer } from '@/components/library/icon-container/IconContainer'

interface Props {
	iconId?: number
	icon?: PublicAsset
	title: string
	subtitle?: string
	variantId?: number
	companyAssetId?: number
	setIsFormOpened?: () => void
	setIsSecondFormOpened?: () => void
	setIsIconFormOpened?: () => void
	secondButtonIcon?: string
	secondButtonTitle?: string
}

const ItemBlockTop: React.FC<Props> = ({
	iconId,
	icon,
	title,
	subtitle,
	variantId,
	setIsFormOpened,
	setIsSecondFormOpened,
	setIsIconFormOpened,
	secondButtonIcon,
	secondButtonTitle,
	companyAssetId,
}) => {
	return (
		<div className={c.top}>
			{variantId && (
				<div onClick={setIsIconFormOpened} className={c.top__variant}>
					<JwtCompanyVariantImage
						variantId={variantId}
						alt={variantId.toString()}
						size={VariantSize.MEDIUM}
						fill
						style={{ objectFit: 'cover' }}
					/>
				</div>
			)}
			{companyAssetId && (
				<div onClick={setIsIconFormOpened} className={c.top__variant}>
					<JwtCompanyImage
						assetId={companyAssetId}
						alt={companyAssetId.toString()}
						fill
						style={{ objectFit: 'cover' }}
					/>
				</div>
			)}
			{iconId && (
				<div
					onClick={setIsIconFormOpened}
					className={c.top__iconContainer}
				>
					<div className={c.top__icon}>
						<JwtCompanyImage
							assetId={iconId}
							alt={iconId.toString()}
							fill
							style={{ objectFit: 'cover' }}
						/>
					</div>
				</div>
			)}
			{icon && (
				<div
					onClick={setIsIconFormOpened}
					className={c.top__iconContainer}
				>
					<div className={c.top__icon}>
						<IconContainer item={icon} />
					</div>
				</div>
			)}
			<div className={c.top__info}>
				<p className={c.top__title}>{title}</p>
				{subtitle && <p className={c.top__subtitle}>{subtitle}</p>}
			</div>
			<div className={c.top__buttons}>
				{setIsFormOpened && (
					<button onClick={setIsFormOpened} className={c.top__button}>
						<ThemedIcon
							width={20}
							height={20}
							path="/block_icons/settings"
						/>
						<span>zmień</span>
					</button>
				)}
				{secondButtonTitle && setIsSecondFormOpened && (
					<button
						onClick={setIsSecondFormOpened}
						className={c.top__button}
					>
						<ThemedIcon
							width={20}
							height={20}
							path={
								secondButtonIcon
									? secondButtonIcon
									: '/block_icons/settings'
							}
						/>
						<span>{secondButtonTitle}</span>
					</button>
				)}
			</div>
		</div>
	)
}

export default ItemBlockTop
