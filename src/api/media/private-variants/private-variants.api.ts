import type { PageResponse } from '../../common.types'
import type { PrivateMediaQuery } from '../private-assets/private-assets.types'
import type { SuccessResponse, TogglePopularResponse } from '../../common.types'
import type { RequestOptions } from '../../http.types'
import type {
    CreatePrivateVariantDto,
    PrivateVariant,
} from './private-variants.types'
import { http, toFormData } from '../../http'

const BASE = '/private-variants'

export const privateVariantsApi = {
    /** GET /private-variants — manager profile */
    list: (query: PrivateMediaQuery = {}, options?: RequestOptions) =>
        http.get<PageResponse<PrivateVariant>>(BASE, {
            ...options,
            query: { ...query },
        }),

    /** POST /private-variants */
    create: (
        dto: CreatePrivateVariantDto,
        file: File,
        options?: RequestOptions,
    ) =>
        http.post<PrivateVariant>(`${BASE}`, toFormData(dto, file), {
            ...options,
        }),

    /** GET /private-variants/:id */
    getById: (id: number, options?: RequestOptions) =>
        http.get<PrivateVariant>(`${BASE}/${encodeURIComponent(String(id))}`, {
            ...options,
        }),

    /** DELETE /private-variants/:id */
    remove: (id: number, options?: RequestOptions) =>
        http.delete<SuccessResponse>(
            `${BASE}/${encodeURIComponent(String(id))}`,
            {
                ...options,
            },
        ),

    /** PATCH /private-variants/:id/toggle-popular */
    togglePopular: (id: number, options?: RequestOptions) =>
        http.patch<TogglePopularResponse>(
            `${BASE}/${encodeURIComponent(String(id))}/toggle-popular`,
            undefined,
            { ...options },
        ),
}
