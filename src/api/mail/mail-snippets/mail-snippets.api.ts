import type { PageResponse, SuccessResponse } from '../../common.types'
import type { RequestOptions } from '../../http.types'
import type {
    CreateMailSnippetDto,
    MailSnippet,
    MailSnippetsQuery,
    UpdateMailSnippetDto,
} from './mail-snippets.types'
import { http } from '../../http'

const BASE = '/mail-snippets'

export const mailSnippetsApi = {
    /** POST /mail-snippets — roles: writer */
    create: (dto: CreateMailSnippetDto, options?: RequestOptions) =>
        http.post<MailSnippet>(`${BASE}`, dto, { ...options }),

    /** GET /mail-snippets — roles: writer */
    list: (query: MailSnippetsQuery = {}, options?: RequestOptions) =>
        http.get<PageResponse<MailSnippet>>(`${BASE}`, {
            ...options,
            query: { ...query },
        }),

    /** GET /mail-snippets/:id — roles: writer */
    getById: (id: number, options?: RequestOptions) =>
        http.get<MailSnippet>(`${BASE}/${encodeURIComponent(String(id))}`, {
            ...options,
        }),

    /** PATCH /mail-snippets/:id — roles: writer */
    update: (id: number, dto: UpdateMailSnippetDto, options?: RequestOptions) =>
        http.patch<MailSnippet>(
            `${BASE}/${encodeURIComponent(String(id))}`,
            dto,
            {
                ...options,
            },
        ),

    /** DELETE /mail-snippets/:id — roles: writer */
    remove: (id: number, options?: RequestOptions) =>
        http.delete<SuccessResponse>(
            `${BASE}/${encodeURIComponent(String(id))}`,
            {
                ...options,
            },
        ),
}
