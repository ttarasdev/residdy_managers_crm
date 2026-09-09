import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Theme } from '../types-enums/theme'

type ThemeState = {
	theme: Theme
	setTheme: (theme: Theme) => void
	toggleTheme: () => void
}

export const useThemeStore = create<ThemeState>()(
	persist(
		(set, get) => ({
			theme: Theme.WHITE,
			setTheme: (theme) => set({ theme }),
			toggleTheme: () =>
				set({
					theme:
						get().theme === Theme.WHITE ? Theme.BLACK : Theme.WHITE,
				}),
		}),
		{
			name: 'theme',
		},
	),
)
