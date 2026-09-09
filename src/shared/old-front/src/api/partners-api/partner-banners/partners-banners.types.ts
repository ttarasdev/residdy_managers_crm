export enum PartnerBannerType {
	BIG = 'big',
	SMALL = 'small',
}

export enum PartnerBannerStatus {
	DRAFT = 'draft',
	PENDING_REVIEW = 'pending_review',
	APPROVED = 'approved',
	REJECTED = 'rejected',
	ACTIVE = 'active',
	FINISHED = 'finished',
}

export type PartnerBannerPhoto = {
	id: number
	bucket: string
	relPath: string
	originalName: string
	isPopular: boolean
	createdAt: string
	updatedAt: string
	url: string
}

export type PartnerBanner = {
	id: number
	partnerId: number
	type: PartnerBannerType
	photoId: number | null
	titleUa: string
	titleEn: string
	titlePl: string
	titleRu: string
	subtitleUa: string
	subtitleEn: string
	subtitlePl: string
	subtitleRu: string
	linkUrl: string
	status: PartnerBannerStatus
	startDate: string | null
	endDate: string | null
	viewsCount: number
	clicksCount: number
	ctr: number
	maxViews: number | null
	rejectReason: string | null
	createdAt: string
	updatedAt: string
	photo: PartnerBannerPhoto | null
}

export type QueryPartnerBannerDto = {
	page?: number
	limit?: number
	partnerId?: number
	type?: PartnerBannerType
	status?: PartnerBannerStatus
}

export type PartnersBannersListResponse = {
	items: PartnerBanner[]
	total: number
	page: number
	limit: number
	totalPages: number
}

export type RejectPartnerBannerDto = {
	rejectReason: string
}

export type AddBannerImpressionsDto = {
	ids: number[]
}

export type SuccessResponse = {
	success: boolean
}
