import { getJson } from '@/api/http'
import type { MailAccount, MailAccountPublicConfig } from './mail-accounts.types'
import { MAIL_ACCOUNTS_API_BASE as BASE } from './mail-accounts.constants'

export const mailAccountsApi = {
	list: () => getJson<MailAccount[]>(BASE),

	get: (args: { account: MailAccount }) =>
		getJson<MailAccountPublicConfig>(`${BASE}/${args.account}`),
}
