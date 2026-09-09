import type { RequestOptions } from '../../http.types'
import type { SendMailDto, SendMailResponse } from './mail.types'
import { http } from '../../http'

const BASE = '/mail'

export const mailApi = {
    /** POST /mail/send — roles: writer */
    send: (dto: SendMailDto, options?: RequestOptions) =>
        http.post<SendMailResponse>(`${BASE}/send`, dto, { ...options }),
}
