import type { Account } from '../../accounts/accounts/accounts.types'

export interface Promocode {
    id: number
    code: string
    productType: ProductType
    type: PromocodeType
    value: string
    currency: string | null
    status: PromocodeStatus
    startsAt: string | null
    expiresAt: string | null
    maxRedemptions: number | null
    perAccountLimit: number | null
    restrictedAccounts: boolean
    notes: string | null
    createdAt: string
    updatedAt: string
}

export enum ProductType {
    CONSULTATION = 'consultation',
}

export enum PromocodeType {
    PERCENT = 'percent',
    AMOUNT = 'amount',
}

export enum PromocodeStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    EXPIRED = 'expired',
}

export interface CreatePromocodeDto {
    code: string
    productType: ProductType
    type: PromocodeType
    value: number
    currency?: string
    status?: PromocodeStatus
    startsAt?: string
    expiresAt?: string
    maxRedemptions?: number
    perAccountLimit?: number
    restrictedAccounts?: boolean
    notes?: string
}

export interface PromocodesQuery {
    page?: number
    limit?: number
    offset?: number
    code?: string
    productType?: ProductType
    status?: PromocodeStatus
}

export type UpdatePromocodeDto = Partial<
    Omit<CreatePromocodeDto, 'productType'>
>

export interface SetPromocodeAccountsDto {
    accountIds: number[]
}

export interface PromocodeHistoryQuery {
    page?: number
    limit?: number
    offset?: number
    accountId?: number
}

export interface PromocodeAccount {
    id: number
    promocodeId: number
    promocode?: Promocode | null
    accountId: number
    account?: Account | null
    isActive: boolean
    createdAt: string
    updatedAt: string
}

export interface PromocodeUsage {
    id: number
    promocodeId: number
    promocode?: Promocode | null
    accountId: number
    account?: Account | null
    productType: ProductType
    productReferenceId: number
    discount: string
    status: PromocodeUsageStatus
    createdAt: string
    updatedAt: string
}

export enum PromocodeUsageStatus {
    RESERVED = 'reserved',
    REDEEMED = 'redeemed',
    RELEASED = 'released',
}

export interface SetPromocodeAccountsResponse {
    promocodeId: number
    accountIds: number[]
    restrictedAccounts: true
}
