export interface CompanyAsset {
	id: number
	bucket: string
	relPath: string
	originalName: string
	isPopular: boolean
	createdAt: string
	updatedAt: string
}

export interface CompanyAssetQuery {
	page?: number
	limit?: number
	bucket?: string
	isPopular?: boolean
}

export interface CompanyAssetListResponse {
	items: CompanyAsset[]
	total: number
	page: number
	limit: number
}

export interface CreateCompanyAssetDto {
	bucket: string
	originalName: string
}

export interface CompanyAssetSignedUrlResponse {
	url: string
}

export interface ToggleCompanyAssetPopularResponse {
	success: boolean
	isPopular: boolean
}

export interface DeleteCompanyAssetResponse {
	success: boolean
}
