import type { Languages } from '../../common.types'
import type { PrivateVariant } from '../../media/private-variants/private-variants.types'
import type {
    BlogCategoriesQuery,
    BlogCategory,
} from '../blog-categories/blog-categories.types'

export interface BlogPost {
    id: number
    lan: Languages
    title: string
    contentJson: Record<string, unknown>
    variantId: number
    variant?: PrivateVariant | null
    status: BlogPostStatus
    isPinned: boolean
    isPopular: boolean
    scheduledAt: string | null
    publishedAt: string | null
    categories?: BlogCategory[]
    createdAt: string
    updatedAt: string
}

export enum BlogPostStatus {
    DRAFT = 'draft',
    SCHEDULED = 'scheduled',
    PUBLISHED = 'published',
    ARCHIVED = 'archived',
}

export type BlogPostsQuery = BlogCategoriesQuery & {
    categoryId?: number
    q?: string
    isPinned?: boolean
    isPopular?: boolean
    status?: BlogPostStatus
    lan?: Languages
}

export interface CreateBlogPostDto {
    contentJson: Record<string, unknown>
    title: string
    variantId: number
    lan: Languages
    status?: BlogPostStatus
    isPinned?: boolean
    isPopular?: boolean
    scheduledAt?: string
    publishedAt?: string
    categoryIds?: number[]
}

export type UpdateBlogPostDto = Partial<CreateBlogPostDto>

export interface ScheduleBlogPostDto {
    scheduledAt: string
}
