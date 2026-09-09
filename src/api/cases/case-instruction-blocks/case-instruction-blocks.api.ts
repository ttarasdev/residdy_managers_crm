import type { PageResponse, SuccessResponse } from '../../common.types'
import type { RequestOptions } from '../../http.types'
import type {
    CaseInstructionBlock,
    CaseInstructionBlocksQuery,
    CreateCaseInstructionBlockDto,
    ReorderCaseInstructionBlockDto,
    UpdateCaseInstructionBlockDto,
} from './case-instruction-blocks.types'
import { http } from '../../http'

const BASE = '/case-instruction-blocks'

export const caseInstructionBlocksApi = {
    /** POST /case-instruction-blocks — roles: admin, manager */
    create: (dto: CreateCaseInstructionBlockDto, options?: RequestOptions) =>
        http.post<CaseInstructionBlock>(`${BASE}`, dto, { ...options }),

    /** GET /case-instruction-blocks/:instructionId */
    listByInstruction: (
        instructionId: number,
        query: CaseInstructionBlocksQuery = {},
        options?: RequestOptions,
    ) =>
        http.get<PageResponse<CaseInstructionBlock>>(
            `${BASE}/${encodeURIComponent(String(instructionId))}`,
            { ...options, query: { ...query } },
        ),

    /** PATCH /case-instruction-blocks/:id — roles: admin */
    update: (
        id: number,
        dto: UpdateCaseInstructionBlockDto,
        options?: RequestOptions,
    ) =>
        http.patch<CaseInstructionBlock>(
            `${BASE}/${encodeURIComponent(String(id))}`,
            dto,
            { ...options },
        ),

    /** PATCH /case-instruction-blocks/:id/reorder — roles: admin */
    reorder: (
        id: number,
        dto: ReorderCaseInstructionBlockDto,
        options?: RequestOptions,
    ) =>
        http.patch<CaseInstructionBlock[]>(
            `${BASE}/${encodeURIComponent(String(id))}/reorder`,
            dto,
            { ...options },
        ),

    /** DELETE /case-instruction-blocks/:id — roles: admin */
    remove: (id: number, options?: RequestOptions) =>
        http.delete<SuccessResponse>(
            `${BASE}/${encodeURIComponent(String(id))}`,
            {
                ...options,
            },
        ),
}
