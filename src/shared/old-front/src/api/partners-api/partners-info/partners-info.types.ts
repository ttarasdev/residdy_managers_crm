export type PartnerInfoPhoto = {
	id: number
	bucket: string
	relPath: string
	originalName: string
	isPopular: boolean
	createdAt: string
	updatedAt: string
	url: string
}

export type PartnerInfo = {
	id: number
	partnerId: number
	mainPhotoId: number | null
	websiteUrl: string
	shortDescriptionUa: string
	shortDescriptionEn: string
	shortDescriptionPl: string
	shortDescriptionRu: string
	descriptionUa: string
	descriptionEn: string
	descriptionPl: string
	descriptionRu: string
	instagramUrl?: string | null
	facebookUrl?: string | null
	tiktokUrl?: string | null
	linkedinUrl?: string | null
	youtubeUrl?: string | null
	telegramUrl?: string | null
	createdAt: string
	updatedAt: string
	mainPhoto: PartnerInfoPhoto | null
}

export type UpdatePartnerInfoDto = {
	id: number
	websiteUrl?: string
	shortDescriptionUa?: string
	shortDescriptionEn?: string
	shortDescriptionPl?: string
	shortDescriptionRu?: string
	descriptionUa?: string
	descriptionEn?: string
	descriptionPl?: string
	descriptionRu?: string
	instagramUrl?: string
	facebookUrl?: string
	tiktokUrl?: string
	linkedinUrl?: string
	youtubeUrl?: string
	telegramUrl?: string
}

export interface UpdatePartnerPhotoDto {
	id: number
	file: File
}

export type RemovePartnerInfoResponse = {
	success: boolean
}
