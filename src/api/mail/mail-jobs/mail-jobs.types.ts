import type { MailSignatureSnapshot } from '../mail-signatures/mail-signatures.types'
import type { AccountStatus } from '../../accounts/accounts/accounts.types'
import type { AccountType, Languages } from '../../common.types'
import type { MailAccount } from '../mail-accounts/mail-accounts.types'

export interface MailJob {
    signatureId: number | null
    signatureSnapshot: MailSignatureSnapshot | null
    id: number
    title: string
    account: MailAccount
    subject: string
    html: string | null
    text: string | null
    audienceJson: AudienceFilters | null
    attachmentsJson: AttachmentRef[] | null
    inlineImagesJson: InlineImageRef[] | null
    deliverAt: string | null
    status: MailJobStatus
    createdByAccountId: number
    audienceCursor: number
    audienceMaxId: number
    audienceBuilt: boolean
    createdAt: string
    updatedAt: string
}

export interface AudienceFilters {
    accountTypes?: AccountType[]
    language?: Languages[]
    status?: AccountStatus[]
}

export interface AttachmentRef {
    mediaAssetId: number
    filename?: string
}

export interface InlineImageRef {
    mediaAssetId: number
    cid: string
}

export enum MailJobStatus {
    DRAFT = 'draft',
    SCHEDULED = 'scheduled',
    RUNNING = 'running',
    DONE = 'done',
    CANCELLED = 'cancelled',
}

export interface CreateMailJobDto {
    signatureId?: number
    title: string
    account: MailAccount
    subject: string
    html?: string
    text?: string
    audience?: AudienceFiltersDto
    attachments?: AttachmentRefDto[]
    inlineImages?: InlineImageRefDto[]
}

export interface AudienceFiltersDto {
    accountTypes?: AccountType[]
    language?: Languages[]
    status?: AccountStatus[]
}

export interface AttachmentRefDto {
    mediaAssetId: number
    filename?: string
}

export interface InlineImageRefDto {
    mediaAssetId: number
    cid: string
}

export interface MailJobsQuery {
    page?: number
    limit?: number
    offset?: number
    status?: MailJobStatus
    account?: MailAccount
}

export interface UpdateMailJobDto {
    signatureId?: number | null
    title?: string
    subject?: string
    html?: string
    text?: string
    audience?: AudienceFiltersDto
    attachments?: AttachmentRefDto[]
    inlineImages?: InlineImageRefDto[]
}

export interface ScheduleMailJobDto {
    deliverAt: string
}

export interface ScheduleMailJobResponse {
    id: number
    status: MailJobStatus
    deliverAt: string
}

export interface CancelMailJobResponse {
    id: number
    status: MailJobStatus
}

export interface MailJobProgress {
    jobId: number
    status: MailJobStatus
    audienceBuilt: boolean
    total: number
    queued: number
    sending: number
    sent: number
    failed: number
    retrying: number
    skipped: number
}

export interface MailJobBuildResult {
    jobId: number
    created: number
    status: MailJobStatus
    audienceBuilt?: boolean
}
