'use client'

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import c from './ProfileInfoBlock.module.scss'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import PageBlockLoadingData from '@/components/page-block-components/page-block-loading-data/PageBlockLoadingData'
import PageBlockNoData from '@/components/page-block-components/page-block-no-data/PageBlockNoData'
import { useRouter } from 'next/navigation'
import { logout } from '@/shared/lib/logout'
import { managerApi } from '@/api/manager-api/manager/manager.api'

const ProfileInfoBlock = () => {
	const router = useRouter()

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

	const handleLogout = () => {
		logout(router)
	}

	return (
		<div className={c.block}>
			<div className={c.block__header}></div>
			<button onClick={handleLogout} className={c.block__logout}>
				Wyloguj
			</button>
		</div>
	)
}

export default ProfileInfoBlock
