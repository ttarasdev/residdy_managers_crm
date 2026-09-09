import type { PageResponse } from '../../common.types'
import type { RequestOptions } from '../../http.types'
import type {
    ConsultationBooking,
    ConsultationBookingsQuery,
} from './consultation-bookings.types'
import { http } from '../../http'

const BASE = '/consultation-bookings'

export const consultationBookingsApi = {
    /** POST /consultation-bookings/:id/retry-operations — roles: admin */
    retryOperations: (id: number, options?: RequestOptions) =>
        http.post<ConsultationBooking>(
            `${BASE}/${encodeURIComponent(String(id))}/retry-operations`,
            undefined,
            options,
        ),

    /** PATCH /consultation-bookings/:id/cancel-by-admin — roles: admin */
    cancelByAdmin: (id: number, options?: RequestOptions) =>
        http.patch<ConsultationBooking>(
            `${BASE}/${encodeURIComponent(String(id))}/cancel-by-admin`,
            undefined,
            options,
        ),

    /** GET /consultation-bookings — roles: admin, manager */
    list: (query: ConsultationBookingsQuery = {}, options?: RequestOptions) =>
        http.get<PageResponse<ConsultationBooking>>(`${BASE}`, {
            ...options,
            query: { ...query },
        }),

    /** GET /consultation-bookings/:id — roles: admin, manager */
    getById: (id: number, options?: RequestOptions) =>
        http.get<ConsultationBooking>(
            `${BASE}/${encodeURIComponent(String(id))}`,
            {
                ...options,
            },
        ),

    /** GET /consultation-bookings/:id/file — roles: admin, manager */
    download: (id: number, options?: RequestOptions) =>
        http.getBlob(`${BASE}/${encodeURIComponent(String(id))}/file`, {
            ...options,
        }),
}
