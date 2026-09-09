import { Languages } from '@/shared/types-enums/lans'
import type { MailAccount } from '../mail-accounts/mail-accounts.types'
import { UserLevel, UserStatus } from '@/api/users/users/users.types'

export enum MailJobStatus {
	DRAFT = 'draft',
	SCHEDULED = 'scheduled',
	RUNNING = 'running',
	DONE = 'done',
	CANCELLED = 'cancelled',
}

export type AudienceFilters = {
	language?: Languages[]
	status?: UserStatus[]
	level?: UserLevel[]
}

export type AttachmentRef = {
	mediaAssetId: number
	filename?: string
}

export type InlineImageRef = {
	mediaAssetId: number
	cid: string
}

export type MailJob = {
	id: number
	title: string
	account: string
	subject: string
	html: string | null
	text: string | null
	audienceJson: AudienceFilters | null
	attachmentsJson: AttachmentRef[] | null
	inlineImagesJson: InlineImageRef[] | null
	deliverAt: string | null
	status: MailJobStatus
	createdByManagerId: number
	createdAt: string
	updatedAt: string
}

export type CreateMailJobDto = {
	title: string
	account: MailAccount
	subject: string
	html?: string
	text?: string
	audience?: AudienceFilters
	attachments?: AttachmentRef[]
	inlineImages?: InlineImageRef[]
}

export type UpdateMailJobDto = {
	id: number
	dto: {
		title?: string
		subject?: string
		html?: string | null
		text?: string | null
		audience?: AudienceFilters | null
		attachments?: AttachmentRef[] | null
		inlineImages?: InlineImageRef[] | null
	}
}

export type ScheduleMailJobDto = {
	id: number
	deliverAt: string
}

export type QueryMailJobsDto = {
	status?: MailJobStatus
	account?: MailAccount
	limit?: number
	offset?: number
}

export type MailJobsListResponse = {
	rows: MailJob[]
	count: number
}

export type MailJobProgress = {
	jobId: number
	status: MailJobStatus
	total: number
	queued: number
	sent: number
	failed: number
	retrying: number
	skipped: number
}

export type CreateOrUpdateResponse = {
	id: number
	status: MailJobStatus | string
}

export type ScheduleResponse = {
	id: number
	status: MailJobStatus | string
	deliverAt: string
}

export type BuildResponse = {
	ok?: boolean
}
