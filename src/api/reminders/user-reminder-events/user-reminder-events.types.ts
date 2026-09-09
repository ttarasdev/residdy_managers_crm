import type { UserReminder } from '../user-reminders/user-reminders.types'

export interface UserReminderEvent {
    id: number
    reminderId: number
    kind: UserReminderEventKind
    triggerAt: string
    status: UserReminderEventStatus
    error: string | null
    claimedAt: string | null
    inAppPending: boolean
    reminder?: UserReminder | null
    createdAt: string
    updatedAt: string
}

export enum UserReminderEventKind {
    DAYS_7 = '7_days_before',
    DAY_1 = '1_day_before',
    HOURS_2 = '2_hours_before',
}

export enum UserReminderEventStatus {
    SCHEDULED = 'scheduled',
    PROCESSING = 'processing',
    DONE = 'done',
    CANCELLED = 'cancelled',
    FAILED = 'failed',
}

export interface ReminderEventsTickResult {
    picked: number
}
