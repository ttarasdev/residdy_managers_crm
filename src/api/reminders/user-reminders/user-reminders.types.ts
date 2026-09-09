import type { Account } from '../../accounts/accounts/accounts.types'
import type { UserCaseTask } from '../../user-cases/user-case-tasks/user-case-tasks.types'
import type { User } from '../../users/users/users.types'
import type { UserReminderEvent } from '../user-reminder-events/user-reminder-events.types'

export interface UserReminder {
    id: number
    userId: number
    userTaskId: number | null
    topic: string
    text: string
    targetAt: string
    sendInApp: boolean
    sendEmail: boolean
    status: UserReminderStatus
    createdByAccountId: number | null
    user?: User | null
    createdBy?: Account | null
    task?: UserCaseTask | null
    events?: UserReminderEvent[]
    createdAt: string
    updatedAt: string
}

export enum UserReminderStatus {
    ACTIVE = 'active',
    CANCELLED = 'cancelled',
}

export interface CreateUserReminderDto {
    userId: number
    userTaskId?: number
    topic: string
    text: string
    targetAt: string
    sendInApp?: boolean
    sendEmail?: boolean
}
