import { deleteJson, getJson, patchJson, postJson } from '@/api/http'
import type {
	AddBannerImpressionsDto,
	PartnerBanner,
	PartnersBannersListResponse,
	QueryPartnerBannerDto,
	RejectPartnerBannerDto,
	SuccessResponse,
} from './partners-banners.types'
import {
	PARTNERS_BANNERS_API_BASE as BASE,
	PARTNERS_BANNERS_API_BASE,
} from './partners-banners.constants'

export const partnersBannersApi = {
	list: (
		params: QueryPartnerBannerDto = {},
		opts?: { signal?: AbortSignal },
	) => {
		const search = new URLSearchParams()

		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined && value !== null && value !== '') {
				search.set(key, String(value))
			}
		})

		const qs = search.toString()
		const url = `${PARTNERS_BANNERS_API_BASE}${qs ? `?${qs}` : ''}`

		return getJson<PartnersBannersListResponse>(url, opts)
	},

	getById: (id: number) => getJson<PartnerBanner>(`${BASE}/${id}`),

	approve: (id: number) => patchJson<PartnerBanner>(`${BASE}/${id}/approve`),

	reject: (id: number, dto: RejectPartnerBannerDto) =>
		patchJson<PartnerBanner>(`${BASE}/${id}/reject`, dto),

	activate: (id: number) => patchJson<PartnerBanner>(`${BASE}/${id}/activate`),

	finish: (id: number) => patchJson<PartnerBanner>(`${BASE}/${id}/finish`),

	addImpressions: (dto: AddBannerImpressionsDto) =>
		postJson<SuccessResponse>(`${BASE}/impressions`, dto),

	addClick: (id: number) => postJson<PartnerBanner>(`${BASE}/${id}/click`),

	remove: (id: number) => deleteJson<SuccessResponse>(`${BASE}/${id}`),
}
