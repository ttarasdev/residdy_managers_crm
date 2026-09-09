import { deleteJson, getJson, patchJson, postJson } from '@/api/http'
import { GDOCS_TYPES_API_BASE } from './gdocs-constants'
import {
	CreateGdocTypeDto,
	GdocType,
	GdocTypesResponse,
	GdocTypeUpdateDto,
	GetGdocTypesQueryDto,
} from './gdocs-types.types'

export const gdocsTypesApi = {
	list: (
		params: GetGdocTypesQueryDto = {},
		opts?: { signal?: AbortSignal },
	) => {
		const search = new URLSearchParams()

		Object.entries(params).forEach(([key, value]) => {
			if (value != undefined && value !== null) {
				search.set(key, String(value))
			}
		})

		const qs = search.toString()
		const url = `${GDOCS_TYPES_API_BASE}${qs ? `?${qs}` : ''}`

		return getJson<GdocTypesResponse>(url, opts)
	},

	getById: (id: number) => getJson<GdocType>(`${GDOCS_TYPES_API_BASE}/${id}`),

	create: (dto: CreateGdocTypeDto) =>
		postJson<GdocType>(GDOCS_TYPES_API_BASE, dto),

	update: ({ id, dto }: GdocTypeUpdateDto) =>
		patchJson<GdocType>(`${GDOCS_TYPES_API_BASE}/${id}`, dto),

	delete: (id: number) =>
		deleteJson<{ success: true }>(`${GDOCS_TYPES_API_BASE}/${id}`),
}
