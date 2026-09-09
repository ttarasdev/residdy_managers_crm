import type { PageResponse } from '../../common.types'
import type { RequestOptions } from '../../http.types'
import type {
    ManageSpecialistDto,
    RegisterSpecialistDto,
    Specialist,
    SpecialistProfile,
    SpecialistsQuery,
    UpdateSpecialistStatusDto,
} from './specialists.types'
import { http } from '../../http'

const BASE = '/specialists'

export const specialistsApi = {
    /** POST /specialists/register — roles: admin */
    register: (dto: RegisterSpecialistDto, options?: RequestOptions) =>
        http.post<Specialist>(`${BASE}/register`, dto, { ...options }),

    /** GET /specialists — roles: admin, manager */
    list: (query: SpecialistsQuery = {}, options?: RequestOptions) =>
        http.get<PageResponse<Specialist>>(`${BASE}`, {
            ...options,
            query: { ...query },
        }),

    /** GET /specialists/:id */
    getById: (id: number, options?: RequestOptions) =>
        http.get<SpecialistProfile>(
            `${BASE}/${encodeURIComponent(String(id))}`,
            {
                ...options,
            },
        ),

    /** PATCH /specialists/:id — roles: admin */
    update: (id: number, dto: ManageSpecialistDto, options?: RequestOptions) =>
        http.patch<Specialist>(
            `${BASE}/${encodeURIComponent(String(id))}`,
            dto,
            {
                ...options,
            },
        ),

    /** PATCH /specialists/:id/status — roles: admin */
    updateStatus: (
        id: number,
        dto: UpdateSpecialistStatusDto,
        options?: RequestOptions,
    ) =>
        http.patch<Specialist>(
            `${BASE}/${encodeURIComponent(String(id))}/status`,
            dto,
            { ...options },
        ),

    /** DELETE /specialists/:id — roles: admin */
    remove: (id: number, options?: RequestOptions) =>
        http.delete<void>(`${BASE}/${encodeURIComponent(String(id))}`, {
            ...options,
        }),
}
