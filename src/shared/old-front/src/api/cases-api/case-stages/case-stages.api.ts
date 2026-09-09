import { deleteJson, getJson, patchJson, postJson } from '../../http'
import { CASE_STAGES_PATH } from './case-stages.constants'
import {
	CaseStage,
	CaseStagesResponse,
	CreateCaseStageDto,
	ReorderCaseStageDto,
	UpdateCaseStageDto,
} from './case-stages.types'

export const caseStageApi = {
	getStagesByCase: (id: number, opts?: { signal?: AbortSignal }) => {
		return getJson<CaseStagesResponse>(`${CASE_STAGES_PATH}/${id}`, opts)
	},

	create: (dto: CreateCaseStageDto) => {
		return postJson<CaseStage>(CASE_STAGES_PATH, dto)
	},

	update: ({ id, dto }: UpdateCaseStageDto) => {
		return patchJson<CaseStage>(`${CASE_STAGES_PATH}/${id}`, dto)
	},

	remove: (id: number) => {
		return deleteJson<{ success: boolean }>(`${CASE_STAGES_PATH}/${id}`)
	},

	reorder: ({ id, dto }: ReorderCaseStageDto) => {
		return patchJson<CaseStage>(`${CASE_STAGES_PATH}/${id}/reorder`, dto)
	},
}
