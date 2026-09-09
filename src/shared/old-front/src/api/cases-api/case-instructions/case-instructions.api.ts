import { deleteJson, getJson, patchJson, postJson } from '../../http'
import { CASE_INSTRUCTIONS_API } from './case-instructions.constants'
import {
	CaseInstruction,
	CaseInstructionWithBlocks,
	CaseInstructionsResponse,
	CreateCaseInstructionDto,
	QueryCaseInstructionsDto,
	UpdateCaseInstructionDto,
} from './case-instructions.types'

export const caseInstructionsApi = {
	getAll: (
		query?: QueryCaseInstructionsDto,
		opts?: { signal?: AbortSignal },
	) => {
		const params = query
			? `?${new URLSearchParams(query as any).toString()}`
			: ''

		return getJson<CaseInstructionsResponse>(
			`${CASE_INSTRUCTIONS_API}${params}`,
			opts,
		)
	},

	getOne: (id: number, opts?: { signal?: AbortSignal }) => {
		return getJson<CaseInstructionWithBlocks>(
			`${CASE_INSTRUCTIONS_API}/${id}`,
			opts,
		)
	},

	create: (dto: CreateCaseInstructionDto) => {
		return postJson<CaseInstruction>(CASE_INSTRUCTIONS_API, dto)
	},

	update: ({ id, dto }: UpdateCaseInstructionDto) => {
		return patchJson<CaseInstruction>(`${CASE_INSTRUCTIONS_API}/${id}`, dto)
	},

	remove: (id: number) => {
		return deleteJson<{ success: boolean }>(
			`${CASE_INSTRUCTIONS_API}/${id}`,
		)
	},
}
