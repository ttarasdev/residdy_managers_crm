export enum AnalyticsGroup {
    DAY = 'day',
    MONTH = 'month',
}

export interface AnalyticsQuery {
    /** UTC date, inclusive, YYYY-MM-DD. */
    from?: string
    /** UTC date, exclusive, YYYY-MM-DD. Maximum range 366 days. */
    to?: string
    group?: AnalyticsGroup
    page?: number
    limit?: number
    offset?: number
}

export type AnalyticsRow = Record<string, string | number>

export type AnalyticsResult = Record<string, unknown> & {
    from: string
    to: string
    toExclusive: true
    timezone: 'UTC'
    group: AnalyticsGroup
    generatedAt: string
    cacheSeconds: number
}
