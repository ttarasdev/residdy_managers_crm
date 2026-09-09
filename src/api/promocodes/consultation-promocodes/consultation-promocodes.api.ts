import type { RequestOptions } from '../../http.types'
import type {
    ConsultationPromocode,
    ConsultationPromocodeDetail,
    CreateConsultationPromocodeDto,
    UpdateConsultationPromocodeDto,
} from './consultation-promocodes.types'
import { http } from '../../http'

const BASE = '/consultation-promocode'

export const consultationPromocodesApi = {
    /** POST /consultation-promocode — roles: admin */
    create: (dto: CreateConsultationPromocodeDto, options?: RequestOptions) =>
        http.post<ConsultationPromocodeDetail>(`${BASE}`, dto, { ...options }),

    /** GET /consultation-promocode/:promocodeId — roles: admin */
    getById: (id: number, options?: RequestOptions) =>
        http.get<ConsultationPromocodeDetail>(
            `${BASE}/${encodeURIComponent(String(id))}`,
            { ...options },
        ),

    /** PATCH /consultation-promocode/:promocodeId — roles: admin */
    update: (
        id: number,
        dto: UpdateConsultationPromocodeDto,
        options?: RequestOptions,
    ) =>
        http.patch<ConsultationPromocode>(
            `${BASE}/${encodeURIComponent(String(id))}`,
            dto,
            { ...options },
        ),

    /** DELETE /consultation-promocode/:promocodeId — roles: admin */
    remove: (id: number, options?: RequestOptions) =>
        http.delete<void>(`${BASE}/${encodeURIComponent(String(id))}`, {
            ...options,
        }),
}
