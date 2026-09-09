import { PublicAsset } from '@/api/media/public-assets/public-assets.types'
import { Languages } from '@/shared/types-enums/lans'

export enum StageTaskTypes {
	WITH_DATE = 'with_date',
	INFO = 'info',
	TEXT = 'text',
}

export interface CaseStageTask {
	id: number
	stageId: number
	lan: Languages
	title: string
	subtitle: string
	type: StageTaskTypes
	iconId: number
	instructionId?: number
	reminderId?: number
	icon: PublicAsset
	sortKey: number
	createdAt: string
	updatedAt: string
}

export type CaseStageTasksResponse = CaseStageTask[]

export interface ReorderDirection {
	direction: 'up' | 'down'
}

export type ReorderCaseStageTaskDto = {
	id: number
	dto: ReorderDirection
}

export interface CreateCaseStageTaskDto {
	stageId: number
	lan: Languages
	title: string
	subtitle: string
	type: StageTaskTypes
	iconId: number
	instructionId?: number
	reminderId?: number
}

export interface UpdateCaseStageTaskDto {
	id: number
	dto: Partial<
		Omit<
			CaseStageTask,
			'id' | 'stageId' | 'lan' | 'createdAt' | 'updatedAt' | 'sortKey'
		>
	>
}
