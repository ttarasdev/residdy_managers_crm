export enum PartnerStatus {
	PENDING = 'pending',
	ACTIVE = 'active',
	BLOCKED = 'blocked',
}

export type PartnerLogo = {
	id: number
	bucket: string
	relPath: string
	originalName: string
	isPopular: boolean
	createdAt: string
	updatedAt: string
	url: string
}

export type Partner = {
	id: number
	companyName: string
	email: string
	logoId: number | null
	phone: string | null
	status: PartnerStatus
	profileCompleted: boolean
	missingFields: string[]
	createdAt: string
	updatedAt: string
	logo: PartnerLogo | null
}

export interface CreatePartnerDto {
	dto: {
		companyName: string
		email: string
		phone?: string
	}
	file?: File | null
}

export type UpdatePartnerDto = {
	id: number
	companyName?: string
	email?: string
	phone?: string
	status?: PartnerStatus
}

export interface UpdatePartnerLogoDto {
	id: number
	file: File
}

export type ResetPartnerPasswordDto = {
	id: number
	password?: string
}

export type QueryPartnerDto = {
	page?: number
	limit?: number
	companyName?: string
	email?: string
	status?: PartnerStatus
}

export type PartnersListResponse = {
	items: Partner[]
	total: number
	page: number
	limit: number
	totalPages: number
}

export type RemovePartnerResponse = {
	success: boolean
}
