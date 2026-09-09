import type { RequestOptions } from '../../http.types'
import type {
    SendUserNotificationDto,
    UserNotification,
} from './user-notifications.types'
import { http } from '../../http'

const BASE = '/user-notifications'

export const userNotificationsApi = {
    /** POST /user-notifications/send — roles: admin, sender */
    send: (dto: SendUserNotificationDto, options?: RequestOptions) =>
        http.post<UserNotification>(`${BASE}/send`, dto, { ...options }),
}
