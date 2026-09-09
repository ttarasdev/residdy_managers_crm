import { getJson, postJson, patchJson, deleteJson } from '@/api/http'
import {
	PublicAsset,
	PublicAssetQuery,
	PublicAssetListResponse,
	CreatePublicAssetDto,
	TogglePublicAssetPopularResponse,
	DeletePublicAssetResponse,
} from './public-assets.types'
import { PUBLIC_ASSETS_API_BASE } from './public-assets.constants'

export const publicAssetsApi = {
	list: (params: PublicAssetQuery = {}, opts?: { signal?: AbortSignal }) => {
		const search = new URLSearchParams()

		Object.entries(params).forEach(([k, v]) => {
			if (v !== undefined && v !== null) search.set(k, String(v))
		})

		return getJson<PublicAssetListResponse>(
			`${PUBLIC_ASSETS_API_BASE}${search.toString() ? `?${search}` : ''}`,
			opts,
		)
	},

	create: (file: File, dto: CreatePublicAssetDto) => {
		const form = new FormData()
		form.append('file', file)
		form.append('bucket', dto.bucket)
		form.append('originalName', dto.originalName)

		return postJson<PublicAsset>(PUBLIC_ASSETS_API_BASE, form)
	},

	getById: (id: number, opts?: { signal?: AbortSignal }) =>
		getJson<PublicAsset>(`${PUBLIC_ASSETS_API_BASE}/${id}`, opts),

	remove: (id: number) =>
		deleteJson<DeletePublicAssetResponse>(
			`${PUBLIC_ASSETS_API_BASE}/${id}`,
		),

	togglePopular: (id: number) =>
		patchJson<TogglePublicAssetPopularResponse>(
			`${PUBLIC_ASSETS_API_BASE}/${id}/toggle-popular`,
		),
}
