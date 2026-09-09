import { Languages } from '@/shared/types-enums/lans'

export enum UserStatus {
	ACTIVE = 'active',
	PENDING = 'pending',
	BLOCKED = 'blocked',
}

export type UserLevel = number

export interface User {
	id: number
	parentId: number | null
	name: string | null
	surname: string | null
	email: string
	phone: string | null
	location: string | null
	status: UserStatus
	language: Languages
	avatar: number | null
	profileCompletedAt: Date | null
	level: number
	createdAt: string
	updatedAt: string
}

export interface UsersResponse {
	rows: User[]
	count: number
}

export interface CreateUserDto {
	email: string
	passwordHash: string
	parentId?: number
	name?: string
	surname?: string
	phone?: string
	location?: string
	status?: UserStatus
	level?: number
	lan?: Languages
}

export interface QueryUsersDto {
	id?: number
	parentId?: number
	name?: string
	surname?: string
	email?: string
	phone?: string
	location?: string
	status?: UserStatus
	language?: Languages
	level?: number
	limit?: number
	offset?: number
}

export interface BanUserDto {
	userId: number
}
