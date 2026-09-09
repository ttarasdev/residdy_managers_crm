'use client'

import PageTitle from '@/components/page-components/page-title/PageTitle'
import c from './ProfilePage.module.scss'
import ProfileCard from '@/components/profile/profile-card/ProfileCard'
import ProfileInfoBlock from '@/components/profile/profile-info-block/ProfileInfoBlock'

const ProfilePage = () => {
	return (
		<div className={c.page}>
			<PageTitle title="Profil" />
			<div className={c.page__row}>
				<ProfileCard />
				<ProfileInfoBlock />
			</div>
		</div>
	)
}

export default ProfilePage
