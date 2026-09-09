import { getJson, postJson, patchJson, deleteJson } from '@/api/http'
import { CASE_TYPES_BASE } from './case-types.constants'
import type {
	CaseType,
	CaseTypeListResponse,
	CreateCaseTypeRequest,
	UpdateCaseTypeRequest,
	QueryCaseTypes,
} from './case-types.types'

export const caseTypesApi = {
	list: (params: QueryCaseTypes = {}, opts?: { signal?: AbortSignal }) => {
		const search = new URLSearchParams()

		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined && value !== null) {
				search.set(key, String(value))
			}
		})

		const qs = search.toString()
		const url = `${CASE_TYPES_BASE}${qs ? `?${qs}` : ''}`

		return getJson<CaseTypeListResponse>(url, opts)
	},

	getOne: (id: number, opts?: { signal?: AbortSignal }) => {
		return getJson<CaseType>(`${CASE_TYPES_BASE}/${id}`, opts)
	},

	create: (dto: CreateCaseTypeRequest) => {
		return postJson<CaseType>(CASE_TYPES_BASE, dto)
	},

	update: ({ id, dto }: UpdateCaseTypeRequest) => {
		return patchJson<CaseType>(`${CASE_TYPES_BASE}/${id}`, dto)
	},

	remove: (id: number) => {
		return deleteJson<{ success: boolean }>(`${CASE_TYPES_BASE}/${id}`)
	},
}
