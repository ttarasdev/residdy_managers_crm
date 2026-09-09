import type { PublicBucket } from '../files/files.types'

export interface PublicAsset {
    id: number
    bucket: PublicBucket
    relPath: string
    originalName: string
    isPopular: boolean
    createdByAccountId: number | null
    url: string
    createdAt: string
    updatedAt: string
}

export interface CreatePublicAssetDto {
    bucket: Exclude<PublicBucket, PublicBucket.LEGAL_DOCUMENTS>
    originalName: string
}

export interface PublicAssetsQuery {
    bucket?: PublicBucket
    page?: number
    limit?: number
    offset?: number
    isPopular?: boolean
}

export interface PublicAssetUploadResponse {
    asset: PublicAsset
}
