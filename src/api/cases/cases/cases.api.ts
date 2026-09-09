import type { PageResponse, SuccessResponse } from '../../common.types'
import type { RequestOptions } from '../../http.types'
import type {
    Case,
    CaseDetail,
    CasesQuery,
    CreateCaseDto,
    UpdateCaseDto,
} from './cases.types'
import { http } from '../../http'

const BASE = '/cases'

export const casesApi = {
    /** POST /cases — roles: admin, manager */
    create: (dto: CreateCaseDto, options?: RequestOptions) =>
        http.post<Case>(`${BASE}`, dto, { ...options }),

    /** GET /cases */
    list: (query: CasesQuery = {}, options?: RequestOptions) =>
        http.get<PageResponse<Case>>(`${BASE}`, {
            ...options,
            query: { ...query },
        }),

    /** GET /cases/:id */
    getById: (id: number, options?: RequestOptions) =>
        http.get<CaseDetail>(`${BASE}/${encodeURIComponent(String(id))}`, {
            ...options,
        }),

    /** PATCH /cases/:id — roles: admin */
    update: (id: number, dto: UpdateCaseDto, options?: RequestOptions) =>
        http.patch<Case>(`${BASE}/${encodeURIComponent(String(id))}`, dto, {
            ...options,
        }),

    /** DELETE /cases/:id — roles: admin */
    remove: (id: number, options?: RequestOptions) =>
        http.delete<SuccessResponse>(
            `${BASE}/${encodeURIComponent(String(id))}`,
            {
                ...options,
            },
        ),

    /** POST /cases/:id/copy — roles: admin */
    copy: (id: number, options?: RequestOptions) =>
        http.post<Case>(
            `${BASE}/${encodeURIComponent(String(id))}/copy`,
            undefined,
            { ...options },
        ),
}
