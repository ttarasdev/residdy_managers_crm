import { postJson } from '@/api/http'
import type { SendMailDto, SendMailResponse } from './mail.types'
import { MAIL_API_BASE as BASE } from './mail.constants'

export const mailApi = {
	send: (dto: SendMailDto) => postJson<SendMailResponse>(`${BASE}/send`, dto),
}
