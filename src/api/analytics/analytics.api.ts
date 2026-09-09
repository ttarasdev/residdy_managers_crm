import { http } from '../http'
import type { RequestOptions } from '../http.types'
import type { AnalyticsQuery, AnalyticsResult } from './analytics.types'

const BASE = '/analytics'

export const analyticsApi = {
    /** GET /analytics/overview — roles: admin */
    overview: (query: AnalyticsQuery = {}, options?: RequestOptions) =>
        http.get<AnalyticsResult>(`${BASE}/overview`, {
            ...options,
            query: { ...query },
        }),
    /** GET /analytics/subscriptions — roles: admin */
    subscriptions: (query: AnalyticsQuery = {}, options?: RequestOptions) =>
        http.get<AnalyticsResult>(`${BASE}/subscriptions`, {
            ...options,
            query: { ...query },
        }),
    /** GET /analytics/consultations — roles: admin */
    consultations: (query: AnalyticsQuery = {}, options?: RequestOptions) =>
        http.get<AnalyticsResult>(`${BASE}/consultations`, {
            ...options,
            query: { ...query },
        }),
    /** GET /analytics/usage — roles: admin */
    usage: (query: AnalyticsQuery = {}, options?: RequestOptions) =>
        http.get<AnalyticsResult>(`${BASE}/usage`, {
            ...options,
            query: { ...query },
        }),
    /** GET /analytics/revenue — roles: admin */
    revenue: (query: AnalyticsQuery = {}, options?: RequestOptions) =>
        http.get<AnalyticsResult>(`${BASE}/revenue`, {
            ...options,
            query: { ...query },
        }),
}
