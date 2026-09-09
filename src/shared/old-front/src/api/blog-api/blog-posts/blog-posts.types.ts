import { Languages } from '@/shared/types-enums/lans'

export enum BlogPostStatus {
	DRAFT = 'draft',
	SCHEDULED = 'scheduled',
	PUBLISHED = 'published',
	ARCHIVED = 'archived',
}

export interface BlogCategoryShort {
	id: number
	name_ua: string
	name_pl: string
	name_ru: string
	name_en: string
}

export interface BlogPost {
	id: number
	title: string
	contentJson: Record<string, any>
	variantId: number
	lan: Languages
	status: BlogPostStatus
	isPinned: boolean
	isPopular: boolean
	scheduledAt: string | null
	publishedAt: string | null
	categories?: BlogCategoryShort[]
	createdAt: string
	updatedAt: string
}

export type SetPostCategoriesDto = {
	id: number
	categoryIds: number[]
}

export interface BlogPostsQuery {
	page?: number
	limit?: number
	categoryId?: number
	status?: BlogPostStatus
	isPinned?: boolean
	isPopular?: boolean
	lan?: Languages
	q?: string
}

export interface CreateBlogPostDto {
	contentJson: Record<string, any>
	title: string
	variantId: number
	lan: Languages
	categoryIds?: number[]
	status?: BlogPostStatus
	isPinned?: boolean
	isPopular?: boolean
}

export type UpdateBlogPostDto = {
	id: number
	dto: Partial<CreateBlogPostDto>
}

export interface ScheduleBlogPostDto {
	id: number
	scheduledAt: string
}

export interface BlogPostListResponse {
	items: BlogPost[]
	total: number
}
