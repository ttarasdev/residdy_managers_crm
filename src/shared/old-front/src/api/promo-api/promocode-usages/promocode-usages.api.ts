import { deleteJson, getJson, patchJson, postJson } from '@/api/http'
import { PROMOCODE_USAGES_API_BASE as BASE } from './promocode-usages.constants'
import type {
	CreatePromocodeUsageDto,
	PromocodeUsage,
	UpdatePromocodeUsageDto,
} from './promocode-usages.types'

export const promocodeUsagesApi = {
	listByPromo: (args: { promoCodeId: number; signal?: AbortSignal }) => {
		return getJson<PromocodeUsage[]>(
			`${BASE}/by-promo/${args.promoCodeId}`,
			{
				signal: args.signal,
			},
		)
	},

	listByUser: (args: { userId: number; signal?: AbortSignal }) => {
		return getJson<PromocodeUsage[]>(`${BASE}/by-user/${args.userId}`, {
			signal: args.signal,
		})
	},

	getById: (args: { id: number; signal?: AbortSignal }) => {
		return getJson<PromocodeUsage>(`${BASE}/${args.id}`, {
			signal: args.signal,
		})
	},
}
