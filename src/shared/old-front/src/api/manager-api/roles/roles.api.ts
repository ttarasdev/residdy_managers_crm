import { getJson, postJson } from '@/api/http'
import type { Role, CreateRoleDto } from './roles.types'
import { ROLES_API_BASE as BASE } from './roles.constants'

export const rolesApi = {
	list: () => {
		return getJson<Role[]>(BASE)
	},

	getById: (id: number) => {
		return getJson<Role>(`${BASE}/${id}`)
	},

	create: (dto: CreateRoleDto) => {
		return postJson<Role>(BASE, dto)
	},
}
