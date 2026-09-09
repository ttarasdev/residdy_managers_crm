import { deleteJson, getJson, patchJson, postJson } from '../../http'
import { CASE_INSTRUCTION_BLOCKS_PATH } from './case-instruction-blocks.constants'
import {
	CaseInstructionBlock,
	CaseInstructionBlocksResponse,
	CreateCaseInstructionBlockDto,
	ReorderCaseInstructionBlockDto,
	UpdateCaseInstructionBlockDto,
} from './case-instruction-blocks.types'

export const caseInstructionBlocksApi = {
	getByInstruction: async (
		instructionId: number,
		opts?: { signal?: AbortSignal },
	) => {
		const blocks = await getJson<CaseInstructionBlocksResponse>(
			`${CASE_INSTRUCTION_BLOCKS_PATH}/${instructionId}`,
			opts,
		)

		return blocks.map((b) => ({
			...b,
			contentJson:
				typeof b.contentJson === 'string'
					? JSON.parse(b.contentJson)
					: b.contentJson,
		}))
	},

	create: (dto: CreateCaseInstructionBlockDto) => {
		return postJson<CaseInstructionBlock>(CASE_INSTRUCTION_BLOCKS_PATH, dto)
	},

	update: (dto: UpdateCaseInstructionBlockDto) => {
		const { id, ...data } = dto
		return patchJson<CaseInstructionBlock>(
			`${CASE_INSTRUCTION_BLOCKS_PATH}/${id}`,
			dto,
		)
	},

	remove: (id: number) => {
		return deleteJson<{ success: boolean }>(
			`${CASE_INSTRUCTION_BLOCKS_PATH}/${id}`,
		)
	},

	reorder: ({ id, dto }: ReorderCaseInstructionBlockDto) => {
		return patchJson<CaseInstructionBlock[]>(
			`${CASE_INSTRUCTION_BLOCKS_PATH}/${id}/reorder`,
			dto,
		)
	},
}
