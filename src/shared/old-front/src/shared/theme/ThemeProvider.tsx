'use client'

import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useThemeStore } from '@/shared/theme/theme.store'
import { Theme } from '@/shared/types-enums/theme'
import { managerApi } from '@/api/manager-api/manager/manager.api'

export function ThemeProvider() {
	const theme = useThemeStore((s) => s.theme)
	const setTheme = useThemeStore((s) => s.setTheme)

	const { data: me } = useQuery({
		queryKey: ['manager-me'],
		queryFn: ({ signal }) => managerApi.getCurrent({ signal }),
	})

	useEffect(() => {
		document.documentElement.dataset.theme = theme
	}, [theme])

	useEffect(() => {
		if (!me?.theme) return
		const serverTheme = me.theme as Theme
		if (serverTheme !== theme) setTheme(serverTheme)
	}, [me?.theme])

	return null
}
