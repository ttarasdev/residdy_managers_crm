import { deleteJson, getJson, patchJson, postJson } from '@/api/http'
import { PROMOCODES_API_BASE as BASE } from './promocodes.constants'
import type {
	CreatePromocodeDto,
	Promocode,
	PromocodesResponse,
	QueryPromocodesDto,
	UpdatePromocodeDto,
} from './promocodes.types'

export const promocodesApi = {
	list: (
		args: { params?: QueryPromocodesDto; signal?: AbortSignal } = {},
	) => {
		const search = new URLSearchParams()

		Object.entries(args.params ?? {}).forEach(([key, value]) => {
			if (value != undefined && value !== null) {
				search.set(key, String(value))
			}
		})

		const qs = search.toString()
		const url = `${BASE}${qs ? `?${qs}` : ''}`

		return getJson<PromocodesResponse>(url, { signal: args.signal })
	},

	create: (dto: CreatePromocodeDto) => {
		return postJson<Promocode>(BASE, dto)
	},

	getById: (id: number) => {
		return getJson<Promocode>(`${BASE}/${id}`)
	},

	getByCode: (args: { code: string; signal?: AbortSignal }) => {
		return getJson<Promocode>(
			`${BASE}/by-code/${encodeURIComponent(args.code)}`,
			{ signal: args.signal },
		)
	},

	update: ({ id, dto }: UpdatePromocodeDto) => {
		return patchJson<Promocode>(`${BASE}/${id}`, dto)
	},

	activate: (id: number) => {
		return patchJson<void>(`${BASE}/${id}/activate`, {})
	},

	deactivate: (id: number) => {
		return patchJson<void>(`${BASE}/${id}/deactivate`, {})
	},

	remove: (id: number) => {
		return deleteJson<void>(`${BASE}/${id}`)
	},
}
