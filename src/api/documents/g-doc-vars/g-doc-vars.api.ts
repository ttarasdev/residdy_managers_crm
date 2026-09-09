import type { PageResponse, SuccessResponse } from '../../common.types'
import type { RequestOptions } from '../../http.types'
import type {
    CreateGDocVarDto,
    GDocVar,
    GDocVarsQuery,
} from './g-doc-vars.types'
import { http } from '../../http'

const BASE = '/g-doc-vars'

export const gDocVarsApi = {
    /** GET /g-doc-vars */
    list: (query: GDocVarsQuery = {}, options?: RequestOptions) =>
        http.get<PageResponse<GDocVar>>(`${BASE}`, {
            ...options,
            query: { ...query },
        }),

    /** GET /g-doc-vars/:id */
    getById: (id: number, options?: RequestOptions) =>
        http.get<GDocVar>(`${BASE}/${encodeURIComponent(String(id))}`, {
            ...options,
        }),

    /** POST /g-doc-vars — roles: admin */
    create: (dto: CreateGDocVarDto, options?: RequestOptions) =>
        http.post<GDocVar>(`${BASE}`, dto, { ...options }),

    /** DELETE /g-doc-vars/:id — roles: admin */
    remove: (id: number, options?: RequestOptions) =>
        http.delete<SuccessResponse>(
            `${BASE}/${encodeURIComponent(String(id))}`,
            {
                ...options,
            },
        ),
}
