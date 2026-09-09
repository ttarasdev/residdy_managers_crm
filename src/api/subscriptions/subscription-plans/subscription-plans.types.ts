export interface SubscriptionPlansQuery {
    page?: number
    limit?: number
    offset?: number
}

export interface CreateSubscriptionPlanDto {
    code: string
    name: string
    rank: number
    /** -1 means unlimited. */
    documentsPerMonth: number
    /** -1 means unlimited. */
    openCases: number
    consultationDiscountPercent: number
    /** Calendar months; -1 means unlimited, zero is not allowed. */
    retentionMonths: number
}

export interface SubscriptionPlan extends CreateSubscriptionPlanDto {
    id: number
    version: number
    available: boolean
    createdAt: string
    updatedAt: string
}

export interface TrialSettingsDto {
    planId: number
    days: number
    enabled: boolean
}

export interface SubscriptionTrialSettings extends TrialSettingsDto {
    id: number
    createdAt: string
    updatedAt: string
}
