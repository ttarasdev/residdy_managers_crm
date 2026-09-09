import type { PageResponse, SuccessResponse } from '../../common.types'
import type { RequestOptions } from '../../http.types'
import type {
    BlogCategoriesQuery,
    BlogCategory,
    CreateBlogCategoryDto,
    ReorderBlogCategoryDto,
    UpdateBlogCategoryDto,
} from './blog-categories.types'
import { http } from '../../http'

const BASE = '/blog-categories'

export const blogCategoriesApi = {
    /** GET /blog-categories */
    list: (query: BlogCategoriesQuery = {}, options?: RequestOptions) =>
        http.get<PageResponse<BlogCategory>>(`${BASE}`, {
            ...options,
            query: { ...query },
        }),

    /** GET /blog-categories/:id */
    getById: (id: number, options?: RequestOptions) =>
        http.get<BlogCategory>(`${BASE}/${encodeURIComponent(String(id))}`, {
            ...options,
        }),

    /** POST /blog-categories — roles: admin */
    create: (dto: CreateBlogCategoryDto, options?: RequestOptions) =>
        http.post<BlogCategory>(`${BASE}`, dto, { ...options }),

    /** PATCH /blog-categories/:id — roles: admin */
    update: (
        id: number,
        dto: UpdateBlogCategoryDto,
        options?: RequestOptions,
    ) =>
        http.patch<BlogCategory>(
            `${BASE}/${encodeURIComponent(String(id))}`,
            dto,
            {
                ...options,
            },
        ),

    /** PATCH /blog-categories/:id/reorder — roles: admin */
    reorder: (
        id: number,
        dto: ReorderBlogCategoryDto,
        options?: RequestOptions,
    ) =>
        http.patch<BlogCategory[]>(
            `${BASE}/${encodeURIComponent(String(id))}/reorder`,
            dto,
            { ...options },
        ),

    /** DELETE /blog-categories/:id — roles: admin */
    remove: (id: number, options?: RequestOptions) =>
        http.delete<SuccessResponse>(
            `${BASE}/${encodeURIComponent(String(id))}`,
            {
                ...options,
            },
        ),
}
