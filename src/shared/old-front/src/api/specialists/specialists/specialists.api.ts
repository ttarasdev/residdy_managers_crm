import { getJson, patchJson, postJson } from '@/api/http'
import { SPECIALISTS_PATH } from './specialists.constants'
import {
	ChangeSpecialistStatusResponse,
	CreateSpecialistDto,
	QuerySpecialistsDto,
	Specialist,
	SpecialistWithInfo,
	SpecialistsResponse,
} from './specialists.types'

export const specialistsApi = {
	list: (
		params: QuerySpecialistsDto = {},
		opts?: { signal?: AbortSignal },
	) => {
		const search = new URLSearchParams()

		Object.entries(params).forEach(([key, value]) => {
			if (value != undefined && value !== null) {
				search.set(key, String(value))
			}
		})

		const qs = search.toString()
		const url = `${SPECIALISTS_PATH}${qs ? `?${qs}` : ''}`

		return getJson<SpecialistsResponse>(url, opts)
	},

	getOne: (id: number, opts?: { signal?: AbortSignal }) => {
		return getJson<SpecialistWithInfo>(`${SPECIALISTS_PATH}/${id}`, opts)
	},

	create: (dto: CreateSpecialistDto) => {
		return postJson<Specialist>(SPECIALISTS_PATH, dto)
	},

	changeStatus: (id: number) => {
		return patchJson<ChangeSpecialistStatusResponse>(
			`${SPECIALISTS_PATH}/${id}/status`,
			{},
		)
	},
}
