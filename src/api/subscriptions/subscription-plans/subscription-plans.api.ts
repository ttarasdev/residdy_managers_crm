import { http } from '../../http'
import type { RequestOptions } from '../../http.types'
import type { PageResponse } from '../../common.types'
import type {
    SubscriptionPlan,
    SubscriptionPlansQuery,
    CreateSubscriptionPlanDto,
    TrialSettingsDto,
    SubscriptionTrialSettings,
} from './subscription-plans.types'

const BASE = '/subscription-plans'

export const subscriptionPlansApi = {
    /** GET /subscription-plans */
    list: (query: SubscriptionPlansQuery = {}, options?: RequestOptions) =>
        http.get<PageResponse<SubscriptionPlan>>(BASE, {
            ...options,
            query: { ...query },
        }),
    /** GET /subscription-plans/:id */
    getById: (id: number, options?: RequestOptions) =>
        http.get<SubscriptionPlan>(
            `${BASE}/${encodeURIComponent(String(id))}`,
            options,
        ),
    /** POST /subscription-plans — roles: admin */
    create: (dto: CreateSubscriptionPlanDto, options?: RequestOptions) =>
        http.post<SubscriptionPlan>(BASE, dto, options),
    /** PATCH /subscription-plans/:id/retire — roles: admin */
    retire: (id: number, options?: RequestOptions) =>
        http.patch<SubscriptionPlan>(
            `${BASE}/${encodeURIComponent(String(id))}/retire`,
            undefined,
            options,
        ),
    /** GET /subscription-plans/trial-settings — roles: admin */
    trialSettings: (options?: RequestOptions) =>
        http.get<SubscriptionTrialSettings>(`${BASE}/trial-settings`, options),
    /** PATCH /subscription-plans/trial-settings — roles: admin */
    updateTrialSettings: (dto: TrialSettingsDto, options?: RequestOptions) =>
        http.patch<SubscriptionTrialSettings>(
            `${BASE}/trial-settings`,
            dto,
            options,
        ),
}
