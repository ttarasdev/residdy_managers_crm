import type { Languages } from '../../common.types'

export interface CaseReminder {
    id: number
    lan: Languages
    topic: string
    text: string
    sendInApp: boolean
    sendEmail: boolean
    createdAt: string
    updatedAt: string
}

export interface CreateCaseReminderDto {
    lan: Languages
    topic: string
    text: string
    sendInApp?: boolean
    sendEmail?: boolean
}

export interface CaseRemindersQuery {
    lan?: Languages
    page?: number
    limit?: number
    offset?: number
}

export type UpdateCaseReminderDto = Partial<CreateCaseReminderDto>
