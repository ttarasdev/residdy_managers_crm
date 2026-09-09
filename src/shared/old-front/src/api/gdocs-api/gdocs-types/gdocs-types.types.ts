import { PublicAsset } from '@/api/media/public-assets/public-assets.types'

export enum GdocTypeStatus {
	ACTIVE = 'active',
	INACTIVE = 'inactive',
}

export interface CreateGdocTypeDto {
	iconId: number
	titleUA: string
	titlePL: string
	titleEN: string
	titleRU: string
	isPopular?: boolean
	status?: GdocTypeStatus
}

export interface GetGdocTypesQueryDto {
	page?: number
	limit?: number
	status?: GdocTypeStatus
	isPopular?: boolean
	search?: string
}

export interface GdocType {
	id: number
	icon: PublicAsset
	iconId: number
	titleUA: string
	titleEN: string
	titlePL: string
	titleRU: string
	isPopular: boolean
	status: GdocTypeStatus
	createdAt: string
	updatedAt: string
}

export interface GdocTypesResponse {
	items: GdocType[]
	total: number
}

export interface UpdateGdocTypeDto {
	iconId?: number
	titleUA?: string
	titlePL?: string
	titleEN?: string
	titleRU?: string
	isPopular?: boolean
	status?: GdocTypeStatus
}

export interface GdocTypeUpdateDto {
	id: number
	dto: UpdateGdocTypeDto
}
