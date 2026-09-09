import { PUBLIC_BUCKETS } from '@/shared/types-enums/buckets'

export interface PublicAsset {
	id: number
	bucket: string
	relPath: string
	originalName: string
	isPopular: boolean
	createdAt: string
	updatedAt: string
	url: string
}

export interface PublicAssetQuery {
	page?: number
	limit?: number
	bucket?: PUBLIC_BUCKETS
	isPopular?: boolean
}

export interface PublicAssetListResponse {
	rows: PublicAsset[]
	total: number
	page: number
	limit: number
}

export interface CreatePublicAssetDto {
	bucket: string
	originalName: string
}

export interface TogglePublicAssetPopularResponse {
	success: boolean
	isPopular: boolean
}

export interface DeletePublicAssetResponse {
	success: boolean
}
