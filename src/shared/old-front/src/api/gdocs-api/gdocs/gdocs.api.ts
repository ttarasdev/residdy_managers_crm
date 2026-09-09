import { deleteJson, getJson, patchJson, postJson } from '@/api/http'
import { GDOCS_API_BASE } from './gdocs-constants'
import {
	CreateGdocDto,
	Gdoc,
	GdocsResponse,
	GdocUpdateDto,
	GetGdocsQueryDto,
	UpdateGdocDto,
} from './gdocs.types'

type FormValue =
	| string
	| number
	| boolean
	| File
	| Blob
	| number[]
	| undefined
	| null

const appendFormValue = (form: FormData, key: string, value: FormValue) => {
	if (value === undefined || value === null) return

	if (Array.isArray(value)) {
		form.append(key, JSON.stringify(value))
		return
	}

	if (typeof Blob !== 'undefined' && value instanceof Blob) {
		form.append(key, value)
		return
	}

	form.append(key, String(value))
}

const toGdocFormData = (dto: CreateGdocDto | UpdateGdocDto) => {
	const form = new FormData()

	appendFormValue(form, 'file', dto.file)
	appendFormValue(form, 'gDocTypeId', dto.gDocTypeId)
	appendFormValue(form, 'iconId', dto.iconId)
	appendFormValue(form, 'originalFileName', dto.originalFileName)
	appendFormValue(form, 'titleUA', dto.titleUA)
	appendFormValue(form, 'titlePL', dto.titlePL)
	appendFormValue(form, 'titleEN', dto.titleEN)
	appendFormValue(form, 'titleRU', dto.titleRU)
	appendFormValue(form, 'status', dto.status)
	appendFormValue(form, 'variableIds', dto.variableIds)

	return form
}

export const gdocsApi = {
	list: (params: GetGdocsQueryDto = {}, opts?: { signal?: AbortSignal }) => {
		const search = new URLSearchParams()

		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined && value !== null) {
				search.set(key, String(value))
			}
		})

		const qs = search.toString()
		const url = `${GDOCS_API_BASE}${qs ? `?${qs}` : ''}`

		return getJson<GdocsResponse>(url, opts)
	},

	getById: (id: number, opts?: { signal?: AbortSignal }) =>
		getJson<Gdoc>(`${GDOCS_API_BASE}/${id}`, opts),

	create: (dto: CreateGdocDto) =>
		postJson<Gdoc>(GDOCS_API_BASE, toGdocFormData(dto)),

	update: ({ id, dto }: GdocUpdateDto) =>
		patchJson<Gdoc>(`${GDOCS_API_BASE}/${id}`, toGdocFormData(dto)),

	delete: (id: number) =>
		deleteJson<{ success: true }>(`${GDOCS_API_BASE}/${id}`),
}
