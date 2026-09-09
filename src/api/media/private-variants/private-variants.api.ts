import type { SuccessResponse, TogglePopularResponse } from '../../common.types'
import type { RequestOptions } from '../../http.types'
import type {
    CreatePrivateVariantDto,
    PrivateVariant,
} from './private-variants.types'
import { http, toFormData } from '../../http'

const BASE = '/private-variants'

export const privateVariantsApi = {
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
