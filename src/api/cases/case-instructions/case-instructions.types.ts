import type { Languages } from '../../common.types'
import type { PrivateVariant } from '../../media/private-variants/private-variants.types'
import type { CaseInstructionBlock } from '../case-instruction-blocks/case-instruction-blocks.types'

export interface CaseInstruction {
    id: number
    title: string
    status: CaseInstructionStatus
    description: string
    lan: Languages
    headerVariantId: number | null
    isPopular: boolean
    headerVariant?: PrivateVariant | null
    headerIconId?: number | null
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
    headerVariantId: number
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
