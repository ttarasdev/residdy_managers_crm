import type { UserAsset } from '../user-assets/user-assets.types'

export interface UserVariant {
	id: number
	ownerId: number
	bucket: string
	originalName: string
	smallAssetId: number
	mediumAssetId: number
	largeAssetId: number
	isPopular: boolean
	createdAt: string
	updatedAt: string
	deletedAt?: string | null
}

export interface UserVariantJoined {
	id: number
	ownerId: number
	bucket: string
	originalName: string

	smallAsset: UserAsset
	mediumAsset: UserAsset
	largeAsset: UserAsset

	isPopular: boolean
	createdAt: string
	updatedAt: string
	deletedAt?: string | null
}

export interface UserVariantQuery {
	page?: number
	limit?: number
	bucket?: string
	isPopular?: boolean
}

export interface UserVariantListResponse {
	items: UserVariant[]
	total: number
	page: number
	limit: number
}

export interface CreateUserVariantDto {
	bucket: string
	originalName: string
}

export interface ToggleUserVariantPopularResponse {
	success: boolean
	isPopular: boolean
}

export interface DeleteUserVariantResponse {
	success: boolean
}
