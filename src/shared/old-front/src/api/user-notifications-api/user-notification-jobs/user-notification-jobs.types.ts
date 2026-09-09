import { Languages } from '@/shared/types-enums/lans'
import { UserStatus, UserLevel } from '@/api/users/users/users.types'

export enum UserNotificationJobStatus {
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

export type UserNotificationJob = {
	id: number
	title: string
	subject: string
	text: string
	audienceJson: AudienceFilters | null
	deliverAt: string | null
	status: UserNotificationJobStatus
	createdByManagerId: number
	createdAt: string
	updatedAt: string
}

export type CreateUserNotificationJobDto = {
	title: string
	subject: string
	text: string
	audience?: AudienceFilters
}

export type UpdateUserNotificationJobDto = {
	id: number
	title?: string
	subject?: string
	text?: string
	audience?: AudienceFilters | null
}

export type ScheduleUserNotificationJobDto = {
	id: number
	deliverAt: string
}

export type QueryUserNotificationJobsDto = {
	status?: UserNotificationJobStatus
	limit?: number
	offset?: number
}

export type UserNotificationJobsListResponse = {
	rows: UserNotificationJob[]
	count: number
}

export type UserNotificationJobProgress = {
	jobId: number
	status: UserNotificationJobStatus
	total: number
	queued: number
	processed: number
	failed: number
	retrying: number
	skipped: number
}

export type CreateOrUpdateResponse = {
	id: number
	status: UserNotificationJobStatus | string
}

export type ScheduleResponse = {
	id: number
	status: UserNotificationJobStatus | string
	deliverAt: string
}

export type BuildResponse = {
	ok?: boolean
}
