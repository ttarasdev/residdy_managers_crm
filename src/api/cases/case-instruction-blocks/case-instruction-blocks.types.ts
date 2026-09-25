import type { PrivateVariant } from '../../media/private-variants/private-variants.types'
import type { CaseInstruction } from '../case-instructions/case-instructions.types'

export interface CaseInstructionBlock {
    id: number
    instructionId: number
    contentJson: Record<string, unknown> | null
    type: InstructionBlockType
    sortKey: number
    variantId: number | null
    variant?: PrivateVariant | null
    instruction?: CaseInstruction | null
    createdAt: string
    updatedAt: string
}

export enum InstructionBlockType {
    TEXT = 'text',
    PHOTO = 'photo',
}

export interface CreateCaseInstructionBlockDto {
    instructionId: number
    type: InstructionBlockType
    variantId?: number | null
    contentJson?: Record<string, unknown> | null
}

export interface CaseInstructionBlocksQuery {
    page?: number
    limit?: number
    offset?: number
}

export type UpdateCaseInstructionBlockDto = Partial<
    Omit<CreateCaseInstructionBlockDto, 'instructionId'>
>

export interface ReorderCaseInstructionBlockDto {
    direction: ReorderDirection
}

export enum ReorderDirection {
    UP = 'up',
    DOWN = 'down',
}
