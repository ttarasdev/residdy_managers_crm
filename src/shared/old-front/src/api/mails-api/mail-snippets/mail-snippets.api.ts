import { getJson, postJson, patchJson, deleteJson } from '@/api/http'
import type {
	MailSnippet,
	CreateMailSnippetDto,
	UpdateMailSnippetDto,
	DeleteMailSnippetDto,
	DeleteMailSnippetResponse,
} from './mail-snippets.types'
import { MAIL_SNIPPETS_API_BASE as BASE } from './mail-snippets.constants'

export const mailSnippetsApi = {
	create: (dto: CreateMailSnippetDto) => postJson<MailSnippet>(BASE, dto),

	list: () => getJson<MailSnippet[]>(BASE),

	getById: (args: { id: number }) => getJson<MailSnippet>(`${BASE}/${args.id}`),

	update: (args: UpdateMailSnippetDto) =>
		patchJson<MailSnippet>(`${BASE}/${args.id}`, args.dto),

	remove: (args: DeleteMailSnippetDto) =>
		deleteJson<DeleteMailSnippetResponse>(`${BASE}/${args.id}`),
}
