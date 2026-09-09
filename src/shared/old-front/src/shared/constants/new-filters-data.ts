import { CaseTypeStatus } from '@/api/cases-api/cases-types/case-types.types'
import { Languages } from '../types-enums/lans'
import { BlogPostStatus } from '@/api/blog-api/blog-posts/blog-posts.types'
import { GdocTypeStatus } from '@/api/gdocs-api/gdocs-types/gdocs-types.types'
import { GdocTemplateStatus } from '@/api/gdocs-api/gdocs/gdocs.types'

export const BlogPostsStatusFilterData = [
	{
		title: 'wszystkie',
		value: null,
	},
	{
		title: 'drafty',
		value: BlogPostStatus.DRAFT,
	},
	{
		title: 'zaplanowane',
		value: BlogPostStatus.SCHEDULED,
	},
	{
		title: 'opublikowane',
		value: BlogPostStatus.PUBLISHED,
	},
	{
		title: 'archiwowane',
		value: BlogPostStatus.ARCHIVED,
	},
]

export const lansFilterData = [
	{
		title: 'wszystkie',
		value: null,
	},
	{
		title: 'PL',
		value: Languages.PL,
	},
	{
		title: 'UA',
		value: Languages.UA,
	},
	{
		title: 'EN',
		value: Languages.EN,
	},
	{
		title: 'RU',
		value: Languages.RU,
	},
]

export const isPopularFilterData = [
	{
		title: 'wszystkie',
		value: null,
	},
	{
		title: 'popularne',
		value: true,
	},
	{
		title: 'niepopularne',
		value: false,
	},
]

export const caseTypeStatusFilterData = [
	{
		title: 'wszystkie',
		value: null,
	},
	{
		title: 'aktywne',
		value: CaseTypeStatus.ACTIVE,
	},
	{
		title: 'archiwowane',
		value: CaseTypeStatus.ARCHIVED,
	},
	{
		title: 'drafty',
		value: CaseTypeStatus.DRAFT,
	},
]

export const caseStatusFilterData = [
	{
		title: 'wszystkie',
		value: null,
	},
	{
		title: 'aktywne',
		value: CaseTypeStatus.ACTIVE,
	},
	{
		title: 'archiwowane',
		value: CaseTypeStatus.ARCHIVED,
	},
	{
		title: 'drafty',
		value: CaseTypeStatus.DRAFT,
	},
]

export const gdocsTypeStatusFilterData = [
	{
		title: 'aktywny',
		value: GdocTypeStatus.ACTIVE,
	},
	{
		title: 'nieaktywny',
		value: GdocTypeStatus.INACTIVE,
	},
]

export const gdocStatusFilterData = [
	{
		title: 'aktywny',
		value: GdocTemplateStatus.ACTIVE,
	},
	{
		title: 'nieaktywny',
		value: GdocTemplateStatus.INACTIVE,
	},
]
