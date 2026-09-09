import { http } from '../../http'
import type { RequestOptions } from '../../http.types'
import type {
    SimulateSubscriptionDto,
    SimulateSubscriptionResult,
} from './user-subscriptions.types'

const BASE = '/user-subscriptions'

export const userSubscriptionsApi = {
    /** POST /user-subscriptions/dev/:userId/events — roles: admin */
    simulate: (
        userId: number,
        dto: SimulateSubscriptionDto,
        options?: RequestOptions,
    ) =>
        http.post<SimulateSubscriptionResult>(
            `${BASE}/dev/${encodeURIComponent(String(userId))}/events`,
            dto,
            options,
        ),
}
