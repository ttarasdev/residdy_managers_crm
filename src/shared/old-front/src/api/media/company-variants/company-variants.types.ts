import type { CompanyAsset } from '../company-assets/company-assets.types'

export interface CompanyVariant {
	id: number
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

export interface CompanyVariantJoined {
	id: number
	bucket: string
	originalName: string

	smallAsset: CompanyAsset
	mediumAsset: CompanyAsset
	largeAsset: CompanyAsset

	isPopular: boolean
	createdAt: string
	updatedAt: string
	deletedAt?: string | null
}

export interface CompanyVariantQuery {
	page?: number
	limit?: number
	bucket?: string
	isPopular?: boolean
}

export interface CompanyVariantListResponse {
	items: CompanyVariant[]
	total: number
	page: number
	limit: number
}

export interface CreateCompanyVariantDto {
	bucket: string
	originalName: string
}

export interface ToggleCompanyVariantPopularResponse {
	success: boolean
	isPopular: boolean
}

export interface DeleteCompanyVariantResponse {
	success: boolean
}
