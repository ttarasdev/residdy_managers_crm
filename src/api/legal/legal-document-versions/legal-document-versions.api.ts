import { http, toFormData } from '../../http'
import type { PageResponse } from '../../common.types'
import type { RequestOptions } from '../../http.types'
import type { LegalDocumentCode } from '../legal-documents/legal-documents.types'
import type {
    CreateLegalVersionDto,
    LegalDocumentVersion,
    LegalVersionsQuery,
} from './legal-document-versions.types'

const BASE = '/legal-document-versions'

export const legalDocumentVersionsApi = {
    /** GET /legal-document-versions/:code — roles: admin */
    list: (
        code: LegalDocumentCode,
        query: LegalVersionsQuery = {},
        options?: RequestOptions,
    ) =>
        http.get<PageResponse<LegalDocumentVersion>>(
            `${BASE}/${encodeURIComponent(code)}`,
            { ...options, query: { ...query } },
        ),
    /** POST /legal-document-versions/:code — roles: admin */
    create: (
        code: LegalDocumentCode,
        dto: CreateLegalVersionDto,
        file: File,
        options?: RequestOptions,
    ) =>
        http.post<LegalDocumentVersion>(
            `${BASE}/${encodeURIComponent(code)}`,
            toFormData(dto, file),
            options,
        ),
    /** POST /legal-document-versions/:id/publish — roles: admin */
    publish: (id: number, options?: RequestOptions) =>
        http.post<LegalDocumentVersion>(
            `${BASE}/${encodeURIComponent(String(id))}/publish`,
            undefined,
            options,
        ),
    /** GET /legal-document-versions/:id/draft — roles: admin */
    downloadDraft: (id: number, options?: RequestOptions) =>
        http.getBlob(
            `${BASE}/${encodeURIComponent(String(id))}/draft`,
            options,
        ),
}
