import type { AnalyticsQuery } from '../../analytics/analytics.types'

export enum PaymentKind {
    PAYMENT = 'payment',
    REFUND = 'refund',
}

export enum PaymentEnvironment {
    PRODUCTION = 'production',
    SANDBOX = 'sandbox',
}

export enum PaymentProvider {
    APPLE = 'apple',
    GOOGLE = 'google',
    STRIPE = 'stripe',
}

export enum PaymentProduct {
    CONSULTATION = 'consultation',
    SUBSCRIPTION = 'subscription',
}

export interface PaymentsQuery extends AnalyticsQuery {
    environment?: PaymentEnvironment
    kind?: PaymentKind
    product?: PaymentProduct
    provider?: PaymentProvider
    currency?: string
}

export interface PaymentLedgerEntry {
    id: number
    provider: PaymentProvider
    environment: PaymentEnvironment
    externalId: string
    kind: PaymentKind
    accountId: number
    product: PaymentProduct
    productReferenceId: number
    currency: string
    /** Integer in currency minor units; preserve as string to avoid precision loss. */
    amountMinor: string
    occurredAt: string
    paymentId: number | null
    createdAt: string
    updatedAt: string
}
