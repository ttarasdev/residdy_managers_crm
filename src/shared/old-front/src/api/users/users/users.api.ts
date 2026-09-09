import { getJson, patchJson } from '../../http'
import { USERS_PATH } from './users.constants'
import { BanUserDto, User, UsersResponse, QueryUsersDto } from './users.types'

export const usersApi = {
	list: (params: QueryUsersDto = {}, opts?: { signal?: AbortSignal }) => {
		const search = new URLSearchParams()

		Object.entries(params).forEach(([key, value]) => {
			if (value != undefined && value !== null) {
				search.set(key, String(value))
			}
		})

		const qs = search.toString()
		const url = `${USERS_PATH}${qs ? `?${qs}` : ''}`

		return getJson<UsersResponse>(url, opts)
	},

	getOne: (id: number, opts?: { signal?: AbortSignal }) => {
		return getJson<User>(`${USERS_PATH}/${id}`, opts)
	},

	getByEmail: (email: string, opts?: { signal?: AbortSignal }) => {
		return getJson<User>(
			`${USERS_PATH}/by-email/${encodeURIComponent(email)}`,
			opts,
		)
	},

	ban: (dto: BanUserDto) => {
		return patchJson<{ success: boolean }>(`${USERS_PATH}/ban`, dto)
	},
}
