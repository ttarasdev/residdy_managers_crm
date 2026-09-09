import { postJson } from '@/api/http'
import type {
	SendUserNotificationDto,
	UserNotification,
} from './user-notification.types'
import { USER_NOTIFICATION_API_BASE as BASE } from './user-notification.constants'

export const userNotificationApi = {
	send: (dto: SendUserNotificationDto) =>
		postJson<UserNotification>(`${BASE}/send`, dto),
}
