import { deleteJson, getJson, patchJson, postJson } from '@/api/http'
import { PROMOCODE_USERS_API_BASE as BASE } from './promocode-users.constants'
import type {
	CreatePromocodeUserDto,
	PromocodeUser,
	RemovePromocodeUserByPairDto,
	UpdatePromocodeUserDto,
} from './promocode-users.types'

export const promocodeUsersApi = {
	create: (dto: CreatePromocodeUserDto) => {
		return postJson<PromocodeUser>(BASE, dto)
	},

	listByPromo: (args: { promoCodeId: number; signal?: AbortSignal }) => {
		return getJson<PromocodeUser[]>(`${BASE}/by-promo/${args.promoCodeId}`, {
			signal: args.signal,
		})
	},

	update: ({ id, dto }: UpdatePromocodeUserDto) => {
		return patchJson<PromocodeUser>(`${BASE}/${id}`, dto)
	},

	remove: (args: { id: number }) => {
		return deleteJson<void>(`${BASE}/${args.id}`)
	},

	removeByPair: (dto: RemovePromocodeUserByPairDto) => {
		return deleteJson<void>(`${BASE}/by-pair/${dto.promoCodeId}/${dto.userId}`)
	},
}
