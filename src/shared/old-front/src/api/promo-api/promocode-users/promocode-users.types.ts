export interface PromocodeUser {
	id: number
	promoCodeId: number
	userId: number
	isActive: boolean
	createdAt: string
	updatedAt: string
}

export interface CreatePromocodeUserDto {
	promoCodeId: number
	userId: number
	isActive?: boolean
}

export interface UpdatePromocodeUserDto {
	id: number
	dto: Partial<CreatePromocodeUserDto>
}

export interface RemovePromocodeUserByPairDto {
	promoCodeId: number
	userId: number
}
