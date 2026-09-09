import { deleteJson, getJson, patchJson, postJson } from '../../http'
import { CASE_STAGE_TASKS_PATH } from './case-stage-tasks.constants'
import {
	CaseStageTask,
	CaseStageTasksResponse,
	CreateCaseStageTaskDto,
	ReorderCaseStageTaskDto,
	UpdateCaseStageTaskDto,
} from './case-stage-tasks.types'

export const caseStageTasksApi = {
	getByStage: (stageId: number, opts?: { signal?: AbortSignal }) => {
		return getJson<CaseStageTasksResponse>(
			`${CASE_STAGE_TASKS_PATH}/by-stage/${stageId}`,
			opts,
		)
	},

	create: (dto: CreateCaseStageTaskDto) => {
		return postJson<CaseStageTask>(CASE_STAGE_TASKS_PATH, dto)
	},

	update: ({ id, dto }: UpdateCaseStageTaskDto) => {
		return patchJson<CaseStageTask>(`${CASE_STAGE_TASKS_PATH}/${id}`, dto)
	},

	remove: (id: number) => {
		return deleteJson<{ success: boolean }>(
			`${CASE_STAGE_TASKS_PATH}/${id}`,
		)
	},

	reorder: ({ id, dto }: ReorderCaseStageTaskDto) => {
		return patchJson<CaseStageTask[]>(
			`${CASE_STAGE_TASKS_PATH}/${id}/reorder`,
			dto,
		)
	},
}
