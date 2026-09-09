import { InstructionBlockType } from '@/api/cases-api/case-instruction-blocks/case-instruction-blocks.types'
import { Languages } from '../types-enums/lans'
import { CaseInstructionStatus } from '@/api/cases-api/case-instructions/case-instructions.types'
import { StageTaskTypes } from '@/api/cases-api/case-stage-tasks/case-stage-tasks.types'
import { CaseStatus } from '@/api/cases-api/cases/cases.type'
import { CaseTypeStatus } from '@/api/cases-api/cases-types/case-types.types'
import { BlogPostStatus } from '@/api/blog-api/blog-posts/blog-posts.types'
import { MailJobStatus } from '@/api/mails-api/mail-jobs/mail-jobs.types'
import { UserStatus } from '@/api/users/users/users.types'
import { MailAccount } from '@/api/mails-api/mail-accounts/mail-accounts.types'
import {
	ProductType,
	PromocodeStatus,
	PromocodeType,
} from '@/api/promo-api/promocodes/promocodes.types'
import { GdocTypeStatus } from '@/api/gdocs-api/gdocs-types/gdocs-types.types'
import { PartnerBannerType } from '@/api/partners-api/partner-banners/partners-banners.types'

export enum UserLevel {
	ONE = 1,
	TWO = 2,
	THREE = 3,
	FOUR = 4,
	FIVE = 5,
}

export const lansSelectData = [
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

export const instructionBlockTypeSelectData = [
	{
		title: 'Tekst',
		value: InstructionBlockType.TEXT,
	},
	{
		title: 'Zdjęcie',
		value: InstructionBlockType.PHOTO,
	},
]

export const caseStatusSelectData = [
	{
		title: 'aktywny',
		value: CaseStatus.ACTIVE,
	},
	{
		title: 'archiwowany',
		value: CaseStatus.ARCHIVED,
	},
	{
		title: 'draft',
		value: CaseStatus.DRAFT,
	},
]

export const caseTypeStatusSelectData = [
	{
		title: 'aktywny',
		value: CaseTypeStatus.ACTIVE,
	},
	{
		title: 'archiwowany',
		value: CaseTypeStatus.ARCHIVED,
	},
	{
		title: 'draft',
		value: CaseTypeStatus.DRAFT,
	},
]

export const instructionStatusSelectData = [
	{
		title: 'aktywny',
		value: CaseInstructionStatus.ACTIVE,
	},
	{
		title: 'archiwowany',
		value: CaseInstructionStatus.ARCHIVED,
	},
	{
		title: 'draft',
		value: CaseInstructionStatus.DRAFT,
	},
]

export const isPopularSelectData = [
	{
		title: 'popularny',
		value: true,
	},
	{
		title: 'nie popularny',
		value: false,
	},
]

export const isPinnedSelectData = [
	{
		title: 'przypięty',
		value: true,
	},
	{
		title: 'nie przypięty',
		value: false,
	},
]

export const taskTypesSelectData = [
	{
		title: 'informacja z instrukcją',
		value: StageTaskTypes.INFO,
	},
	{
		title: 'informacja',
		value: StageTaskTypes.TEXT,
	},
	{
		title: 'wybrać datę',
		value: StageTaskTypes.WITH_DATE,
	},
]

export const blogPostStatusSelectData = [
	{
		title: 'archiwowany',
		value: BlogPostStatus.ARCHIVED,
	},
	{
		title: 'draft',
		value: BlogPostStatus.DRAFT,
	},
	{
		title: 'opublikowany',
		value: BlogPostStatus.PUBLISHED,
	},
	{
		title: 'zapłanowany',
		value: BlogPostStatus.SCHEDULED,
	},
]

export const mailJobsStatusSelectData = [
	{
		title: 'skasowany',
		value: MailJobStatus.CANCELLED,
	},
	{
		title: 'wykonany',
		value: MailJobStatus.DONE,
	},
	{
		title: 'draft',
		value: MailJobStatus.DRAFT,
	},
	{
		title: 'w procesie',
		value: MailJobStatus.RUNNING,
	},
	{
		title: 'zapłanowany',
		value: MailJobStatus.SCHEDULED,
	},
]

export const mailAccountsSelectData = [
	{
		title: 'residdy app',
		value: MailAccount.RESIDDY_APP,
	},
	{
		title: 'kontakt',
		value: MailAccount.RESIDDY_CONTACT,
	},
]

export const userStatusSelectData = [
	{
		title: 'aktywne',
		value: UserStatus.ACTIVE,
	},
	{
		title: 'blokowane',
		value: UserStatus.BLOCKED,
	},
	{
		title: 'nie podtwierdzone',
		value: UserStatus.PENDING,
	},
]

export const userLevelSelectData = [
	{
		title: '1',
		value: UserLevel.ONE,
	},
	{
		title: '2',
		value: UserLevel.TWO,
	},
	{
		title: '3',
		value: UserLevel.THREE,
	},
	{
		title: '4',
		value: UserLevel.FOUR,
	},
	{
		title: '5',
		value: UserLevel.FIVE,
	},
]

export const promocodeTypeSelectData = [
	{
		title: '%',
		value: PromocodeType.PERCENT,
	},
	{
		title: 'PLN',
		value: PromocodeType.AMOUNT,
	},
]

export const productTypeSelectData = [
	{
		title: 'konsultacja',
		value: ProductType.CONSULTATION,
	},
	{
		title: 'subskrypcja',
		value: ProductType.SUBSCRIPTION,
	},
	{
		title: 'kurs',
		value: ProductType.COURSE,
	},
	{
		title: 'reklama',
		value: ProductType.ADVERTISING,
	},
]

export const promocodeStatusSelectData = [
	{
		title: 'aktywny',
		value: PromocodeStatus.ACTIVE,
	},
	{
		title: 'nie aktywny',
		value: PromocodeStatus.INACTIVE,
	},
]

export const gdocTypeStatusSelectData = [
	{
		title: 'aktywny',
		value: GdocTypeStatus.ACTIVE,
	},
	{
		title: 'nie aktywny',
		value: GdocTypeStatus.INACTIVE,
	},
]

export const isActiveSelectData = [
	{
		title: 'aktywny',
		value: true,
	},
	{
		title: 'nie aktywny',
		value: false,
	},
]

export const bannerSelectData = [
	{
		title: 'duży',
		value: PartnerBannerType.BIG,
	},
	{
		title: 'mały',
		value: PartnerBannerType.SMALL,
	},
]
