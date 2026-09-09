import { getJson } from '@/api/http'
import {
	UserVariantJoined,
	UserVariantQuery,
	UserVariantListResponse,
} from './user-variants.types'
import { USER_VARIANTS_API_BASE } from './user-variants.constants'

export const userVariantsApi = {
	listByUserId: (
		userId: number,
		params: UserVariantQuery = {},
		opts?: { signal?: AbortSignal },
	) => {
		const search = new URLSearchParams()

		Object.entries(params).forEach(([k, v]) => {
			if (v !== undefined && v !== null) search.set(k, String(v))
		})

		return getJson<UserVariantListResponse>(
			`${USER_VARIANTS_API_BASE}/user/${userId}${
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
		getJson<UserVariantJoined>(
			`${USER_VARIANTS_API_BASE}/user/${userId}/${id}`,
			opts,
		),
}
