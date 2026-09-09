import { Case, CaseStatus } from '@/api/cases-api/cases/cases.type'
import { TableRow } from '../types-enums/table'
import {
	CaseType,
	CaseTypeStatus,
} from '@/api/cases-api/cases-types/case-types.types'
import {
	CaseInstruction,
	CaseInstructionStatus,
} from '@/api/cases-api/case-instructions/case-instructions.types'
import {
	BlogPost,
	BlogPostStatus,
} from '@/api/blog-api/blog-posts/blog-posts.types'
import { BlogCategory } from '@/api/blog-api/blog-categories/blogCategories.types'
import {
	MailJob,
	MailJobStatus,
} from '@/api/mails-api/mail-jobs/mail-jobs.types'
import { CaseReminder } from '@/api/cases-api/case-reminders/case-reminders.types'
import {
	Promocode,
	PromocodeStatus,
} from '@/api/promo-api/promocodes/promocodes.types'
import {
	GdocType,
	GdocTypeStatus,
} from '@/api/gdocs-api/gdocs-types/gdocs-types.types'
import { CompanyAsset } from '@/api/media/company-assets/company-assets.types'
import { Partner } from '@/api/partners-api/partners/partners.types'
import { PartnerBanner } from '@/api/partners-api/partner-banners/partners-banners.types'
import { Gdoc, GdocTemplateStatus } from '@/api/gdocs-api/gdocs/gdocs.types'
import { GdocVar } from '@/api/gdocs-api/gdocs-vars/gdocs-vars.types'
import { ConsultationCategory } from '@/api/consultations-api/consultation-categories/consultation-categories.types'

export const mapCasesToTableRows = (arr: Case[] = []): TableRow<CaseStatus>[] =>
	arr.map((x) => ({
		id: x.id,
		title: x.title,
		status: x.status,
		icon: x.icon,
		isPopular: x.isPopular,
		lan: x.lan,
		version: x.version,
		subtitle: x.subtitle,
		typeId: x.typeId,
	}))

export const mapCaseTypesToTableRows = (
	arr: CaseType[] = [],
): TableRow<CaseTypeStatus>[] =>
	arr.map((x) => ({
		id: x.id,
		title: x.title,
		status: x.status,
		icon: x.icon,
		isPopular: x.isPopular,
		lan: x.lan,
		description: x.description,
		createdAt: x.createdAt,
		updatedAt: x.updatedAt,
	}))

export const mapCaseInstructionsToTableRows = (
	arr: CaseInstruction[] = [],
): TableRow<CaseInstructionStatus>[] =>
	arr.map((x) => ({
		id: x.id,
		title: x.title,
		status: x.status,
		isPopular: x.isPopular,
		lan: x.lan,
		description: x.description,
		createdAt: x.createdAt,
		updatedAt: x.updatedAt,
	}))

export const mapBlogPostsToTableRows = (
	arr: BlogPost[] = [],
): TableRow<BlogPostStatus>[] =>
	arr.map((x) => ({
		id: x.id,
		title: x.title,
		status: x.status,
		isPopular: x.isPopular,
		lan: x.lan,
		createdAt: x.createdAt,
		updatedAt: x.updatedAt,
	}))

export const mapBlogCategoriesToTableRows = (
	arr: BlogCategory[] = [],
): TableRow[] =>
	arr.map((x) => ({
		id: x.id,
		title: x.name_pl,
		createdAt: x.createdAt,
		updatedAt: x.updatedAt,
	}))

export const mapMailJobsToTableRows = (
	arr: MailJob[] = [],
): TableRow<MailJobStatus>[] =>
	arr.map((x) => ({
		id: x.id,
		title: x.title,
		status: x.status,
		createdAt: x.createdAt,
		updatedAt: x.updatedAt,
	}))

export const mapMediaAssetsToTableRows = (
	arr: CompanyAsset[] = [],
): TableRow[] =>
	arr.map((x) => ({
		id: x.id,
		title: x.originalName,
		isPopular: x.isPopular,
		createdAt: x.createdAt,
		updatedAt: x.updatedAt,
	}))

export const mapCaseRemindersToTableRows = (
	arr: CaseReminder[] = [],
): TableRow[] =>
	arr.map((x) => ({
		id: x.id,
		title: x.topic,
		lan: x.lan,
		createdAt: x.createdAt,
		updatedAt: x.updatedAt,
	}))

export const mapPromocodesToTableRows = (
	arr: Promocode[] = [],
): TableRow<PromocodeStatus>[] =>
	arr.map((x) => ({
		id: x.id,
		title: x.code,
		status: x.status,
		description: x.notes ?? undefined,
		createdAt: x.createdAt,
		updatedAt: x.updatedAt,
	}))

export const mapGdocTypesToTableRows = (
	arr: GdocType[] = [],
): TableRow<GdocTypeStatus>[] =>
	arr.map((x) => ({
		id: x.id,
		title: x.titleUA,
		status: x.status,
		icon: x.icon,
		isPopular: x.isPopular,
	}))

export const mapPartnersToTableRows = (
	arr: Partner[] = [],
): TableRow<string>[] =>
	arr.map((x) => ({
		id: x.id,
		title: x.companyName,
		status: x.status,
	}))

export const mapPartnerBannersToTableRows = (
	arr: PartnerBanner[] = [],
): TableRow<string>[] =>
	arr.map((x) => ({
		id: x.id,
		title: x.subtitleUa,
		status: x.status,
		typeId: x.partnerId,
		subtitle: x.type,
		description: x.linkUrl,
		createdAt: x.createdAt,
		updatedAt: x.updatedAt,
	}))

export const mapGdocsToTableRows = (
	arr: Gdoc[] = [],
): TableRow<GdocTemplateStatus>[] =>
	arr.map((x) => ({
		id: x.id,
		title: x.titleUA,
		status: x.status,
		icon: x.icon,
		typeId: x.gDocTypeId,
		subtitle: x.originalFileName,
		description: x.type?.titleUA,
		createdAt: x.createdAt,
		updatedAt: x.updatedAt,
	}))

export const mapGdocVarsToTableRows = (arr: GdocVar[] = []): TableRow[] =>
	arr.map((x) => ({
		id: x.id,
		title: x.key,
		subtitle: x.labelUA,
		description: x.labelPL,
		createdAt: x.createdAt,
		updatedAt: x.updatedAt,
	}))

export const mapConsultationCategoriesToTableRows = (
	arr: ConsultationCategory[] = [],
): TableRow<string>[] =>
	arr.map((x) => ({
		id: x.id,
		title: x.titleUa,
		status: x.isActive ? 'active' : 'inactive',
		isPopular: x.isPopular,
		icon: x.icon,
		createdAt: x.createdAt,
		updatedAt: x.updatedAt,
	}))
