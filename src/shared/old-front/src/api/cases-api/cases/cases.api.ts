import { deleteJson, getJson, patchJson, postJson } from '../../http'
import { CASES_PATH } from './cases.constants'
import {
	Case,
	CasesResponse,
	CaseWithStages,
	CreateCaseDto,
	QueryCasesDto,
	UpdateCaseDto,
} from './cases.type'

export const casesApi = {
	list: (params: QueryCasesDto = {}, opts?: { signal?: AbortSignal }) => {
		const search = new URLSearchParams()

		Object.entries(params).forEach(([key, value]) => {
			if (value != undefined && value !== null) {
				search.set(key, String(value))
			}
		})

		const qs = search.toString()
		const url = `${CASES_PATH}${qs ? `?${qs}` : ''}`

		return getJson<CasesResponse>(url, opts)
	},

	getOne: (id: number, opts?: { signal?: AbortSignal }) => {
		return getJson<CaseWithStages>(`${CASES_PATH}/${id}`, opts)
	},

	create: (dto: CreateCaseDto) => {
		return postJson<Case>(CASES_PATH, dto)
	},

	update: ({ id, dto }: UpdateCaseDto) => {
		return patchJson<Case>(`${CASES_PATH}/${id}`, dto)
	},

	remove: (id: number) => {
		return deleteJson<{ success: boolean }>(`${CASES_PATH}/${id}`)
	},

	copy: (id: number) => {
		return postJson<Case>(`${CASES_PATH}/${id}/copy`)
	},
}
