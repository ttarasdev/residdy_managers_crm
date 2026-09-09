import type { PageResponse, SuccessResponse } from '../../common.types'
import type { RequestOptions } from '../../http.types'
import type {
    CreateGDocTemplateDto,
    GDocTemplate,
    GDocTemplatesQuery,
    UpdateGDocTemplateDto,
} from './g-doc-templates.types'
import { http } from '../../http'

const BASE = '/g-doc-templates'

export const gDocTemplatesApi = {
    /** GET /g-doc-templates */
    list: (query: GDocTemplatesQuery = {}, options?: RequestOptions) =>
        http.get<PageResponse<GDocTemplate>>(`${BASE}`, {
            ...options,
            query: { ...query },
        }),

    /** GET /g-doc-templates/:id */
    getById: (id: number, options?: RequestOptions) =>
        http.get<GDocTemplate>(`${BASE}/${encodeURIComponent(String(id))}`, {
            ...options,
        }),

    /** POST /g-doc-templates — roles: admin */
    create: (dto: CreateGDocTemplateDto, options?: RequestOptions) =>
        http.post<GDocTemplate>(`${BASE}`, dto, { ...options }),

    /** PATCH /g-doc-templates/:id — roles: admin */
    update: (
        id: number,
        dto: UpdateGDocTemplateDto,
        options?: RequestOptions,
    ) =>
        http.patch<GDocTemplate>(
            `${BASE}/${encodeURIComponent(String(id))}`,
            dto,
            {
                ...options,
            },
        ),

    /** DELETE /g-doc-templates/:id — roles: admin */
    remove: (id: number, options?: RequestOptions) =>
        http.delete<SuccessResponse>(
            `${BASE}/${encodeURIComponent(String(id))}`,
            {
                ...options,
            },
        ),
}
