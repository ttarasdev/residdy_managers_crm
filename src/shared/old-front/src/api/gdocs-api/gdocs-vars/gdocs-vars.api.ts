import { deleteJson, getJson, postJson } from '@/api/http'
import { GDOCS_VARS_API_BASE } from './gdocs-vars.constants'
import {
	CreateGdocVarDto,
	GdocVar,
	GdocVarsResponse,
	GetGdocVarsQueryDto,
} from './gdocs-vars.types'

export const gdocsVarsApi = {
	list: (
		params: GetGdocVarsQueryDto = {},
		opts?: { signal?: AbortSignal },
	) => {
		const search = new URLSearchParams()

		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined && value !== null) {
				search.set(key, String(value))
			}
		})

		const qs = search.toString()
		const url = `${GDOCS_VARS_API_BASE}${qs ? `?${qs}` : ''}`

		return getJson<GdocVarsResponse>(url, opts)
	},

	getById: (id: number, opts?: { signal?: AbortSignal }) =>
		getJson<GdocVar>(`${GDOCS_VARS_API_BASE}/${id}`, opts),

	create: (dto: CreateGdocVarDto) =>
		postJson<GdocVar>(GDOCS_VARS_API_BASE, dto),

	delete: (id: number) =>
		deleteJson<{ success: true }>(`${GDOCS_VARS_API_BASE}/${id}`),
}
