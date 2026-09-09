export enum InstructionBlockType {
	TEXT = 'text',
	PHOTO = 'photo',
}

export interface InstructionListValue {
	id: number
	value: string
}

export interface CaseInstructionBlock {
	id: number
	instructionId: number
	type: InstructionBlockType
	variantId?: number
	contentJson?: Record<string, any>
	sortKey: number
	createdAt: string
	updatedAt: string
}

export interface ReorderDirection {
	direction: 'up' | 'down'
}

export type CaseInstructionBlocksResponse = CaseInstructionBlock[]

export interface CreateCaseInstructionBlockDto {
	instructionId: number
	type: InstructionBlockType
	variantId?: number
	contentJson?: Record<string, any>
}

export interface UpdateCaseInstructionBlockDto {
	id: number
	data: Partial<Omit<CreateCaseInstructionBlockDto, 'instructionId'>>
}

export type ReorderCaseInstructionBlockDto = {
	id: number
	dto: ReorderDirection
}
