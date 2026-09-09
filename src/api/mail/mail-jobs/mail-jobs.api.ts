import type { PageResponse, PlannerTickResult } from '../../common.types'
import type { RequestOptions } from '../../http.types'
import type {
    CancelMailJobResponse,
    CreateMailJobDto,
    MailJob,
    MailJobBuildResult,
    MailJobProgress,
    MailJobsQuery,
    ScheduleMailJobDto,
    ScheduleMailJobResponse,
    UpdateMailJobDto,
} from './mail-jobs.types'
import { http } from '../../http'

const BASE = '/mail-jobs'

export const mailJobsApi = {
    /** POST /mail-jobs — roles: writer */
    create: (dto: CreateMailJobDto, options?: RequestOptions) =>
        http.post<MailJob>(`${BASE}`, dto, { ...options }),

    /** GET /mail-jobs — roles: writer */
    list: (query: MailJobsQuery = {}, options?: RequestOptions) =>
        http.get<PageResponse<MailJob>>(`${BASE}`, {
            ...options,
            query: { ...query },
        }),

    /** GET /mail-jobs/:id — roles: writer */
    getById: (id: number, options?: RequestOptions) =>
        http.get<MailJob>(`${BASE}/${encodeURIComponent(String(id))}`, {
            ...options,
        }),

    /** PATCH /mail-jobs/:id — roles: writer */
    update: (id: number, dto: UpdateMailJobDto, options?: RequestOptions) =>
        http.patch<MailJob>(`${BASE}/${encodeURIComponent(String(id))}`, dto, {
            ...options,
        }),

    /** POST /mail-jobs/:id/schedule — roles: writer */
    schedule: (id: number, dto: ScheduleMailJobDto, options?: RequestOptions) =>
        http.post<ScheduleMailJobResponse>(
            `${BASE}/${encodeURIComponent(String(id))}/schedule`,
            dto,
            { ...options },
        ),

    /** POST /mail-jobs/:id/cancel — roles: writer */
    cancel: (id: number, options?: RequestOptions) =>
        http.post<CancelMailJobResponse>(
            `${BASE}/${encodeURIComponent(String(id))}/cancel`,
            undefined,
            { ...options },
        ),

    /** GET /mail-jobs/:id/progress — roles: writer */
    progress: (id: number, options?: RequestOptions) =>
        http.get<MailJobProgress>(
            `${BASE}/${encodeURIComponent(String(id))}/progress`,
            { ...options },
        ),

    /** POST /mail-jobs/:id/build — roles: writer */
    build: (id: number, options?: RequestOptions) =>
        http.post<MailJobBuildResult>(
            `${BASE}/${encodeURIComponent(String(id))}/build`,
            undefined,
            { ...options },
        ),

    /** POST /mail-jobs/planner/tick — roles: writer */
    tick: (options?: RequestOptions) =>
        http.post<PlannerTickResult>(`${BASE}/planner/tick`, undefined, {
            ...options,
        }),
}
