import { PAGE_PATHS } from '../types-enums/paths'
import { Tip } from '../types-enums/tip'

export const casesBlockTipList: Tip[] = [
	{
		id: 1,
		title: 'Usuwanie',
		text: 'Usuwać może tylko administrator.',
		path: PAGE_PATHS.FAQ,
		tipNo: '01',
	},
	{
		id: 2,
		title: 'Aktywacja',
		text: 'Po aktywacji sprawy nie można jej już edytować.',
		path: PAGE_PATHS.FAQ,
		tipNo: '02',
	},
	{
		id: 3,
		title: 'Nowa wersja',
		text: 'Gdy chcesz wprowadzić zmiany, tworzona jest kopia w wersji roboczej (draft)',
		path: PAGE_PATHS.FAQ,
		tipNo: '03',
	},
]

export const casesIconsTipList: Tip[] = [
	{
		id: 1,
		title: 'Usuwanie',
		text: 'Usuwać może tylko admin.',
		path: PAGE_PATHS.FAQ,
		tipNo: '04',
	},
	{
		id: 2,
		title: 'Dodanie',
		text: 'Dodawać ikony może tylko admin',
		path: PAGE_PATHS.FAQ,
		tipNo: '05',
	},
	{
		id: 3,
		title: 'Usuwanie',
		text: 'Usuwać może tylko admin.',
		path: PAGE_PATHS.FAQ,
		tipNo: '06',
	},
	{
		id: 4,
		title: 'Dodanie',
		text: 'Dodawać ikony może tylko admin',
		path: PAGE_PATHS.FAQ,
		tipNo: '07',
	},
	{
		id: 5,
		title: 'Usuwanie',
		text: 'Usuwać może tylko admin.',
		path: PAGE_PATHS.FAQ,
		tipNo: '08',
	},
	{
		id: 6,
		title: 'Dodanie',
		text: 'Dodawać ikony może tylko admin',
		path: PAGE_PATHS.FAQ,
		tipNo: '09',
	},
]
