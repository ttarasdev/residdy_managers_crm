export enum UserNotificationStatus {
  UNREAD = 'unread',
  READ = 'read',
  ARCHIVED = 'archived',
}

export type UserNotification = {
	id: number
	userId: number
	subject: string
	text: string
	status: UserNotificationStatus
	readAt: string | null
	createdAt: string
	updatedAt: string
}

export type SendUserNotificationDto = {
	userId: number
	subject: string
	text: string
}

export type QueryUserNotificationsDto = {
	limit?: number
	offset?: number
}

export type ChangeUserNotificationStatusDto = {
	status: UserNotificationStatus
}

export type UserNotificationsListResponse = {
	rows: UserNotification[]
	count: number
	unread: number
}

export type UnreadCountResponse = {
	unread: number
}