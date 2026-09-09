import type { RequestOptions } from '../../http.types'
import type {
    PartnerCompanyInfo,
    PrivateVariant,
    UpdatePartnerCompanyInfoDto,
} from './partner-company-info.types'
import { http, toFormData } from '../../http'

const BASE = '/partner-company-info'

export const partnerCompanyInfoApi = {
    /** PATCH /partner-company-info/:companyId — roles: admin */
    update: (
        id: number,
        dto: UpdatePartnerCompanyInfoDto,
        options?: RequestOptions,
    ) =>
        http.patch<PartnerCompanyInfo>(
            `${BASE}/${encodeURIComponent(String(id))}`,
            dto,
            { ...options },
        ),

    /** POST /partner-company-info/:companyId/photo — roles: admin */
    uploadPhoto: (id: number, file: File, options?: RequestOptions) =>
        http.post<PrivateVariant>(
            `${BASE}/${encodeURIComponent(String(id))}/photo`,
            toFormData({}, file),
            { ...options },
        ),
}
