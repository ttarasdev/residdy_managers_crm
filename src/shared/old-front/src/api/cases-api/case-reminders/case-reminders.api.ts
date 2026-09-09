import { deleteJson, getJson, patchJson, postJson } from '../../http'
import { CASE_REMINDERS_PATH } from './case-reminders.constants'
import {
	CaseReminder,
	CaseRemindersResponse,
	CreateCaseReminderDto,
	QueryCaseReminderDto,
	UpdateCaseReminderDto,
} from './case-reminders.types'

export const caseRemindersApi = {
	getAll: (query?: QueryCaseReminderDto, opts?: { signal?: AbortSignal }) => {
		const params = query
			? `?${new URLSearchParams(
					query as Record<string, string>,
			  ).toString()}`
			: ''

		return getJson<CaseRemindersResponse>(
			`${CASE_REMINDERS_PATH}${params}`,
			opts,
		)
	},

	getOne: (id: number, opts?: { signal?: AbortSignal }) => {
		return getJson<CaseReminder>(`${CASE_REMINDERS_PATH}/${id}`, opts)
	},

	create: (dto: CreateCaseReminderDto) => {
		return postJson<CaseReminder>(CASE_REMINDERS_PATH, dto)
	},

	update: ({ id, dto }: UpdateCaseReminderDto) => {
		return patchJson<CaseReminder>(`${CASE_REMINDERS_PATH}/${id}`, dto)
	},

	remove: (id: number) => {
		return deleteJson<{ success: boolean }>(`${CASE_REMINDERS_PATH}/${id}`)
	},
}
