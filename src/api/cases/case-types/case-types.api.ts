import type { PageResponse, SuccessResponse } from '../../common.types'
import type { RequestOptions } from '../../http.types'
import type {
    CaseType,
    CaseTypesQuery,
    CreateCaseTypeDto,
    UpdateCaseTypeDto,
} from './case-types.types'
import { http } from '../../http'

const BASE = '/case-types'

export const caseTypesApi = {
    /** POST /case-types — roles: admin, manager */
    create: (dto: CreateCaseTypeDto, options?: RequestOptions) =>
        http.post<CaseType>(`${BASE}`, dto, { ...options }),

    /** GET /case-types */
    list: (query: CaseTypesQuery = {}, options?: RequestOptions) =>
        http.get<PageResponse<CaseType>>(`${BASE}`, {
            ...options,
            query: { ...query },
        }),

    /** GET /case-types/:id */
    getById: (id: number, options?: RequestOptions) =>
        http.get<CaseType>(`${BASE}/${encodeURIComponent(String(id))}`, {
            ...options,
        }),

    /** PATCH /case-types/:id — roles: admin */
    update: (id: number, dto: UpdateCaseTypeDto, options?: RequestOptions) =>
        http.patch<CaseType>(`${BASE}/${encodeURIComponent(String(id))}`, dto, {
            ...options,
        }),

    /** DELETE /case-types/:id — roles: admin */
    remove: (id: number, options?: RequestOptions) =>
        http.delete<SuccessResponse>(
            `${BASE}/${encodeURIComponent(String(id))}`,
            {
                ...options,
            },
        ),
}
