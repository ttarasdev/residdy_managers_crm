import type { PageResponse, SuccessResponse } from '../../common.types'
import type { RequestOptions } from '../../http.types'
import type {
    CaseStage,
    CaseStagesQuery,
    CreateCaseStageDto,
    ReorderCaseStageDto,
    UpdateCaseStageDto,
} from './case-stages.types'
import { http } from '../../http'

const BASE = '/case-stages'

export const caseStagesApi = {
    /** POST /case-stages — roles: admin, manager */
    create: (dto: CreateCaseStageDto, options?: RequestOptions) =>
        http.post<CaseStage>(`${BASE}`, dto, { ...options }),

    /** GET /case-stages/:caseId */
    listByCase: (
        caseId: number,
        query: CaseStagesQuery = {},
        options?: RequestOptions,
    ) =>
        http.get<PageResponse<CaseStage>>(
            `${BASE}/${encodeURIComponent(String(caseId))}`,
            { ...options, query: { ...query } },
        ),

    /** PATCH /case-stages/:id — roles: admin */
    update: (id: number, dto: UpdateCaseStageDto, options?: RequestOptions) =>
        http.patch<CaseStage>(
            `${BASE}/${encodeURIComponent(String(id))}`,
            dto,
            {
                ...options,
            },
        ),

    /** PATCH /case-stages/:id/reorder — roles: admin */
    reorder: (id: number, dto: ReorderCaseStageDto, options?: RequestOptions) =>
        http.patch<CaseStage[]>(
            `${BASE}/${encodeURIComponent(String(id))}/reorder`,
            dto,
            { ...options },
        ),

    /** DELETE /case-stages/:id — roles: admin */
    remove: (id: number, options?: RequestOptions) =>
        http.delete<SuccessResponse>(
            `${BASE}/${encodeURIComponent(String(id))}`,
            {
                ...options,
            },
        ),
}
