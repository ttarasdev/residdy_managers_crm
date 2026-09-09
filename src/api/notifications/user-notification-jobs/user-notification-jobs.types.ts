import type {
    Account,
    AccountStatus,
} from '../../accounts/accounts/accounts.types'
import type { Languages } from '../../common.types'

export interface UserNotificationJob {
    id: number
    title: string
    subject: string
    text: string
    audienceJson: UserNotificationAudienceFilters | null
    deliverAt: string | null
    status: UserNotificationJobStatus
    createdByAccountId: number | null
    creator?: Account | null
    audienceCursor: number
    audienceMaxId: number
    audienceBuilt: boolean
    createdAt: string
    updatedAt: string
}

export type UserNotificationAudienceFilters = {
    language?: Languages[]
    status?: AccountStatus[]
    level?: number[]
}

export enum UserNotificationJobStatus {
    DRAFT = 'draft',
    SCHEDULED = 'scheduled',
    RUNNING = 'running',
    DONE = 'done',
    CANCELLED = 'cancelled',
}

export interface CreateUserNotificationJobDto {
    title: string
    subject: string
    text: string
    audience?: AudienceFiltersDto
}

export interface AudienceFiltersDto {
    language?: Languages[]
    status?: AccountStatus[]
    level?: number[]
}

export interface UserNotificationJobsQuery {
    page?: number
    limit?: number
    offset?: number
    status?: UserNotificationJobStatus
}

export type UpdateUserNotificationJobDto = Partial<CreateUserNotificationJobDto>

export interface ScheduleUserNotificationJobDto {
    deliverAt: string
}

export interface NotificationJobProgress {
    jobId: number
    status: UserNotificationJobStatus
    audienceBuilt: boolean
    total: number
    queued: number
    processed: number
    failed: number
    retrying: number
    skipped: number
}

export interface NotificationJobBuildResult {
    jobId: number
    created: number
    status: UserNotificationJobStatus
    audienceBuilt?: boolean
}
