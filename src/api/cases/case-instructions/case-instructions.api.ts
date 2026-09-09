import type { PageResponse, SuccessResponse } from '../../common.types'
import type { RequestOptions } from '../../http.types'
import type {
    CaseInstruction,
    CaseInstructionsQuery,
    CreateCaseInstructionDto,
    UpdateCaseInstructionDto,
} from './case-instructions.types'
import { http } from '../../http'

const BASE = '/case-instructions'

export const caseInstructionsApi = {
    /** POST /case-instructions — roles: admin, manager */
    create: (dto: CreateCaseInstructionDto, options?: RequestOptions) =>
        http.post<CaseInstruction>(`${BASE}`, dto, { ...options }),

    /** GET /case-instructions */
    list: (query: CaseInstructionsQuery = {}, options?: RequestOptions) =>
        http.get<PageResponse<CaseInstruction>>(`${BASE}`, {
            ...options,
            query: { ...query },
        }),

    /** GET /case-instructions/:id */
    getById: (id: number, options?: RequestOptions) =>
        http.get<CaseInstruction>(`${BASE}/${encodeURIComponent(String(id))}`, {
            ...options,
        }),

    /** PATCH /case-instructions/:id — roles: admin */
    update: (
        id: number,
        dto: UpdateCaseInstructionDto,
        options?: RequestOptions,
    ) =>
        http.patch<CaseInstruction>(
            `${BASE}/${encodeURIComponent(String(id))}`,
            dto,
            { ...options },
        ),

    /** DELETE /case-instructions/:id — roles: admin */
    remove: (id: number, options?: RequestOptions) =>
        http.delete<SuccessResponse>(
            `${BASE}/${encodeURIComponent(String(id))}`,
            {
                ...options,
            },
        ),
}
