'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import c from './Header.module.scss'
import { HEADER_DATA, HEADER_PAGES_DATA } from '@/shared/constants/header-data'
import { useRoles } from '@/shared/hooks/useRoles'
import { isSubset } from '@/shared/lib/isSubset'
import { ThemedIcon } from '../theme-icon/ThemedIcon'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/shared/types-enums/queryKeys'
import PageBlockLoadingData from '@/components/page-block-components/page-block-loading-data/PageBlockLoadingData'
import PageBlockNoData from '@/components/page-block-components/page-block-no-data/PageBlockNoData'
import { managerApi } from '@/api/manager-api/manager/manager.api'
import { JwtCompanyVariantImage } from '../img-containers/JwtCompanyVariantImage'
import { VariantSize } from '@/shared/types-enums/media'

const Header = () => {
	const pathname = usePathname()
	const { roles } = useRoles()

	const section = HEADER_DATA.find((s) => pathname.startsWith(s.path))
	const items = section?.items ?? []

	const { data, isLoading, error } = useQuery({
		queryKey: [QUERY_KEYS.MANAGER_ME],
		queryFn: managerApi.getCurrent,
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
		<header className={c.header}>
			<Link href={'/main'} className={c.header__logo}>
				<ThemedIcon
					path="/header_icons/residdycrm"
					width={140}
					height={30}
				/>
			</Link>
			<div className={c.header__tabs}>
				{items.map((i) => {
					const allowed = isSubset(i.roles, roles)
					const current = pathname === i.path

					if (allowed) {
						return (
							<Link
								key={i.id}
								href={i.path}
								className={`${c.header__tab} ${
									current ? c.current : ''
								}`}
							>
								<p className={c.header__title}>{i.title}</p>
							</Link>
						)
					}
					return (
						<div
							key={i.id}
							className={`${c.header__tab} ${c.disabled}`}
						>
							<p className={c.header__title}>{i.title}</p>
							<div className={c.header__forbidden}>
								<ThemedIcon
									path="/menu_icons/forbidden"
									width={18}
									height={18}
								/>
								<p>nie masz dostępu</p>
							</div>
						</div>
					)
				})}
			</div>
			<div className={c.header__buttons}>
				{HEADER_PAGES_DATA.map((i) => (
					<Link key={i.id} className={c.header__button} href={i.path}>
						<ThemedIcon path={i.icon} width={25} height={25} />
					</Link>
				))}
				<Link
					className={`${c.header__button} ${c.profile}`}
					href={'/main/profile'}
				>
					{data.avatarId ? (
						<JwtCompanyVariantImage
							variantId={data.avatarId}
							size={VariantSize.SMALL}
							alt={'a'}
							fill
						/>
					) : (
						<ThemedIcon
							path="/header_icons/profile"
							width={25}
							height={25}
						/>
					)}
				</Link>
			</div>
		</header>
	)
}

export default Header
