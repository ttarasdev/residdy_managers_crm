import type { PageResponse, SuccessResponse } from '../../common.types'
import type { RequestOptions } from '../../http.types'
import type {
    CreateGDocTypeDto,
    GDocType,
    GDocTypesQuery,
    UpdateGDocTypeDto,
} from './g-doc-types.types'
import { http } from '../../http'

const BASE = '/g-doc-types'

export const gDocTypesApi = {
    /** GET /g-doc-types */
    list: (query: GDocTypesQuery = {}, options?: RequestOptions) =>
        http.get<PageResponse<GDocType>>(`${BASE}`, {
            ...options,
            query: { ...query },
        }),

    /** GET /g-doc-types/:id */
    getById: (id: number, options?: RequestOptions) =>
        http.get<GDocType>(`${BASE}/${encodeURIComponent(String(id))}`, {
            ...options,
        }),

    /** POST /g-doc-types — roles: admin */
    create: (dto: CreateGDocTypeDto, options?: RequestOptions) =>
        http.post<GDocType>(`${BASE}`, dto, { ...options }),

    /** PATCH /g-doc-types/:id — roles: admin */
    update: (id: number, dto: UpdateGDocTypeDto, options?: RequestOptions) =>
        http.patch<GDocType>(`${BASE}/${encodeURIComponent(String(id))}`, dto, {
            ...options,
        }),

    /** DELETE /g-doc-types/:id — roles: admin */
    remove: (id: number, options?: RequestOptions) =>
        http.delete<SuccessResponse>(
            `${BASE}/${encodeURIComponent(String(id))}`,
            {
                ...options,
            },
        ),
}
