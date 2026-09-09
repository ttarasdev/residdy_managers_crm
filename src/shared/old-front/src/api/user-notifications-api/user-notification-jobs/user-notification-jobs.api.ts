import { getJson, patchJson, postJson } from '@/api/http'
import type {
	BuildResponse,
	CreateOrUpdateResponse,
	CreateUserNotificationJobDto,
	QueryUserNotificationJobsDto,
	ScheduleResponse,
	ScheduleUserNotificationJobDto,
	UpdateUserNotificationJobDto,
	UserNotificationJob,
	UserNotificationJobProgress,
	UserNotificationJobsListResponse,
} from './user-notification-jobs.types'
import {
	USER_NOTIFICATION_JOBS_API_BASE as BASE,
	USER_NOTIFICATION_JOBS_API_BASE,
} from './user-notification-jobs.constants'

export const userNotificationJobsApi = {
	create: (dto: CreateUserNotificationJobDto) =>
		postJson<CreateOrUpdateResponse>(BASE, dto),

	list: (
		params: QueryUserNotificationJobsDto = {},
		opts?: { signal?: AbortSignal },
	) => {
		const search = new URLSearchParams()

		Object.entries(params).forEach(([key, value]) => {
			if (value != undefined && value !== null) {
				search.set(key, String(value))
			}
		})

		const qs = search.toString()
		const url = `${USER_NOTIFICATION_JOBS_API_BASE}${qs ? `?${qs}` : ''}`

		return getJson<UserNotificationJobsListResponse>(url, opts)
	},

	getById: (id: number) => getJson<UserNotificationJob>(`${BASE}/${id}`),

	update: (dto: UpdateUserNotificationJobDto) => {
		const { id, ...body } = dto
		return patchJson<CreateOrUpdateResponse>(`${BASE}/${id}`, body)
	},

	schedule: (dto: ScheduleUserNotificationJobDto) =>
		postJson<ScheduleResponse>(`${BASE}/${dto.id}/schedule`, {
			deliverAt: dto.deliverAt,
		}),

	progress: (id: number) =>
		getJson<UserNotificationJobProgress>(`${BASE}/${id}/progress`),

	build: (id: number) => postJson<BuildResponse>(`${BASE}/${id}/build`),

	plannerTick: () => postJson<BuildResponse>(`${BASE}/planner/tick`),
}
