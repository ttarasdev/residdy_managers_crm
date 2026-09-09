import type { PageResponse, PlannerTickResult } from '../../common.types'
import type { RequestOptions } from '../../http.types'
import type {
    CreateUserNotificationJobDto,
    NotificationJobBuildResult,
    NotificationJobProgress,
    ScheduleUserNotificationJobDto,
    UpdateUserNotificationJobDto,
    UserNotificationJob,
    UserNotificationJobsQuery,
} from './user-notification-jobs.types'
import { http } from '../../http'

const BASE = '/user-notification-jobs'

export const userNotificationJobsApi = {
    /** POST /user-notification-jobs — roles: admin, manager */
    create: (dto: CreateUserNotificationJobDto, options?: RequestOptions) =>
        http.post<UserNotificationJob>(`${BASE}`, dto, { ...options }),

    /** GET /user-notification-jobs — roles: admin, manager, sender */
    list: (query: UserNotificationJobsQuery = {}, options?: RequestOptions) =>
        http.get<PageResponse<UserNotificationJob>>(`${BASE}`, {
            ...options,
            query: { ...query },
        }),

    /** GET /user-notification-jobs/:id — roles: admin, manager, sender */
    getById: (id: number, options?: RequestOptions) =>
        http.get<UserNotificationJob>(
            `${BASE}/${encodeURIComponent(String(id))}`,
            {
                ...options,
            },
        ),

    /** PATCH /user-notification-jobs/:id — roles: admin, manager */
    update: (
        id: number,
        dto: UpdateUserNotificationJobDto,
        options?: RequestOptions,
    ) =>
        http.patch<UserNotificationJob>(
            `${BASE}/${encodeURIComponent(String(id))}`,
            dto,
            { ...options },
        ),

    /** POST /user-notification-jobs/:id/schedule — roles: admin, sender */
    schedule: (
        id: number,
        dto: ScheduleUserNotificationJobDto,
        options?: RequestOptions,
    ) =>
        http.post<UserNotificationJob>(
            `${BASE}/${encodeURIComponent(String(id))}/schedule`,
            dto,
            { ...options },
        ),

    /** POST /user-notification-jobs/:id/cancel — roles: admin, sender */
    cancel: (id: number, options?: RequestOptions) =>
        http.post<UserNotificationJob>(
            `${BASE}/${encodeURIComponent(String(id))}/cancel`,
            undefined,
            { ...options },
        ),

    /** GET /user-notification-jobs/:id/progress — roles: admin, manager, sender */
    progress: (id: number, options?: RequestOptions) =>
        http.get<NotificationJobProgress>(
            `${BASE}/${encodeURIComponent(String(id))}/progress`,
            { ...options },
        ),

    /** POST /user-notification-jobs/:id/build — roles: admin, sender */
    build: (id: number, options?: RequestOptions) =>
        http.post<NotificationJobBuildResult>(
            `${BASE}/${encodeURIComponent(String(id))}/build`,
            undefined,
            { ...options },
        ),

    /** POST /user-notification-jobs/planner/tick — roles: admin, sender */
    tick: (options?: RequestOptions) =>
        http.post<PlannerTickResult>(`${BASE}/planner/tick`, undefined, {
            ...options,
        }),
}
