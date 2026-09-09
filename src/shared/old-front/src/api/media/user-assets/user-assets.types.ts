export interface UserAsset {
	id: number
	ownerId: number
	bucket: string
	relPath: string
	originalName: string
	isPopular: boolean
	createdAt: string
	updatedAt: string
}

export interface UserAssetQuery {
	page?: number
	limit?: number
	bucket?: string
	isPopular?: boolean
}

export interface UserAssetListResponse {
	items: UserAsset[]
	total: number
	page: number
	limit: number
}

export interface CreateUserAssetDto {
	bucket: string
	originalName: string
}

export interface UserAssetSignedUrlResponse {
	url: string
}

export interface ToggleUserAssetPopularResponse {
	success: boolean
	isPopular: boolean
}

export interface DeleteUserAssetResponse {
	success: boolean
}

export interface UserAssetSignedUrlResponse {
	url: string
}
