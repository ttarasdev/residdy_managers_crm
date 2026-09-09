import { getJson, postJson, patchJson, deleteJson } from '@/api/http'
import {
	CompanyVariantJoined,
	CompanyVariantQuery,
	CompanyVariantListResponse,
	CreateCompanyVariantDto,
	ToggleCompanyVariantPopularResponse,
	DeleteCompanyVariantResponse,
} from './company-variants.types'
import { COMPANY_VARIANTS_API_BASE } from './company-variants.constants'

export const companyVariantsApi = {
	list: (
		params: CompanyVariantQuery = {},
		opts?: { signal?: AbortSignal },
	) => {
		const search = new URLSearchParams()

		Object.entries(params).forEach(([k, v]) => {
			if (v !== undefined && v !== null) search.set(k, String(v))
		})

		return getJson<CompanyVariantListResponse>(
			`${COMPANY_VARIANTS_API_BASE}${
				search.toString() ? `?${search}` : ''
			}`,
			opts,
		)
	},

	create: (file: File, dto: CreateCompanyVariantDto) => {
		const form = new FormData()
		form.append('file', file)
		form.append('bucket', dto.bucket)
		form.append('originalName', dto.originalName)

		return postJson<CompanyVariantJoined>(COMPANY_VARIANTS_API_BASE, form)
	},

	getById: (id: number, opts?: { signal?: AbortSignal }) =>
		getJson<CompanyVariantJoined>(
			`${COMPANY_VARIANTS_API_BASE}/${id}`,
			opts,
		),

	remove: (id: number) =>
		deleteJson<DeleteCompanyVariantResponse>(
			`${COMPANY_VARIANTS_API_BASE}/${id}`,
		),

	togglePopular: (id: number) =>
		patchJson<ToggleCompanyVariantPopularResponse>(
			`${COMPANY_VARIANTS_API_BASE}/${id}/toggle-popular`,
		),
}
