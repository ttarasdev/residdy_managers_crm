import type { PageResponse, SuccessResponse } from '../../common.types'
import type { RequestOptions } from '../../http.types'
import type {
    BlogPost,
    BlogPostsQuery,
    CreateBlogPostDto,
    ScheduleBlogPostDto,
    UpdateBlogPostDto,
} from './blog-posts.types'
import { http } from '../../http'

const BASE = '/blog-posts'

export const blogPostsApi = {
    /** GET /blog-posts */
    list: (query: BlogPostsQuery = {}, options?: RequestOptions) =>
        http.get<PageResponse<BlogPost>>(`${BASE}`, {
            ...options,
            query: { ...query },
        }),

    /** GET /blog-posts/:id */
    getById: (id: number, options?: RequestOptions) =>
        http.get<BlogPost>(`${BASE}/${encodeURIComponent(String(id))}`, {
            ...options,
        }),

    /** POST /blog-posts — roles: admin */
    create: (dto: CreateBlogPostDto, options?: RequestOptions) =>
        http.post<BlogPost>(`${BASE}`, dto, { ...options }),

    /** PATCH /blog-posts/:id — roles: admin */
    update: (id: number, dto: UpdateBlogPostDto, options?: RequestOptions) =>
        http.patch<BlogPost>(`${BASE}/${encodeURIComponent(String(id))}`, dto, {
            ...options,
        }),

    /** DELETE /blog-posts/:id — roles: admin */
    remove: (id: number, options?: RequestOptions) =>
        http.delete<SuccessResponse>(
            `${BASE}/${encodeURIComponent(String(id))}`,
            {
                ...options,
            },
        ),

    /** POST /blog-posts/:id/schedule — roles: admin */
    schedule: (
        id: number,
        dto: ScheduleBlogPostDto,
        options?: RequestOptions,
    ) =>
        http.post<BlogPost>(
            `${BASE}/${encodeURIComponent(String(id))}/schedule`,
            dto,
            { ...options },
        ),
}
