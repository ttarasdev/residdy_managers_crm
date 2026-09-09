import type { RequestOptions } from '../../http.types'
import type { MailQueueTickResult } from './mail-queue.types'
import { http } from '../../http'

const BASE = '/mail-queue'

export const mailQueueApi = {
    /** POST /mail-queue/worker/tick — roles: writer */
    tick: (options?: RequestOptions) =>
        http.post<MailQueueTickResult>(`${BASE}/worker/tick`, undefined, {
            ...options,
        }),
}
