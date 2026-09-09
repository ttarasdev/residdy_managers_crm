import type {
    SubscriptionPlan,
    SubscriptionPlansQuery,
} from '../subscription-plans/subscription-plans.types'

export enum SubscriptionProvider {
    DEV = 'dev',
    APPLE = 'apple',
    GOOGLE = 'google',
}

export enum SubscriptionInterval {
    MONTHLY = 'monthly',
    YEARLY = 'yearly',
}

export type SubscriptionPricesQuery = SubscriptionPlansQuery

export interface CreateSubscriptionPriceDto {
    planId: number
    provider: SubscriptionProvider
    interval: SubscriptionInterval
    productId: string
    basePlanId?: string
}

export interface SubscriptionPrice extends CreateSubscriptionPriceDto {
    id: number
    available: boolean
    plan?: SubscriptionPlan
    basePlanId: string
    createdAt: string
    updatedAt: string
}
