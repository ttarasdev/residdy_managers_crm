'use client'

import { useRoles } from '@/shared/hooks/useRoles'
import c from './Menu.module.scss'
import Image from 'next/image'
import { MENU_DATA } from '@/shared/constants/menu-data'
import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { ThemedIcon } from '../theme-icon/ThemedIcon'
import { useThemeStore } from '@/shared/theme/theme.store'
import { Theme } from '@/shared/types-enums/theme'
import { isSubset } from '@/shared/lib/isSubset'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { managerApi } from '@/api/manager-api/manager/manager.api'

const Menu = () => {
	const { roles } = useRoles()
	const pathname = usePathname()

	const [isMenuActive, setIsMenuActive] = useState(false)

	const setThemeLocal = useThemeStore((s) => s.setTheme)
	const queryClient = useQueryClient()

	const updateThemeMutation = useMutation({
		mutationFn: (theme: Theme) => managerApi.updateCurrent({ theme }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['manager-me'] })
		},
	})

	const handleThemeChange = (theme: Theme) => {
		setThemeLocal(theme)
		updateThemeMutation.mutate(theme)
	}

	return (
		<div className={`${c.menu} ${isMenuActive ? c.active : ''}`}>
			<div className={c.menu__categories}>
				<div className={c.menu__item}>
					<button
						onClick={() => setIsMenuActive(!isMenuActive)}
						className={`${c.menu__button} ${
							isMenuActive ? c.active : ''
						}`}
					>
						<ThemedIcon
							path="/menu_icons/menu"
							width={20}
							height={20}
						/>
					</button>
				</div>
				{MENU_DATA.map((i) =>
					isSubset(i.roles, roles) ? (
						<Link
							key={i.id}
							className={`${c.menu__item} ${
								isMenuActive ? c.active : ''
							}`}
							href={i.path}
						>
							<div
								className={`${c.menu__button} ${
									pathname === i.path ? c.current : ''
								}`}
							>
								<ThemedIcon
									path={i.icon}
									width={20}
									height={20}
								/>
							</div>
							<p
								className={`${c.menu__title} ${
									isMenuActive ? c.active : ''
								}`}
							>
								{i.title}
							</p>
						</Link>
					) : (
						<div key={i.id} className={c.menu__item}>
							<div className={c.menu__button}>
								<ThemedIcon path={i.icon} />
							</div>
							<p
								className={`${c.menu__title} ${
									isMenuActive ? c.active : ''
								}`}
							>
								{i.title}
							</p>
							<div className={c.menu__forbidden}>
								<ThemedIcon path="/menu_icons/forbidden" />
								<p>nie masz dostępu</p>
							</div>
						</div>
					),
				)}
			</div>

			<div className={c.menu__themes}>
				<button
					onClick={() => handleThemeChange(Theme.BLACK)}
					className={`${c.menu__item} ${
						isMenuActive ? c.active : ''
					}`}
					disabled={updateThemeMutation.isPending}
				>
					<div className={`${c.menu__button} ${c.moon}`}>
						<Image
							alt="moon"
							src="/menu_icons/moon.svg"
							width={20}
							height={20}
						/>
					</div>
					<p
						className={`${c.menu__title} ${
							isMenuActive ? c.active : ''
						}`}
					>
						tryb ciemny
					</p>
				</button>

				<button
					onClick={() => handleThemeChange(Theme.WHITE)}
					className={`${c.menu__item} ${
						isMenuActive ? c.active : ''
					} ${c.sun}`}
					disabled={updateThemeMutation.isPending}
				>
					<div className={`${c.menu__button} ${c.sun}`}>
						<ThemedIcon
							path="/menu_icons/sun"
							width={20}
							height={20}
						/>
					</div>
					<p
						className={`${c.menu__title} ${
							isMenuActive ? c.active : ''
						}`}
					>
						tryb jasny
					</p>
				</button>
			</div>
		</div>
	)
}

export default Menu
