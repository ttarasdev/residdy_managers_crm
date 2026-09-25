import type { PageResponse, SuccessResponse } from '../../common.types'
import type { RequestOptions } from '../../http.types'
import type {
    CreateMailSignatureDto,
    MailSignature,
    MailSignaturesQuery,
    UpdateMailSignatureDto,
} from './mail-signatures.types'
import { http } from '../../http'

const BASE = '/mail-signatures'

export const mailSignaturesApi = {
    /** POST /mail-signatures — roles: writer */
    create: (dto: CreateMailSignatureDto, options?: RequestOptions) =>
        http.post<MailSignature>(`${BASE}`, dto, { ...options }),

    /** GET /mail-signatures — roles: writer */
    list: (query: MailSignaturesQuery = {}, options?: RequestOptions) =>
        http.get<PageResponse<MailSignature>>(`${BASE}`, {
            ...options,
            query: { ...query },
        }),

    /** GET /mail-signatures/:id — roles: writer */
    getById: (id: number, options?: RequestOptions) =>
        http.get<MailSignature>(`${BASE}/${encodeURIComponent(String(id))}`, {
            ...options,
        }),

    /** PATCH /mail-signatures/:id — roles: writer */
    update: (
        id: number,
        dto: UpdateMailSignatureDto,
        options?: RequestOptions,
    ) =>
        http.patch<MailSignature>(
            `${BASE}/${encodeURIComponent(String(id))}`,
            dto,
            {
                ...options,
            },
        ),

    /** DELETE /mail-signatures/:id — roles: writer */
    remove: (id: number, options?: RequestOptions) =>
        http.delete<SuccessResponse>(
            `${BASE}/${encodeURIComponent(String(id))}`,
            {
                ...options,
            },
        ),
}
