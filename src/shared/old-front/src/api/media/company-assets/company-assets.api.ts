import { getJson, postJson, patchJson, deleteJson } from '@/api/http'
import {
	CompanyAsset,
	CompanyAssetQuery,
	CompanyAssetListResponse,
	CreateCompanyAssetDto,
	CompanyAssetSignedUrlResponse,
	ToggleCompanyAssetPopularResponse,
	DeleteCompanyAssetResponse,
} from './company-assets.types'
import { COMPANY_ASSETS_API_BASE } from './company-assets.constants'

export const companyAssetsApi = {
	list: (params: CompanyAssetQuery = {}, opts?: { signal?: AbortSignal }) => {
		const search = new URLSearchParams()

		Object.entries(params).forEach(([k, v]) => {
			if (v !== undefined && v !== null) search.set(k, String(v))
		})

		return getJson<CompanyAssetListResponse>(
			`${COMPANY_ASSETS_API_BASE}${
				search.toString() ? `?${search}` : ''
			}`,
			opts,
		)
	},

	create: (file: File, dto: CreateCompanyAssetDto) => {
		const form = new FormData()
		form.append('file', file)
		form.append('bucket', dto.bucket)
		form.append('originalName', dto.originalName)

		return postJson<CompanyAsset>(COMPANY_ASSETS_API_BASE, form)
	},

	getById: (id: number, opts?: { signal?: AbortSignal }) =>
		getJson<CompanyAsset>(`${COMPANY_ASSETS_API_BASE}/${id}`, opts),

	getSignedUrl: (id: number) =>
		getJson<CompanyAssetSignedUrlResponse>(
			`${COMPANY_ASSETS_API_BASE}/${id}/url`,
		),

	remove: (id: number) =>
		deleteJson<DeleteCompanyAssetResponse>(
			`${COMPANY_ASSETS_API_BASE}/${id}`,
		),

	togglePopular: (id: number) =>
		patchJson<ToggleCompanyAssetPopularResponse>(
			`${COMPANY_ASSETS_API_BASE}/${id}/toggle-popular`,
		),
}
