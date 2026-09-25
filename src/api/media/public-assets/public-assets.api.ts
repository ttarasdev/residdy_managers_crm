import type {
    PageResponse,
    SuccessResponse,
    TogglePopularResponse,
} from '../../common.types'
import type { RequestOptions } from '../../http.types'
import type {
    CreatePublicAssetDto,
    PublicAsset,
    PublicAssetUploadResponse,
    PublicAssetsQuery,
} from './public-assets.types'
import { http, toFormData } from '../../http'

const BASE = '/public-assets'

export const publicAssetsApi = {
    /** POST /public-assets — roles: admin, manager, writer */
    create: (dto: CreatePublicAssetDto, file: File, options?: RequestOptions) =>
        http.post<PublicAssetUploadResponse>(`${BASE}`, toFormData(dto, file), {
            ...options,
        }),

    /** GET /public-assets */
    list: (query: PublicAssetsQuery = {}, options?: RequestOptions) =>
        http.get<PageResponse<PublicAsset>>(`${BASE}`, {
            ...options,
            query: { ...query },
            auth: false,
        }),

    /** GET /public-assets/:id */
    getById: (id: number, options?: RequestOptions) =>
        http.get<PublicAsset>(`${BASE}/${encodeURIComponent(String(id))}`, {
            ...options,
            auth: false,
        }),

    /** DELETE /public-assets/:id — roles: admin, manager, writer; author or admin */
    remove: (id: number, options?: RequestOptions) =>
        http.delete<SuccessResponse>(
            `${BASE}/${encodeURIComponent(String(id))}`,
            {
                ...options,
            },
        ),

    /** PATCH /public-assets/:id/toggle-popular — roles: admin, manager, writer; author or admin */
    togglePopular: (id: number, options?: RequestOptions) =>
        http.patch<TogglePopularResponse>(
            `${BASE}/${encodeURIComponent(String(id))}/toggle-popular`,
            undefined,
            { ...options },
        ),
}
