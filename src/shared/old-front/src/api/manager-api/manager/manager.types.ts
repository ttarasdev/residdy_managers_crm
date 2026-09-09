import { Theme } from '@/shared/types-enums/theme'

export enum ManagerStatus {
	ACTIVE = 'active',
	PENDING = 'pending',
	BLOCKED = 'blocked',
}

export interface ManagerRole {
	id: number
	name: string
}

export interface Manager {
	id: number
	name: string
	surname: string
	email: string
	phone: string
	location: string
	position: string
	status: ManagerStatus
	avatarId: number | null
	theme: Theme
	roles: ManagerRole[]
	createdAt: string
	updatedAt: string
}

export interface CreateManagerDto {
	name: string
	surname: string
	email: string
	phone: string
	location: string
	position: string
	avatarId?: number
	status?: ManagerStatus
	theme?: Theme
	roles: number[]
}

export interface UpdateManagerDto {
	name?: string
	surname?: string
	email?: string
	position?: string
	phone?: string
	location?: string
	theme?: Theme
}

export interface UpdateManagerByAdminDto {
	id: number
	dto: UpdateManagerDto & {
		roles?: number[]
	}
}

export interface BanManagerDto {
	managerId: number
}
