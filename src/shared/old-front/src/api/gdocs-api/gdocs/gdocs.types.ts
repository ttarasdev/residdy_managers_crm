import { PublicAsset } from '@/api/media/public-assets/public-assets.types'
import { GdocType } from '@/api/gdocs-api/gdocs-types/gdocs-types.types'
import { GdocVar } from '@/api/gdocs-api/gdocs-vars/gdocs-vars.types'

export enum GdocTemplateStatus {
	ACTIVE = 'active',
	INACTIVE = 'inactive',
}

export interface CreateGdocDto {
	file: File
	gDocTypeId: number
	iconId: number
	originalFileName: string
	titleUA: string
	titlePL: string
	titleEN: string
	titleRU: string
	status?: GdocTemplateStatus
	variableIds?: number[]
}

export interface UpdateGdocDto {
	file?: File
	gDocTypeId?: number
	iconId?: number
	originalFileName?: string
	titleUA?: string
	titlePL?: string
	titleEN?: string
	titleRU?: string
	status?: GdocTemplateStatus
	variableIds?: number[]
}

export interface GetGdocsQueryDto {
	page?: number
	limit?: number
	gDocTypeId?: number
	status?: GdocTemplateStatus
	search?: string
}

export interface Gdoc {
	id: number
	gDocTypeId: number
	iconId: number
	filePath: string
	originalFileName: string
	titleUA: string
	titleEN: string
	titlePL: string
	titleRU: string
	status: GdocTemplateStatus
	type: GdocType
	icon: PublicAsset
	variables?: GdocVar[]
	createdAt: string
	updatedAt: string
}

export interface GdocsResponse {
	items: Gdoc[]
	total: number
}

export interface GdocUpdateDto {
	id: number
	dto: UpdateGdocDto
}
