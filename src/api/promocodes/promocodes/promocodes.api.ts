import type { PageResponse } from '../../common.types'
import type { RequestOptions } from '../../http.types'
import type {
    CreatePromocodeDto,
    Promocode,
    PromocodeAccount,
    PromocodeHistoryQuery,
    PromocodeUsage,
    PromocodesQuery,
    SetPromocodeAccountsDto,
    SetPromocodeAccountsResponse,
    UpdatePromocodeDto,
} from './promocodes.types'
import { http } from '../../http'

const BASE = '/promocode'

export const promocodesApi = {
    /** POST /promocode — roles: admin */
    create: (dto: CreatePromocodeDto, options?: RequestOptions) =>
        http.post<Promocode>(`${BASE}`, dto, { ...options }),

    /** GET /promocode — roles: admin */
    list: (query: PromocodesQuery = {}, options?: RequestOptions) =>
        http.get<PageResponse<Promocode>>(`${BASE}`, {
            ...options,
            query: { ...query },
        }),

    /** GET /promocode/:id — roles: admin */
    getById: (id: number, options?: RequestOptions) =>
        http.get<Promocode>(`${BASE}/${encodeURIComponent(String(id))}`, {
            ...options,
        }),

    /** PATCH /promocode/:id — roles: admin */
    update: (id: number, dto: UpdatePromocodeDto, options?: RequestOptions) =>
        http.patch<Promocode>(
            `${BASE}/${encodeURIComponent(String(id))}`,
            dto,
            {
                ...options,
            },
        ),

    /** PATCH /promocode/:id/activate — roles: admin */
    activate: (id: number, options?: RequestOptions) =>
        http.patch<Promocode>(
            `${BASE}/${encodeURIComponent(String(id))}/activate`,
            undefined,
            { ...options },
        ),

    /** PATCH /promocode/:id/deactivate — roles: admin */
    deactivate: (id: number, options?: RequestOptions) =>
        http.patch<Promocode>(
            `${BASE}/${encodeURIComponent(String(id))}/deactivate`,
            undefined,
            { ...options },
        ),

    /** DELETE /promocode/:id — roles: admin */
    remove: (id: number, options?: RequestOptions) =>
        http.delete<void>(`${BASE}/${encodeURIComponent(String(id))}`, {
            ...options,
        }),

    /** PATCH /promocode/:id/accounts — roles: admin */
    setAccounts: (
        id: number,
        dto: SetPromocodeAccountsDto,
        options?: RequestOptions,
    ) =>
        http.patch<SetPromocodeAccountsResponse>(
            `${BASE}/${encodeURIComponent(String(id))}/accounts`,
            dto,
            { ...options },
        ),

    /** GET /promocode/:id/accounts — roles: admin */
    listAccounts: (
        id: number,
        query: PromocodeHistoryQuery = {},
        options?: RequestOptions,
    ) =>
        http.get<PageResponse<PromocodeAccount>>(
            `${BASE}/${encodeURIComponent(String(id))}/accounts`,
            { ...options, query: { ...query } },
        ),

    /** GET /promocode/:id/usages — roles: admin */
    listUsages: (
        id: number,
        query: PromocodeHistoryQuery = {},
        options?: RequestOptions,
    ) =>
        http.get<PageResponse<PromocodeUsage>>(
            `${BASE}/${encodeURIComponent(String(id))}/usages`,
            { ...options, query: { ...query } },
        ),
}
