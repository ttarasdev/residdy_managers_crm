import { http } from '../../http'
import type { RequestOptions } from '../../http.types'
import type { PageResponse } from '../../common.types'
import type { PaymentsQuery, PaymentLedgerEntry } from './payment-ledger.types'

const BASE = '/payment-ledger'

export const paymentLedgerApi = {
    /** GET /payment-ledger — roles: admin */
    list: (query: PaymentsQuery = {}, options?: RequestOptions) =>
        http.get<PageResponse<PaymentLedgerEntry>>(BASE, {
            ...options,
            query: { ...query },
        }),
}
