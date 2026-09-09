export enum PromocodeType {
	PERCENT = 'percent',
	AMOUNT = 'amount',
}

export enum PromocodeStatus {
	ACTIVE = 'active',
	INACTIVE = 'inactive',
	EXPIRED = 'expired',
}

export enum ProductType {
	CONSULTATION = 'consultation',
	SUBSCRIPTION = 'subscription',
	COURSE = 'course',
	ADVERTISING = 'advertising',
}

export interface Promocode {
	id: number
	code: string
	type: PromocodeType
	value: number
	status: PromocodeStatus
	productType: ProductType
	startsAt: string | null
	expiresAt: string | null
	maxRedemptions: number | null
	perUserLimit: number | null
	specialistId: number | null
	notes: string | null
	createdAt: string
	updatedAt: string
}

export interface PromocodesResponse {
	rows: Promocode[]
	count: number
}

export interface CreatePromocodeDto {
	code: string
	type: PromocodeType
	value: number
	productType: ProductType
	status?: PromocodeStatus
	startsAt?: string | null
	expiresAt?: string | null
	maxRedemptions?: number | null
	perUserLimit?: number | null
	specialistId?: number | null
	notes?: string | null
}

export interface UpdatePromocodeDto {
	id: number
	dto: Partial<CreatePromocodeDto>
}

export interface QueryPromocodesDto {
	id?: number
	code?: string
	type?: PromocodeType
	status?: PromocodeStatus
	productType?: ProductType
	specialistId?: number
	startsAtFrom?: string
	startsAtTo?: string
	expiresAtFrom?: string
	expiresAtTo?: string
	limit?: number
	offset?: number
}

export interface EvaluatePromocodeDto {
	code: string
	amount: number
	productType: ProductType
	specialistId?: number
}

export interface RedeemPromocodeDto {
	code: string
	amount: number
	productType: ProductType
	bookingId?: number
	specialistId?: number
}

export type EvaluatePromocodeFailReason =
	| 'invalid_code'
	| 'inactive'
	| 'not_started'
	| 'expired'
	| 'specialist_mismatch'
	| 'product_type_mismatch'
	| 'not_allowed_user'
	| 'max_redemptions'
	| 'per_user_limit'
	| 'invalid_amount'

export type EvaluatePromocodeResult =
	| { ok: true; discount: number; finalAmount: number; promo: Promocode }
	| { ok: false; reason: EvaluatePromocodeFailReason }

export interface RedeemPromocodeResult {
	code: string
	discount: number
	finalAmount: number
	usageId: number
}
