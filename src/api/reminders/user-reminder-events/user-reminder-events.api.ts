import type { RequestOptions } from '../../http.types'
import type { ReminderEventsTickResult } from './user-reminder-events.types'
import { http } from '../../http'

const BASE = '/user-reminder-events'

export const userReminderEventsApi = {
    /** POST /user-reminder-events/worker/tick — roles: admin, manager, sender */
    tick: (options?: RequestOptions) =>
        http.post<ReminderEventsTickResult>(`${BASE}/worker/tick`, undefined, {
            ...options,
        }),
}
