import { Languages } from '@/shared/types-enums/lans'
import { CaseInstructionBlock } from '../case-instruction-blocks/case-instruction-blocks.types'

export enum CaseInstructionStatus {
	DRAFT = 'draft',
	ACTIVE = 'active',
	ARCHIVED = 'archived',
}

export interface CaseInstruction {
	id: number
	title: string
	description: string
	lan: Languages
	headerIconId: number
	status: CaseInstructionStatus
	isPopular: boolean
	createdAt: string
	updatedAt: string
}

export interface CaseInstructionWithBlocks extends CaseInstruction {
	blocks: CaseInstructionBlock[]
}

export interface CreateCaseInstructionDto {
	title: string
	description: string
	lan: Languages
	headerIconId: number
	status?: CaseInstructionStatus
	isPopular?: boolean
}

export interface UpdateCaseInstructionDto {
	id: number
	dto: Partial<CaseInstruction>
}

export interface QueryCaseInstructionsDto {
	status?: CaseInstructionStatus
	lan?: Languages
	isPopular?: boolean
	limit?: number
	offset?: number
}

export interface CaseInstructionsResponse {
	rows: CaseInstruction[]
	count: number
}
