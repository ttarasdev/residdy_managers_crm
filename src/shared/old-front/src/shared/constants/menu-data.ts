import { ROLE_NAMES } from '@/api/manager-api/auth/auth.types'
import { PAGE_PATHS } from '@/shared/types-enums/paths'

export interface PageMenuInterface {
	id: number
	title: string
	icon: string
	path: PAGE_PATHS
	roles: ROLE_NAMES[]
}

export const MENU_DATA: PageMenuInterface[] = [
	{
		id: 1,
		title: 'blog',
		icon: '/menu_icons/blog',
		roles: [ROLE_NAMES.MANAGER],
		path: PAGE_PATHS.BLOG,
	},
	{
		id: 2,
		title: 'legalizacja',
		icon: '/menu_icons/cases',
		roles: [ROLE_NAMES.MANAGER],
		path: PAGE_PATHS.CASES,
	},
	{
		id: 3,
		title: 'poczta',
		icon: '/menu_icons/mail',
		roles: [ROLE_NAMES.SENDER],
		path: PAGE_PATHS.MAILS,
	},
	{
		id: 5,
		title: 'wiadomości',
		icon: '/menu_icons/notifications',
		roles: [ROLE_NAMES.SENDER],
		path: PAGE_PATHS.NOTIFICATIONS,
	},
	{
		id: 6,
		title: 'promokody',
		icon: '/menu_icons/promo',
		roles: [ROLE_NAMES.OWNER],
		path: PAGE_PATHS.PROMO,
	},
	{
		id: 7,
		title: 'generacja plików',
		icon: '/menu_icons/gdocs',
		roles: [ROLE_NAMES.OWNER],
		path: PAGE_PATHS.GDOCS,
	},
	{
		id: 8,
		title: 'przypomniałki',
		icon: '/menu_icons/reminders',
		roles: [ROLE_NAMES.OWNER],
		path: PAGE_PATHS.REMINDERS,
	},
	{
		id: 9,
		title: 'ikonki',
		icon: '/menu_icons/library',
		roles: [ROLE_NAMES.MANAGER],
		path: PAGE_PATHS.LIBRARY,
	},
	{
		id: 10,
		title: 'konsultacje',
		icon: '/menu_icons/consultations',
		roles: [ROLE_NAMES.MANAGER],
		path: PAGE_PATHS.CONSULTATIONS_PATH,
	},
]
