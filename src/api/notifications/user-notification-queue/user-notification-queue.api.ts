import type { RequestOptions } from '../../http.types'
import type { NotificationQueueTickResult } from './user-notification-queue.types'
import { http } from '../../http'

const BASE = '/user-notification-queue'

export const userNotificationQueueApi = {
    /** POST /user-notification-queue/tick — roles: admin, sender */
    tick: (options?: RequestOptions) =>
        http.post<NotificationQueueTickResult>(`${BASE}/tick`, undefined, {
            ...options,
        }),
}
