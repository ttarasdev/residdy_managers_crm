import { ROLE_NAMES } from '@/api/manager-api/auth/auth.types'
import { PAGE_PATHS } from '../types-enums/paths'
import { PageMenuInterface } from './menu-data'

export interface HeaderTab {
	id: number
	title: string
	roles: ROLE_NAMES[]
	path: PAGE_PATHS
}

export interface HeaderSection {
	id: number
	path: PAGE_PATHS
	items: HeaderTab[]
}

export const HEADER_DATA: HeaderSection[] = [
	{
		id: 1,
		path: PAGE_PATHS.BLOG,
		items: [
			{
				id: 1,
				title: 'kategorie',
				roles: [ROLE_NAMES.MANAGER],
				path: PAGE_PATHS.BLOG_CATEGORIES,
			},
			{
				id: 2,
				title: 'posty',
				roles: [ROLE_NAMES.MANAGER],
				path: PAGE_PATHS.BLOG_POSTS,
			},
		],
	},
	{
		id: 2,
		path: PAGE_PATHS.CASES,
		items: [
			{
				id: 1,
				title: 'Typy',
				roles: [ROLE_NAMES.MANAGER],
				path: PAGE_PATHS.CASES_TYPES_PATH,
			},
			{
				id: 2,
				title: 'Sprawy',
				roles: [ROLE_NAMES.MANAGER],
				path: PAGE_PATHS.CASES_ITEMS_PATH,
			},
			{
				id: 3,
				title: 'Instrukcje do zadań',
				roles: [ROLE_NAMES.MANAGER],
				path: PAGE_PATHS.CASE_INSTRUCTIONS_PATH,
			},
			{
				id: 4,
				title: 'Przypomniałki',
				roles: [ROLE_NAMES.MANAGER],
				path: PAGE_PATHS.CASE_REMINDERS_PATH,
			},
		],
	},
	{
		id: 3,
		path: PAGE_PATHS.EMPLOYEES_PATH,
		items: [
			{
				id: 1,
				title: 'Pracownicy',
				roles: [ROLE_NAMES.OWNER],
				path: PAGE_PATHS.EMPLOYEES_PATH,
			},
		],
	},
	{
		id: 4,
		path: PAGE_PATHS.GDOCS,
		items: [
			{
				id: 1,
				title: 'Typy',
				roles: [ROLE_NAMES.MANAGER],
				path: PAGE_PATHS.GDOCS_TYPES,
			},
			{
				id: 2,
				title: 'Dokumenty',
				roles: [ROLE_NAMES.MANAGER],
				path: PAGE_PATHS.GDOCS_ITEMS,
			},
			{
				id: 3,
				title: 'Zmienne',
				roles: [ROLE_NAMES.MANAGER],
				path: PAGE_PATHS.GDOCS_VARS,
			},
		],
	},
	{
		id: 5,
		path: PAGE_PATHS.CONSULTATIONS_PATH,
		items: [
			{
				id: 1,
				title: 'Typy',
				roles: [ROLE_NAMES.MANAGER],
				path: PAGE_PATHS.CONSULTATION_CATS_PATH,
			},
		],
	},
]

export const HEADER_PAGES_DATA: PageMenuInterface[] = [
	{
		id: 1,
		title: 'specialisty',
		icon: '/header_icons/specialists',
		roles: [ROLE_NAMES.OWNER],
		path: PAGE_PATHS.SPECIALISTS,
	},
	{
		id: 2,
		title: 'pracownicy',
		icon: '/header_icons/employees',
		roles: [ROLE_NAMES.OWNER],
		path: PAGE_PATHS.EMPLOYEES_PATH,
	},
	{
		id: 3,
		title: 'użytkownicy',
		icon: '/header_icons/users',
		roles: [ROLE_NAMES.OWNER],
		path: PAGE_PATHS.USERS,
	},
	{
		id: 4,
		title: 'partnery',
		icon: '/header_icons/partners',
		roles: [ROLE_NAMES.OWNER],
		path: PAGE_PATHS.PARTNERS,
	},
]
