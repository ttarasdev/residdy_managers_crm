'use client'

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import c from './ProfileCard.module.scss'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import PageBlockLoadingData from '@/components/page-block-components/page-block-loading-data/PageBlockLoadingData'
import PageBlockNoData from '@/components/page-block-components/page-block-no-data/PageBlockNoData'
import { ThemedIcon } from '@/components/features-components/theme-icon/ThemedIcon'
import Image from 'next/image'
import { formatDate } from '@/shared/lib/date'
import { useState } from 'react'
import ProfileCHnageAvatarForm from '../profile-change-avatar-form/ProfileChangeAvatarForm'
import ProfileChangeForm from '../profile-change-form/ProfileChangeForm'
import { managerApi } from '@/api/manager-api/manager/manager.api'
import { JwtCompanyVariantImage } from '@/components/features-components/img-containers/JwtCompanyVariantImage'
import { VariantSize } from '@/shared/types-enums/media'

const ProfileCard = () => {
	const [isChangeAvatarFormOpened, setIsChangeAvatarFormOpened] =
		useState(false)
	const [isChangeFormOpened, setIsChangeFormOpened] = useState(false)

	const { data, isLoading, error } = useQuery({
		queryKey: [QUERY_KEYS.MANAGER_ME],
		queryFn: managerApi.getCurrent,
		placeholderData: keepPreviousData,
	})

	if (isLoading)
		return (
			<div className={c.block}>
				<PageBlockLoadingData />
			</div>
		)
	if (error || !data)
		return (
			<div className={c.block}>
				<PageBlockNoData />
			</div>
		)

	return (
		<div className={c.block}>
			<div className={c.block__top}>
				<div className={c.block__imageContainer}>
					<div className={c.block__image}>
						{data.avatarId ? (
							<JwtCompanyVariantImage
								variantId={data.avatarId}
								alt={data.id.toString()}
								fill
								style={{ objectFit: 'cover' }}
								size={VariantSize.MEDIUM}
							/>
						) : (
							<ThemedIcon
								path="/header_icons/profile"
								width={40}
								height={40}
							/>
						)}
					</div>
					<button
						onClick={() => setIsChangeAvatarFormOpened(true)}
						className={c.block__changePhoto}
					>
						<Image
							src={'/menu_icons/media_white.svg'}
							width={15}
							alt="+"
							height={15}
						/>
					</button>
				</div>
				<p className={c.block__title}>
					{data.name} {data.surname}
				</p>
				<p className={c.block__subtitle}>{data.position}</p>
			</div>
			<div className={c.block__items}>
				<p className={c.block__item}>
					<ThemedIcon path="/profile/mail" width={20} height={20} />
					<span>{data.email}</span>
				</p>
				<p className={c.block__item}>
					<ThemedIcon path="/profile/phone" width={20} height={20} />
					<span>{data.phone}</span>
				</p>
				<p className={c.block__item}>
					<ThemedIcon
						path="/profile/location"
						width={20}
						height={20}
					/>
					<span>{data.location}</span>
				</p>
				<p className={c.block__item}>
					<ThemedIcon
						path="/profile/calendar"
						width={20}
						height={20}
					/>
					<span>{formatDate(data.createdAt)}</span>
				</p>
			</div>
			<button
				onClick={() => setIsChangeFormOpened(true)}
				className={c.block__change}
			>
				Zmień Profil
			</button>
			{isChangeAvatarFormOpened && (
				<ProfileCHnageAvatarForm
					onClose={() => setIsChangeAvatarFormOpened(false)}
				/>
			)}
			{isChangeFormOpened && (
				<ProfileChangeForm
					data={data}
					onClose={() => setIsChangeFormOpened(false)}
				/>
			)}
		</div>
	)
}

export default ProfileCard
