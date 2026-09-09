import { PublicAsset } from '@/api/media/public-assets/public-assets.types'
import { Languages } from '@/shared/types-enums/lans'

export interface CaseStage {
	id: number
	caseId: number
	lan: Languages
	stageNo: number
	title: string
	iconId: number
	icon: PublicAsset
}

export type UpdateStagePayload = {
	id: number
	dto: UpdateCaseStageDto
}

export type CaseStagesResponse = CaseStage[]

export interface ReorderDirection {
	direction: 'up' | 'down'
}

export type ReorderCaseStageDto = {
	id: number
	dto: ReorderDirection
}

export interface CreateCaseStageDto {
	caseId: number
	lan: Languages
	title: string
	iconId: number
}

export interface UpdateCaseStageDto {
	id: number
	dto: Partial<Omit<CaseStage, 'id' | 'caseId' | 'lan'>>
}
