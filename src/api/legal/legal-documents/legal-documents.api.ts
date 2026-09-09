import { http } from '../../http'
import type { PageResponse } from '../../common.types'
import type { RequestOptions } from '../../http.types'
import type {
    LegalDocument,
    LegalDocumentCode,
    LegalDocumentsQuery,
} from './legal-documents.types'

const BASE = '/legal-documents'

export const legalDocumentsApi = {
    /** GET /legal-documents */
    list: (query: LegalDocumentsQuery = {}, options?: RequestOptions) =>
        http.get<PageResponse<LegalDocument>>(BASE, {
            ...options,
            auth: false,
            query: { ...query },
        }),
    /** GET /legal-documents/:code */
    getById: (code: LegalDocumentCode, options?: RequestOptions) =>
        http.get<LegalDocument>(`${BASE}/${encodeURIComponent(code)}`, {
            ...options,
            auth: false,
        }),
    /** GET /legal-documents/versions/:versionId/file */
    download: (versionId: number, options?: RequestOptions) =>
        http.getBlob(
            `${BASE}/versions/${encodeURIComponent(String(versionId))}/file`,
            { ...options, auth: false },
        ),
}
