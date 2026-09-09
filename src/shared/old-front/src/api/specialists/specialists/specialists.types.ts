import { Languages } from '@/shared/types-enums/lans'

export enum SpecialistStatus {
	ACTIVE = 'active',
	BLOCKED = 'blocked',
}

export interface SpecialistInfo {
	id: number
	specialistId: number
	title: string | null
	about: string | null
	languages: Languages[] | null
	specialization: string | null
	experienceYears: number | null
	education: string | null
	certificates: string[] | null
	servicesSummary: string | null
	socialLinks: Record<string, string> | null
	website: string | null
	createdAt: string
	updatedAt: string
}

export interface Specialist {
	id: number
	email: string
	status: SpecialistStatus
	name: string | null
	surname: string | null
	location: string | null
	phone: string | null
	avatarId: number | null
	verified: boolean
	rating: number | null
	createdAt: string
	updatedAt: string
}

export interface SpecialistWithInfo extends Specialist {
	info: SpecialistInfo | null
}

export interface SpecialistsResponse {
	rows: Specialist[]
	count: number
}

export interface CreateSpecialistDto {
	email: string
}

export interface QuerySpecialistsDto {
	status?: SpecialistStatus
	phone?: string
	name?: string
	surname?: string
	email?: string
	location?: string
	limit?: number
	offset?: number
}

export interface UpdateSpecialistDto {
	name?: string
	surname?: string
	location?: string
	phone: string
}

export interface ChangeSpecialistStatusResponse {
	message: string
}
