import type { RequestOptions } from '../../http.types'
import type {
    CreateUserReminderDto,
    UserReminder,
} from './user-reminders.types'
import { http } from '../../http'

const BASE = '/user-reminders'

export const userRemindersApi = {
    /** POST /user-reminders — roles: admin, manager, sender */
    create: (dto: CreateUserReminderDto, options?: RequestOptions) =>
        http.post<UserReminder>(`${BASE}`, dto, { ...options }),
}
