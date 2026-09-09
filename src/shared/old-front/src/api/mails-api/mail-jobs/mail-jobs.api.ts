import { getJson, postJson, patchJson } from '@/api/http'
import type {
	CreateMailJobDto,
	MailJob,
	MailJobProgress,
	MailJobsListResponse,
	QueryMailJobsDto,
	ScheduleMailJobDto,
	UpdateMailJobDto,
	CreateOrUpdateResponse,
	ScheduleResponse,
	BuildResponse,
} from './mail-jobs.types'
import {
	MAIL_JOBS_API_BASE as BASE,
	MAIL_JOBS_API_BASE,
} from './mail-jobs.constants'

export const mailJobsApi = {
	create: (dto: CreateMailJobDto) =>
		postJson<CreateOrUpdateResponse>(BASE, dto),

	list: (params: QueryMailJobsDto = {}, opts?: { signal?: AbortSignal }) => {
		const search = new URLSearchParams()

		Object.entries(params).forEach(([key, value]) => {
			if (value != undefined && value !== null) {
				search.set(key, String(value))
			}
		})

		const qs = search.toString()
		const url = `${MAIL_JOBS_API_BASE}${qs ? `?${qs}` : ''}`

		return getJson<MailJobsListResponse>(url, opts)
	},

	getById: (args: { id: number }) => getJson<MailJob>(`${BASE}/${args.id}`),

	update: (args: UpdateMailJobDto) =>
		patchJson<CreateOrUpdateResponse>(`${BASE}/${args.id}`, args.dto),

	schedule: (args: ScheduleMailJobDto) =>
		postJson<ScheduleResponse>(`${BASE}/${args.id}/schedule`, {
			deliverAt: args.deliverAt,
		}),

	progress: (args: { id: number }) =>
		getJson<MailJobProgress>(`${BASE}/${args.id}/progress`),

	build: (args: { id: number }) =>
		postJson<BuildResponse>(`${BASE}/${args.id}/build`),

	plannerTick: () => postJson<BuildResponse>(`${BASE}/planner/tick`),
}
