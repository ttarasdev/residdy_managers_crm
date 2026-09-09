import { http } from '../../http'
import type { RequestOptions } from '../../http.types'
import type { PageResponse } from '../../common.types'
import type {
    SubscriptionPrice,
    SubscriptionPricesQuery,
    CreateSubscriptionPriceDto,
} from './subscription-prices.types'

const BASE = '/subscription-prices'

export const subscriptionPricesApi = {
    /** GET /subscription-prices */
    list: (query: SubscriptionPricesQuery = {}, options?: RequestOptions) =>
        http.get<PageResponse<SubscriptionPrice>>(BASE, {
            ...options,
            query: { ...query },
        }),
    /** GET /subscription-prices/:id */
    getById: (id: number, options?: RequestOptions) =>
        http.get<SubscriptionPrice>(
            `${BASE}/${encodeURIComponent(String(id))}`,
            options,
        ),
    /** POST /subscription-prices — roles: admin */
    create: (dto: CreateSubscriptionPriceDto, options?: RequestOptions) =>
        http.post<SubscriptionPrice>(BASE, dto, options),
    /** PATCH /subscription-prices/:id/retire — roles: admin */
    retire: (id: number, options?: RequestOptions) =>
        http.patch<SubscriptionPrice>(
            `${BASE}/${encodeURIComponent(String(id))}/retire`,
            undefined,
            options,
        ),
}
