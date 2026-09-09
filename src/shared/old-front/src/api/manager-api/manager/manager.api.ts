import { getJson, postJson, deleteJson, patchJson } from '../../http'
import type {
	Manager,
	BanManagerDto,
	UpdateManagerDto,
	UpdateManagerByAdminDto,
	CreateManagerDto,
} from './manager.types'

const BASE = '/managers'

export const managerApi = {
	getAll: ({ signal }: { signal?: AbortSignal } = {}) => {
		return getJson<Manager[]>(BASE, { signal })
	},

	create: (dto: CreateManagerDto) => {
		return postJson<Manager>(BASE, dto)
	},

	getCurrent: ({ signal }: { signal?: AbortSignal } = {}) => {
		return getJson<Manager>(BASE + '/me', { signal })
	},

	updateCurrent: (dto: UpdateManagerDto) => {
		return patchJson<Manager>(BASE + '/me', dto)
	},

	updateByAdmin: ({ id, dto }: UpdateManagerByAdminDto) => {
		return patchJson<Manager>(`${BASE}/${id}`, dto)
	},

	updateMyAvatar: (file: File) => {
		const formData = new FormData()
		formData.append('file', file)

		return postJson<Manager>(BASE + '/me/avatar', formData)
	},

	getById: (id: number, { signal }: { signal?: AbortSignal } = {}) => {
		return getJson<Manager>(`${BASE}/${id}`, { signal })
	},

	deleteById: (id: number) => {
		return deleteJson<{ deleted: true; id: number }>(`${BASE}/${id}`)
	},

	ban: (dto: BanManagerDto) => {
		return postJson<Manager>(BASE + '/ban', dto)
	},
}
