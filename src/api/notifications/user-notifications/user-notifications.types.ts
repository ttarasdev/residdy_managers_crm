import type { User } from '../../users/users/users.types'

export interface UserNotification {
    id: number
    userId: number
    subject: string
    text: string
    status: UserNotificationStatus
    readAt: string | null
    user?: User | null
    createdAt: string
    updatedAt: string
}

export enum UserNotificationStatus {
    UNREAD = 'unread',
    READ = 'read',
    ARCHIVED = 'archived',
}

export interface SendUserNotificationDto {
    userId: number
    subject: string
    text: string
}
