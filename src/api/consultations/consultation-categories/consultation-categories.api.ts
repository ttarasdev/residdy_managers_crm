import type { PageResponse } from '../../common.types'
import type { RequestOptions } from '../../http.types'
import type {
    ConsultationCategoriesQuery,
    ConsultationCategory,
    CreateConsultationCategoryDto,
    UpdateConsultationCategoryDto,
} from './consultation-categories.types'
import { http } from '../../http'

const BASE = '/consultation-categories'

export const consultationCategoriesApi = {
    /** GET /consultation-categories — roles: admin, manager */
    list: (query: ConsultationCategoriesQuery = {}, options?: RequestOptions) =>
        http.get<PageResponse<ConsultationCategory>>(`${BASE}`, {
            ...options,
            query: { ...query },
        }),

    /** GET /consultation-categories/:id */
    getById: (id: number, options?: RequestOptions) =>
        http.get<ConsultationCategory>(
            `${BASE}/${encodeURIComponent(String(id))}`,
            { ...options },
        ),

    /** POST /consultation-categories — roles: admin */
    create: (dto: CreateConsultationCategoryDto, options?: RequestOptions) =>
        http.post<ConsultationCategory>(`${BASE}`, dto, { ...options }),

    /** PATCH /consultation-categories/:id — roles: admin */
    update: (
        id: number,
        dto: UpdateConsultationCategoryDto,
        options?: RequestOptions,
    ) =>
        http.patch<ConsultationCategory>(
            `${BASE}/${encodeURIComponent(String(id))}`,
            dto,
            { ...options },
        ),

    /** DELETE /consultation-categories/:id — roles: admin */
    remove: (id: number, options?: RequestOptions) =>
        http.delete<void>(`${BASE}/${encodeURIComponent(String(id))}`, {
            ...options,
        }),
}
