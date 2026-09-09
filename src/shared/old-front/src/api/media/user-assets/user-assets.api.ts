import { getJson } from '@/api/http'
import {
	UserAsset,
	UserAssetQuery,
	UserAssetListResponse,
	UserAssetSignedUrlResponse,
} from './user-assets.types'
import { USER_ASSETS_API_BASE } from './user-assets.constants'

export const userAssetsApi = {
	listByUserId: (
		userId: number,
		params: UserAssetQuery = {},
		opts?: { signal?: AbortSignal },
	) => {
		const search = new URLSearchParams()

		Object.entries(params).forEach(([k, v]) => {
			if (v !== undefined && v !== null) search.set(k, String(v))
		})

		return getJson<UserAssetListResponse>(
			`${USER_ASSETS_API_BASE}/user/${userId}${
				search.toString() ? `?${search}` : ''
			}`,
			opts,
		)
	},

	getByUserId: (
		userId: number,
		id: number,
		opts?: { signal?: AbortSignal },
	) =>
		getJson<UserAsset>(
			`${USER_ASSETS_API_BASE}/user/${userId}/${id}`,
			opts,
		),

	getSignedUrlByUserId: (userId: number, id: number) =>
		getJson<UserAssetSignedUrlResponse>(
			`${USER_ASSETS_API_BASE}/user/${userId}/${id}/url`,
		),
}
