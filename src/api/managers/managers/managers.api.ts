import type { PageResponse } from '../../common.types'
import type { RequestOptions } from '../../http.types'
import type {
    Manager,
    ManagersQuery,
    RegisterManagerDto,
    UpdateManagerDto,
    UpdateManagerRolesDto,
} from './managers.types'
import { http } from '../../http'

const BASE = '/managers'

export const managersApi = {
    /** POST /managers/register — roles: admin */
    register: (dto: RegisterManagerDto, options?: RequestOptions) =>
        http.post<Manager>(`${BASE}/register`, dto, { ...options }),

    /** GET /managers/me */
    getMe: (options?: RequestOptions) =>
        http.get<Manager>(`${BASE}/me`, { ...options }),

    /** PATCH /managers/me */
    updateMe: (dto: UpdateManagerDto, options?: RequestOptions) =>
        http.patch<Manager>(`${BASE}/me`, dto, { ...options }),

    /** GET /managers — roles: admin */
    list: (query: ManagersQuery = {}, options?: RequestOptions) =>
        http.get<PageResponse<Manager>>(`${BASE}`, {
            ...options,
            query: { ...query },
        }),

    /** GET /managers/:id — roles: admin */
    getById: (id: number, options?: RequestOptions) =>
        http.get<Manager>(`${BASE}/${encodeURIComponent(String(id))}`, {
            ...options,
        }),

    /** PATCH /managers/:id/roles — roles: admin */
    updateRoles: (
        id: number,
        dto: UpdateManagerRolesDto,
        options?: RequestOptions,
    ) =>
        http.patch<Manager>(
            `${BASE}/${encodeURIComponent(String(id))}/roles`,
            dto,
            { ...options },
        ),

    /** PATCH /managers/:id — roles: admin */
    update: (id: number, dto: UpdateManagerDto, options?: RequestOptions) =>
        http.patch<Manager>(`${BASE}/${encodeURIComponent(String(id))}`, dto, {
            ...options,
        }),

    /** DELETE /managers/:id — roles: admin */
    remove: (id: number, options?: RequestOptions) =>
        http.delete<void>(`${BASE}/${encodeURIComponent(String(id))}`, {
            ...options,
        }),
}
