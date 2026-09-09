import { Languages } from '@/shared/types-enums/lans'
import { CaseStage } from '../case-stages/case-stages.types'
import { CaseStageTask } from '../case-stage-tasks/case-stage-tasks.types'
import { PublicAsset } from '@/api/media/public-assets/public-assets.types'

export enum CaseStatus {
	DRAFT = 'draft',
	ACTIVE = 'active',
	ARCHIVED = 'archived',
}

export interface Case {
	id: number
	typeId: number
	status: CaseStatus
	title: string
	subtitle: string
	version: number
	lan: Languages
	iconId: number
	icon: PublicAsset
	isPopular: boolean
	createdAt: string
	updatedAt: string
}

export interface CasesResponse {
	rows: Case[]
	count: number
}

export interface CaseWithStages extends Case {
	stages: Array<
		CaseStage & {
			tasks: CaseStageTask[]
		}
	>
}

export interface CreateCaseDto {
	title: string
	typeId: number
	lan: Languages
	subtitle: string
	version?: number
	iconId: number
	status?: CaseStatus
	isPopular?: boolean
}

export interface UpdateCaseDto {
	id: number
	dto: Partial<Omit<Case, 'id' | 'lan' | 'createdAt' | 'updatedAt'>>
}

export interface QueryCasesDto {
	status?: CaseStatus
	lan?: Languages
	isPopular?: boolean
	typeId?: number
	limit?: number
	offset?: number
}
