import type { PageResponse, SuccessResponse } from '../../common.types'
import type { RequestOptions } from '../../http.types'
import type {
    CaseStageTask,
    CaseStageTasksQuery,
    CreateCaseTaskDto,
    ReorderCaseStageTaskDto,
    UpdateCaseTaskDto,
} from './case-stage-tasks.types'
import { http } from '../../http'

const BASE = '/case-stage-tasks'

export const caseStageTasksApi = {
    /** POST /case-stage-tasks — roles: admin, manager */
    create: (dto: CreateCaseTaskDto, options?: RequestOptions) =>
        http.post<CaseStageTask>(`${BASE}`, dto, { ...options }),

    /** GET /case-stage-tasks/by-stage/:stageId */
    listByStage: (
        stageId: number,
        query: CaseStageTasksQuery = {},
        options?: RequestOptions,
    ) =>
        http.get<PageResponse<CaseStageTask>>(
            `${BASE}/by-stage/${encodeURIComponent(String(stageId))}`,
            { ...options, query: { ...query } },
        ),

    /** PATCH /case-stage-tasks/:id — roles: admin */
    update: (id: number, dto: UpdateCaseTaskDto, options?: RequestOptions) =>
        http.patch<CaseStageTask>(
            `${BASE}/${encodeURIComponent(String(id))}`,
            dto,
            { ...options },
        ),

    /** PATCH /case-stage-tasks/:id/reorder — roles: admin */
    reorder: (
        id: number,
        dto: ReorderCaseStageTaskDto,
        options?: RequestOptions,
    ) =>
        http.patch<CaseStageTask[]>(
            `${BASE}/${encodeURIComponent(String(id))}/reorder`,
            dto,
            { ...options },
        ),

    /** DELETE /case-stage-tasks/:id — roles: admin */
    remove: (id: number, options?: RequestOptions) =>
        http.delete<SuccessResponse>(
            `${BASE}/${encodeURIComponent(String(id))}`,
            {
                ...options,
            },
        ),
}
