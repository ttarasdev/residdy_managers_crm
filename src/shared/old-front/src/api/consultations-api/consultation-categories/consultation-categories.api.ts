import { deleteJson, getJson, patchJson, postJson } from '@/api/http'
import { CONSULTATION_CATEGORIES_API_BASE } from './consultation-categories.constants'
import {
	ConsultationCategoriesResponse,
	ConsultationCategory,
	ConsultationCategoryUpdateDto,
	CreateConsultationCategoryDto,
	DeleteConsultationCategoryResponse,
	GetConsultationCategoriesQueryDto,
} from './consultation-categories.types'

export const consultationCategoriesApi = {
	list: (
		params: GetConsultationCategoriesQueryDto = {},
		opts?: { signal?: AbortSignal },
	) => {
		const search = new URLSearchParams()

		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined && value !== null) {
				search.set(key, String(value))
			}
		})

		const qs = search.toString()
		const url = `${CONSULTATION_CATEGORIES_API_BASE}${qs ? `?${qs}` : ''}`

		return getJson<ConsultationCategoriesResponse>(url, opts)
	},

	active: (opts?: { signal?: AbortSignal }) =>
		getJson<ConsultationCategoriesResponse>(
			`${CONSULTATION_CATEGORIES_API_BASE}/active`,
			opts,
		),

	getById: (id: number, opts?: { signal?: AbortSignal }) =>
		getJson<ConsultationCategory>(
			`${CONSULTATION_CATEGORIES_API_BASE}/${id}`,
			opts,
		),

	create: (dto: CreateConsultationCategoryDto) =>
		postJson<ConsultationCategory>(CONSULTATION_CATEGORIES_API_BASE, dto),

	update: ({ id, dto }: ConsultationCategoryUpdateDto) =>
		patchJson<ConsultationCategory>(
			`${CONSULTATION_CATEGORIES_API_BASE}/${id}`,
			dto,
		),

	delete: (id: number) =>
		deleteJson<DeleteConsultationCategoryResponse>(
			`${CONSULTATION_CATEGORIES_API_BASE}/${id}`,
		),
}
