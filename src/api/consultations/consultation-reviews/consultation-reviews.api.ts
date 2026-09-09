import type { PageResponse } from '../../common.types'
import type { RequestOptions } from '../../http.types'
import type {
    ConsultationReview,
    ConsultationReviewsQuery,
    RejectConsultationReviewDto,
} from './consultation-reviews.types'
import { http } from '../../http'

const BASE = '/consultation-reviews'

export const consultationReviewsApi = {
    /** GET /consultation-reviews — roles: admin, manager */
    list: (query: ConsultationReviewsQuery = {}, options?: RequestOptions) =>
        http.get<PageResponse<ConsultationReview>>(`${BASE}`, {
            ...options,
            query: { ...query },
        }),

    /** GET /consultation-reviews/:id — roles: admin, manager */
    getById: (id: number, options?: RequestOptions) =>
        http.get<ConsultationReview>(
            `${BASE}/${encodeURIComponent(String(id))}`,
            {
                ...options,
            },
        ),

    /** PATCH /consultation-reviews/:id/approve — roles: admin, manager */
    approve: (id: number, options?: RequestOptions) =>
        http.patch<ConsultationReview>(
            `${BASE}/${encodeURIComponent(String(id))}/approve`,
            undefined,
            { ...options },
        ),

    /** PATCH /consultation-reviews/:id/reject — roles: admin, manager */
    reject: (
        id: number,
        dto: RejectConsultationReviewDto,
        options?: RequestOptions,
    ) =>
        http.patch<ConsultationReview>(
            `${BASE}/${encodeURIComponent(String(id))}/reject`,
            dto,
            { ...options },
        ),
}
