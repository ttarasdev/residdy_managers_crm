import type { RequestOptions } from '../../http.types'
import type { PrivateBucket, PrivateFileQuery } from './files.types'
import { http } from '../../http'

const BASE = '/files'

export const filesApi = {
    /** GET /files/private/:bucket/*relPath */
    download: (
        bucket: PrivateBucket,
        relPath: string[],
        query: PrivateFileQuery,
        options?: RequestOptions,
    ) =>
        http.getBlob(
            `${BASE}/private/${encodeURIComponent(String(bucket))}/${relPath.map(encodeURIComponent).join('/')}`,
            { ...options, query: { ...query } },
        ),
}
