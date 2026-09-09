import type { RequestOptions } from '../../http.types'
import type {
    MailAccount,
    PublicMailAccountConfig,
} from './mail-accounts.types'
import { http } from '../../http'

const BASE = '/mail-accounts'

export const mailAccountsApi = {
    /** GET /mail-accounts — roles: writer */
    list: (options?: RequestOptions) =>
        http.get<MailAccount[]>(`${BASE}`, { ...options }),

    /** GET /mail-accounts/:account — roles: writer */
    getById: (account: MailAccount, options?: RequestOptions) =>
        http.get<PublicMailAccountConfig>(
            `${BASE}/${encodeURIComponent(String(account))}`,
            { ...options },
        ),
}
