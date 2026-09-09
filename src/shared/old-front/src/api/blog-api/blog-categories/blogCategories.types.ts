export interface BlogCategory {
	id: number
	name_ua: string
	name_pl: string
	name_ru: string
	name_en: string
	sort_key: number
	createdAt: string
	updatedAt: string
}

export interface BlogCategoriesListResponse {
	items: BlogCategory[]
	total: number
}

export interface BlogCategoriesQuery {
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

export interface ReorderBlogCategoriesDto {
	id: number
	direction: 'up' | 'down'
}

export interface UpdateBlogCategoryDto {
	id: number
	dto: Partial<CreateBlogCategoryDto>
}
