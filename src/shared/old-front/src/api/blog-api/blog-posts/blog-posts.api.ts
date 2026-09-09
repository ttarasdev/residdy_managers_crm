import { getJson, postJson, patchJson, deleteJson } from '@/api/http'
import type {
	BlogPost,
	BlogPostListResponse,
	CreateBlogPostDto,
	UpdateBlogPostDto,
	ScheduleBlogPostDto,
	BlogPostsQuery,
} from './blog-posts.types'
import { BLOG_POSTS_API_BASE as BASE } from './blog-posts.constants'

export const blogPostsApi = {
	list: (params?: BlogPostsQuery) => {
		const query = params
			? new URLSearchParams(params as any).toString()
			: ''

		return getJson<BlogPostListResponse>(
			`${BASE}${query ? `?${query}` : ''}`,
		)
	},

	getById: async (id: number) => {
		const post = await getJson<BlogPost>(`${BASE}/${id}`)

		return {
			...post,
			contentJson:
				typeof post.contentJson === 'string'
					? JSON.parse(post.contentJson)
					: post.contentJson,
		}
	},

	create: (dto: CreateBlogPostDto) => postJson<BlogPost>(BASE, dto),

	update: ({ id, dto }: UpdateBlogPostDto) =>
		patchJson<BlogPost>(`${BASE}/${id}`, dto),

	remove: (id: number) => deleteJson<{ success: boolean }>(`${BASE}/${id}`),

	schedule: (dto: ScheduleBlogPostDto) =>
		postJson<BlogPost>(`${BASE}/${dto.id}/schedule`, {
			scheduledAt: dto.scheduledAt,
		}),
}
