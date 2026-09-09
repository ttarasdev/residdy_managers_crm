import type {
    SignedUrlResponse,
    SuccessResponse,
    TogglePopularResponse,
} from '../../common.types'
import type { RequestOptions } from '../../http.types'
import type {
    CreatePrivateAssetDto,
    PrivateAsset,
} from './private-assets.types'
import { http, toFormData } from '../../http'

const BASE = '/private-assets'

export const privateAssetsApi = {
    /** POST /private-assets */
    create: (
        dto: CreatePrivateAssetDto,
        file: File,
        options?: RequestOptions,
    ) =>
        http.post<PrivateAsset>(`${BASE}`, toFormData(dto, file), {
            ...options,
        }),

    /** GET /private-assets/:id */
    getById: (id: number, options?: RequestOptions) =>
        http.get<PrivateAsset>(`${BASE}/${encodeURIComponent(String(id))}`, {
            ...options,
        }),

    /** DELETE /private-assets/:id */
    remove: (id: number, options?: RequestOptions) =>
        http.delete<SuccessResponse>(
            `${BASE}/${encodeURIComponent(String(id))}`,
            {
                ...options,
            },
        ),

    /** PATCH /private-assets/:id/toggle-popular */
    togglePopular: (id: number, options?: RequestOptions) =>
        http.patch<TogglePopularResponse>(
            `${BASE}/${encodeURIComponent(String(id))}/toggle-popular`,
            undefined,
            { ...options },
        ),

    /** GET /private-assets/:id/url */
    getUrl: (id: number, options?: RequestOptions) =>
        http.get<SignedUrlResponse>(
            `${BASE}/${encodeURIComponent(String(id))}/url`,
            { ...options },
        ),

    /** GET /private-assets/:id/file */
    download: (id: number, options?: RequestOptions) =>
        http.getBlob(`${BASE}/${encodeURIComponent(String(id))}/file`, {
            ...options,
        }),
}
