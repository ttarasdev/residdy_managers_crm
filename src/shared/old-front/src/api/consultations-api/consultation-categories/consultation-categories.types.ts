import { PublicAsset } from '@/api/media/public-assets/public-assets.types'

export type ConsultationCategoryMoveDirection = 'up' | 'down'

export interface CreateConsultationCategoryDto {
	titleUa: string
	titlePl: string
	titleEn: string
	titleRu: string
	assetId: number
}

export interface UpdateConsultationCategoryDto {
	titleUa?: string
	titlePl?: string
	titleEn?: string
	titleRu?: string
	assetId?: number
	isPopular?: boolean
	isActive?: boolean
}

export interface GetConsultationCategoriesQueryDto {
	isActive?: boolean
	isPopular?: boolean
	limit?: number
	offset?: number
}

export interface ConsultationCategory {
	id: number
	titleUa: string
	titlePl: string
	titleEn: string
	titleRu: string
	assetId: number
	isPopular: boolean
	isActive: boolean
	icon: PublicAsset
	createdAt: string
	updatedAt: string
}

export interface ConsultationCategoriesResponse {
	rows: ConsultationCategory[]
	count: number
}

export interface ConsultationCategoryUpdateDto {
	id: number
	dto: UpdateConsultationCategoryDto
}

export interface DeleteConsultationCategoryResponse {
	deleted: true
	id: number
}
