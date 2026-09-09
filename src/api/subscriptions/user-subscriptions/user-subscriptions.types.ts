export enum SubscriptionStatus {
    TRIAL = 'trial',
    ACTIVE = 'active',
    EXPIRED = 'expired',
    REVOKED = 'revoked',
}

export enum SubscriptionAction {
    PURCHASE = 'purchase',
    RENEW = 'renew',
    UPGRADE = 'upgrade',
    SCHEDULE = 'schedule',
    CANCEL = 'cancel',
    RESUME = 'resume',
    EXPIRE = 'expire',
    REVOKE = 'revoke',
}

export interface SimulateSubscriptionDto {
    legalAcceptanceId?: string
    eventId: string
    action: SubscriptionAction
    priceId?: number
    occurredAt?: string
}

export interface UserSubscription {
    id: number
    userId: number
    planId: number
    priceId: number | null
    status: SubscriptionStatus
    periodStart: string
    periodEnd: string
    usageAnchor: string
    trialUsed: boolean
    autoRenew: boolean
    nextPriceId: number | null
    nextChangeAt: string | null
    lastEventAt: string | null
    trialReminderFor: string | null
    trialStartedAt: string | null
    firstPaidAt: string | null
    legalAcceptanceId: string | null
    nextLegalAcceptanceId: string | null
    createdAt: string
    updatedAt: string
}

export interface SubscriptionEvent {
    id: number
    subscriptionId: number
    eventId: string
    action: string
    occurredAt: string
    actorAccountId: number
    fingerprint: string
    snapshot: Record<string, unknown>
    createdAt: string
    updatedAt: string
}

export type SimulateSubscriptionResult =
    | { duplicate: true; event: SubscriptionEvent }
    | {
          duplicate: false
          event: SubscriptionEvent
          subscription: UserSubscription
      }
