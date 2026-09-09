import type { PageResponse } from '../../common.types'
import type { RequestOptions } from '../../http.types'
import type { CreateRoleDto, Role, RolesQuery } from './roles.types'
import { http } from '../../http'

const BASE = '/roles'

export const rolesApi = {
    /** POST /roles — roles: admin */
    create: (dto: CreateRoleDto, options?: RequestOptions) =>
        http.post<Role>(`${BASE}`, dto, { ...options }),

    /** GET /roles — roles: admin */
    list: (query: RolesQuery = {}, options?: RequestOptions) =>
        http.get<PageResponse<Role>>(`${BASE}`, {
            ...options,
            query: { ...query },
        }),
}
