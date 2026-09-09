import type { Languages } from '../../common.types'
import type { PublicAsset } from '../../media/public-assets/public-assets.types'
import type { CaseInstructionBlock } from '../case-instruction-blocks/case-instruction-blocks.types'

export interface CaseInstruction {
    id: number
    title: string
    status: CaseInstructionStatus
    description: string
    lan: Languages
    headerIconId: number
    isPopular: boolean
    headerIcon?: PublicAsset | null
    blocks?: CaseInstructionBlock[]
    createdAt: string
    updatedAt: string
}

export enum CaseInstructionStatus {
    DRAFT = 'draft',
    ACTIVE = 'active',
    ARCHIVED = 'archived',
}

export interface CreateCaseInstructionDto {
    title: string
    description: string
    headerIconId: number
    lan: Languages
    status?: CaseInstructionStatus
    isPopular?: boolean
}

export interface CaseInstructionsQuery {
    page?: number
    status?: CaseInstructionStatus
    lan?: Languages
    isPopular?: boolean
    limit?: number
    offset?: number
}

export type UpdateCaseInstructionDto = Partial<CreateCaseInstructionDto>
