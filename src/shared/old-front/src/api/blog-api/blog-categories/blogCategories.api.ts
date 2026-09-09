import { getJson, postJson, patchJson, deleteJson } from '@/api/http'
import {
	BlogCategoriesListResponse,
	BlogCategoriesQuery,
	BlogCategory,
	CreateBlogCategoryDto,
	ReorderBlogCategoriesDto,
	UpdateBlogCategoryDto,
} from './blogCategories.types'
import { BLOG_CATEGORIES_API_BASE as BASE } from './blogCategories.constants'

export const blogCategoriesApi = {
	list: (params?: BlogCategoriesQuery) => {
		const query = params
			? new URLSearchParams(params as any).toString()
			: ''

		return getJson<BlogCategoriesListResponse>(
			`${BASE}${query ? `?${query}` : ''}`,
		)
	},
	getById: (id: number, opts?: { signal?: AbortSignal }) =>
		getJson<BlogCategory>(`${BASE}/${id}`, opts),

	create: (dto: CreateBlogCategoryDto) => postJson<BlogCategory>(BASE, dto),

	update: ({ id, dto }: UpdateBlogCategoryDto) =>
		patchJson<BlogCategory>(`${BASE}/${id}`, dto),

	reorder: ({ id, direction }: ReorderBlogCategoriesDto) =>
		patchJson<BlogCategory[]>(`${BASE}/${id}/reorder`, { direction }),

	remove: (id: number) => deleteJson<{ success: boolean }>(`${BASE}/${id}`),
}
