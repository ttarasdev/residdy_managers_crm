import type { PageResponse } from '../../common.types'
import type { RequestOptions } from '../../http.types'
import type {
    CreateManagedPartnerCompanyDto,
    PartnerCompaniesQuery,
    PartnerCompany,
    PrivateVariant,
    UpdateCompanyStatusDto,
    UpdatePartnerCompanyDto,
} from './partner-companies.types'
import { http, toFormData } from '../../http'

const BASE = '/partner-companies'

export const partnerCompaniesApi = {
    /** POST /partner-companies — roles: admin */
    create: (dto: CreateManagedPartnerCompanyDto, options?: RequestOptions) =>
        http.post<PartnerCompany>(BASE, dto, { ...options }),

    /** GET /partner-companies/manage — roles: admin, manager */
    list: (query: PartnerCompaniesQuery = {}, options?: RequestOptions) =>
        http.get<PageResponse<PartnerCompany>>(`${BASE}/manage`, {
            ...options,
            query: { ...query },
        }),

    /** GET /partner-companies/manage/:id — roles: admin, manager */
    getById: (id: number, options?: RequestOptions) =>
        http.get<PartnerCompany>(
            `${BASE}/manage/${encodeURIComponent(String(id))}`,
            { ...options },
        ),

    /** PATCH /partner-companies/:id — roles: admin */
    update: (
        id: number,
        dto: UpdatePartnerCompanyDto,
        options?: RequestOptions,
    ) =>
        http.patch<PartnerCompany>(
            `${BASE}/${encodeURIComponent(String(id))}`,
            dto,
            { ...options },
        ),

    /** POST /partner-companies/:id/logo — roles: admin */
    uploadLogo: (id: number, file: File, options?: RequestOptions) =>
        http.post<PrivateVariant>(
            `${BASE}/${encodeURIComponent(String(id))}/logo`,
            toFormData({}, file),
            { ...options },
        ),

    /** PATCH /partner-companies/:id/status — roles: admin */
    updateStatus: (
        id: number,
        dto: UpdateCompanyStatusDto,
        options?: RequestOptions,
    ) =>
        http.patch<PartnerCompany>(
            `${BASE}/${encodeURIComponent(String(id))}/status`,
            dto,
            { ...options },
        ),

    /** DELETE /partner-companies/:id — roles: admin */
    remove: (id: number, options?: RequestOptions) =>
        http.delete<void>(`${BASE}/${encodeURIComponent(String(id))}`, {
            ...options,
        }),
}
