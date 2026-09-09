export interface PromocodeUsage {
	id: number
	promoCodeId: number
	userId: number
	bookingId: number | null
	usedAt: string
	discountValue: number | null
	createdAt: string
	updatedAt: string
}

export interface CreatePromocodeUsageDto {
	promoCodeId: number
	userId: number
	bookingId?: number
	discountValue?: number
	usedAt?: string
}

export interface UpdatePromocodeUsageDto {
	id: number
	dto: Partial<CreatePromocodeUsageDto>
}
