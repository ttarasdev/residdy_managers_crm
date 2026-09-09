import type { PageResponse, SuccessResponse } from '../../common.types'
import type { RequestOptions } from '../../http.types'
import type {
    CaseReminder,
    CaseRemindersQuery,
    CreateCaseReminderDto,
    UpdateCaseReminderDto,
} from './case-reminders.types'
import { http } from '../../http'

const BASE = '/case-reminders'

export const caseRemindersApi = {
    /** POST /case-reminders — roles: admin, manager */
    create: (dto: CreateCaseReminderDto, options?: RequestOptions) =>
        http.post<CaseReminder>(`${BASE}`, dto, { ...options }),

    /** GET /case-reminders */
    list: (query: CaseRemindersQuery = {}, options?: RequestOptions) =>
        http.get<PageResponse<CaseReminder>>(`${BASE}`, {
            ...options,
            query: { ...query },
        }),

    /** GET /case-reminders/:id */
    getById: (id: number, options?: RequestOptions) =>
        http.get<CaseReminder>(`${BASE}/${encodeURIComponent(String(id))}`, {
            ...options,
        }),

    /** DELETE /case-reminders/:id — roles: admin */
    remove: (id: number, options?: RequestOptions) =>
        http.delete<SuccessResponse>(
            `${BASE}/${encodeURIComponent(String(id))}`,
            {
                ...options,
            },
        ),

    /** PATCH /case-reminders/:id — roles: admin, manager */
    update: (
        id: number,
        dto: UpdateCaseReminderDto,
        options?: RequestOptions,
    ) =>
        http.patch<CaseReminder>(
            `${BASE}/${encodeURIComponent(String(id))}`,
            dto,
            {
                ...options,
            },
        ),
}
