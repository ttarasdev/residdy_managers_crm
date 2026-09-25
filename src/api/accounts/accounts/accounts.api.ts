import type { PageResponse } from '../../common.types'
import type { RequestOptions } from '../../http.types'
import type { Account, AccountsQuery, UpdateAccountDto } from './accounts.types'
import { http, toFormData } from '../../http'

const BASE = '/account'

export const accountsApi = {
    /** POST /account/me/avatar */
    uploadMyAvatar: (file: File, options?: RequestOptions) =>
        http.post<Account>(`${BASE}/me/avatar`, toFormData({}, file), {
            ...options,
        }),

    /** POST /account/:id/avatar — roles: admin (or the account owner) */
    uploadAvatar: (id: number, file: File, options?: RequestOptions) =>
        http.post<Account>(
            `${BASE}/${encodeURIComponent(String(id))}/avatar`,
            toFormData({}, file),
            { ...options },
        ),

    /** GET /account/me */
    getMe: (options?: RequestOptions) =>
        http.get<Account>(`${BASE}/me`, { ...options }),

    /** GET /account — roles: admin */
    list: (query: AccountsQuery = {}, options?: RequestOptions) =>
        http.get<PageResponse<Account>>(`${BASE}`, {
            ...options,
            query: { ...query },
        }),

    /** GET /account/:id — roles: admin */
    getById: (id: number, options?: RequestOptions) =>
        http.get<Account>(`${BASE}/${encodeURIComponent(String(id))}`, {
            ...options,
        }),

    /** PATCH /account/:id — roles: admin */
    update: (id: number, dto: UpdateAccountDto, options?: RequestOptions) =>
        http.patch<Account>(`${BASE}/${encodeURIComponent(String(id))}`, dto, {
            ...options,
        }),
}
