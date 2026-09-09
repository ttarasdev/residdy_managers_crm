import type { BlogPost } from '../blog-posts/blog-posts.types'

export interface BlogCategory {
    id: number
    name_ua: string
    name_pl: string
    name_ru: string
    name_en: string
    sort_key: number
    posts?: BlogPost[]
    createdAt: string
    updatedAt: string
}

export interface BlogCategoriesQuery {
    page?: number
    limit?: number
    offset?: number
}

export interface CreateBlogCategoryDto {
    name_ua: string
    name_pl: string
    name_ru: string
    name_en: string
    sort_key?: number
}

export type UpdateBlogCategoryDto = Partial<CreateBlogCategoryDto>

export interface ReorderBlogCategoryDto {
    direction: ReorderDirection
}

export enum ReorderDirection {
    UP = 'up',
    DOWN = 'down',
}
