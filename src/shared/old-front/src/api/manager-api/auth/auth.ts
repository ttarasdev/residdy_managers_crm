import { postJson } from '@/api/http'
import { AUTH_API_BASE } from './auth.constants'
import { CreateManagerDto } from '../manager/manager.types'
import { AuthResponse, LoginRequest } from './auth.models'

export const authApi = {
	login: (dto: LoginRequest) =>
		postJson<AuthResponse>(`${AUTH_API_BASE}/login`, dto, {
			skipAuth: true,
		}),

	register: (dto: CreateManagerDto) =>
		postJson<AuthResponse>(`${AUTH_API_BASE}/register`, dto),

	check: () => postJson<{ valid: boolean }>(`${AUTH_API_BASE}/check`),
}
