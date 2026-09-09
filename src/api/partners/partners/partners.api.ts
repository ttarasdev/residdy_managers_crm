import type { PageResponse } from '../../common.types'
import type { RequestOptions } from '../../http.types'
import type {
    Partner,
    PartnersQuery,
    RegisterPartnerDto,
    UpdatePartnerDto,
    UpdatePartnerStatusDto,
} from './partners.types'
import { http } from '../../http'

const BASE = '/partners'

export const partnersApi = {
    /** POST /partners/register — roles: admin, manager */
    register: (dto: RegisterPartnerDto, options?: RequestOptions) =>
        http.post<Partner>(`${BASE}/register`, dto, { ...options }),

    /** GET /partners — roles: admin, manager */
    list: (query: PartnersQuery = {}, options?: RequestOptions) =>
        http.get<PageResponse<Partner>>(`${BASE}`, {
            ...options,
            query: { ...query },
        }),

    /** GET /partners/:id — roles: admin, manager */
    getById: (id: number, options?: RequestOptions) =>
        http.get<Partner>(`${BASE}/${encodeURIComponent(String(id))}`, {
            ...options,
        }),

    /** PATCH /partners/:id — roles: admin */
    update: (id: number, dto: UpdatePartnerDto, options?: RequestOptions) =>
        http.patch<Partner>(`${BASE}/${encodeURIComponent(String(id))}`, dto, {
            ...options,
        }),

    /** PATCH /partners/:id/status — roles: admin */
    updateStatus: (
        id: number,
        dto: UpdatePartnerStatusDto,
        options?: RequestOptions,
    ) =>
        http.patch<Partner>(
            `${BASE}/${encodeURIComponent(String(id))}/status`,
            dto,
            { ...options },
        ),

    /** DELETE /partners/:id — roles: admin */
    remove: (id: number, options?: RequestOptions) =>
        http.delete<void>(`${BASE}/${encodeURIComponent(String(id))}`, {
            ...options,
        }),
}
