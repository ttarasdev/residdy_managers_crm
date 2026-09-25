import type { PageResponse } from '../../common.types'
import type { RequestOptions } from '../../http.types'
import type {
    ActivatePartnerBannerDto,
    PartnerBanner,
    PartnerBannersQuery,
    RejectPartnerBannerDto,
} from './partner-banners.types'
import { http } from '../../http'

const BASE = '/partner-banners'

export const partnerBannersApi = {
    /** GET /partner-banners — roles: admin, manager */
    list: (query: PartnerBannersQuery = {}, options?: RequestOptions) =>
        http.get<PageResponse<PartnerBanner>>(`${BASE}`, {
            ...options,
            query: { ...query },
        }),

    /** GET /partner-banners/manage/:id — roles: admin, manager */
    getById: (id: number, options?: RequestOptions) =>
        http.get<PartnerBanner>(
            `${BASE}/manage/${encodeURIComponent(String(id))}`,
            { ...options },
        ),

    /** PATCH /partner-banners/:id/approve — roles: admin */
    approve: (id: number, options?: RequestOptions) =>
        http.patch<PartnerBanner>(
            `${BASE}/${encodeURIComponent(String(id))}/approve`,
            undefined,
            { ...options },
        ),

    /** PATCH /partner-banners/:id/reject — roles: admin */
    reject: (
        id: number,
        dto: RejectPartnerBannerDto,
        options?: RequestOptions,
    ) =>
        http.patch<PartnerBanner>(
            `${BASE}/${encodeURIComponent(String(id))}/reject`,
            dto,
            { ...options },
        ),

    /** PATCH /partner-banners/:id/activate — roles: admin */
    activate: (
        id: number,
        dto: ActivatePartnerBannerDto,
        options?: RequestOptions,
    ) =>
        http.patch<PartnerBanner>(
            `${BASE}/${encodeURIComponent(String(id))}/activate`,
            dto,
            { ...options },
        ),

    /** PATCH /partner-banners/:id/finish — roles: admin */
    finish: (id: number, options?: RequestOptions) =>
        http.patch<PartnerBanner>(
            `${BASE}/${encodeURIComponent(String(id))}/finish`,
            undefined,
            { ...options },
        ),

    /** DELETE /partner-banners/:id — roles: admin */
    remove: (id: number, options?: RequestOptions) =>
        http.delete<void>(`${BASE}/${encodeURIComponent(String(id))}`, {
            ...options,
        }),
}
