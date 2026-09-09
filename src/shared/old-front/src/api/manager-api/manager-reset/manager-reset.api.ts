import { postJson } from '@/api/http'
import { MANAGER_RESET_API_BASE } from './manager-reset.constants'
import type {
	ConfirmResetDto,
	OkResponse,
	RequestResetDto,
} from './manager-reset.types'

export const managerResetApi = {
	request: (dto: RequestResetDto) =>
		postJson<OkResponse>(`${MANAGER_RESET_API_BASE}/request`, dto, {
			skipAuth: true,
		}),

	confirm: (dto: ConfirmResetDto) =>
		postJson<OkResponse>(`${MANAGER_RESET_API_BASE}/confirm`, dto, {
			skipAuth: true,
		}),
}
