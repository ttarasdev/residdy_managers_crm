import type { PageResponse } from '../../common.types'
import type { RequestOptions } from '../../http.types'
import type {
    UpdateUserDto,
    UpdateUserStatusDto,
    User,
    UsersQuery,
} from './users.types'
import { http } from '../../http'

const BASE = '/user'

export const usersApi = {
    /** GET /user — roles: admin, manager */
    list: (query: UsersQuery = {}, options?: RequestOptions) =>
        http.get<PageResponse<User>>(`${BASE}`, {
            ...options,
            query: { ...query },
        }),

    /** GET /user/:id — roles: admin, manager */
    getById: (id: number, options?: RequestOptions) =>
        http.get<User>(`${BASE}/${encodeURIComponent(String(id))}`, {
            ...options,
        }),

    /** PATCH /user/:id — roles: admin, manager */
    update: (id: number, dto: UpdateUserDto, options?: RequestOptions) =>
        http.patch<User>(`${BASE}/${encodeURIComponent(String(id))}`, dto, {
            ...options,
        }),

    /** PATCH /user/:id/status — roles: admin */
    updateStatus: (
        id: number,
        dto: UpdateUserStatusDto,
        options?: RequestOptions,
    ) =>
        http.patch<User>(
            `${BASE}/${encodeURIComponent(String(id))}/status`,
            dto,
            {
                ...options,
            },
        ),
}
