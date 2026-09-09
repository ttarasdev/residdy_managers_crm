import { postJson } from '@/api/http'
import type { MailQueueTickResponse } from './mail-queue.types'
import { MAIL_QUEUE_API_BASE as BASE } from './mail-queue.constants'

export const mailQueueApi = {
	workerTick: () => postJson<MailQueueTickResponse>(`${BASE}/worker/tick`),
}
