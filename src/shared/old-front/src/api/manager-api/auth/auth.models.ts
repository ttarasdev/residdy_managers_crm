import { ROLE_NAMES } from './auth.types'

export interface LoginRequest {
	login: string
	password: string
}

export interface AuthResponse {
	token: string
}

export interface Role {
	id: number
	name: ROLE_NAMES
}

export interface TokenPayload {
	email: string
	id: number
	roles: Role[]
	iat: number
	exp: number
}
