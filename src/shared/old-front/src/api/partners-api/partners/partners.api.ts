import { deleteJson, getJson, patchJson, postJson, putJson } from '@/api/http'
import type {
	CreatePartnerDto,
	Partner,
	PartnersListResponse,
	QueryPartnerDto,
	RemovePartnerResponse,
	ResetPartnerPasswordDto,
	UpdatePartnerDto,
	UpdatePartnerLogoDto,
} from './partners.types'
import {
	PARTNERS_API_BASE as BASE,
	PARTNERS_API_BASE,
} from './partners.constants'

export const partnersApi = {
	list: (params: QueryPartnerDto = {}, opts?: { signal?: AbortSignal }) => {
		const search = new URLSearchParams()

		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined && value !== null && value !== '') {
				search.set(key, String(value))
			}
		})

		const qs = search.toString()
		const url = `${PARTNERS_API_BASE}${qs ? `?${qs}` : ''}`

		return getJson<PartnersListResponse>(url, opts)
	},

	getById: (id: number) => getJson<Partner>(`${BASE}/${id}`),

	create: ({ file, dto }: CreatePartnerDto) => {
		const form = new FormData()

		if (file) form.append('file', file)
		form.append('companyName', dto.companyName)
		form.append('email', dto.email)
		if (dto.phone != null) form.append('phone', dto.phone)

		return postJson<Partner>(BASE, form)
	},

	update: (dto: UpdatePartnerDto) => {
		const { id, ...body } = dto
		return putJson<Partner>(`${BASE}/${id}`, body)
	},

	updateLogo: ({ id, file }: UpdatePartnerLogoDto) => {
		const form = new FormData()
		form.append('file', file)

		return patchJson<Partner>(`${BASE}/${id}/logo`, form)
	},

	resetPassword: ({ id, password }: ResetPartnerPasswordDto) =>
		patchJson<Partner>(`${BASE}/${id}/reset-password`, { password }),

	remove: (id: number) => deleteJson<RemovePartnerResponse>(`${BASE}/${id}`),
}
