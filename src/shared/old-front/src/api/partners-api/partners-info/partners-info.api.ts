import { deleteJson, getJson, patchJson, putJson } from '@/api/http'
import type {
	PartnerInfo,
	RemovePartnerInfoResponse,
	UpdatePartnerInfoDto,
	UpdatePartnerPhotoDto,
} from './partners-info.types'
import { PARTNERS_INFO_API_BASE as BASE } from './partners-info.constants'

export const partnersInfoApi = {
	getById: (id: number) => getJson<PartnerInfo>(`${BASE}/${id}`),

	getByPartnerId: (partnerId: number) =>
		getJson<PartnerInfo>(`${BASE}/partner/${partnerId}`),

	update: (dto: UpdatePartnerInfoDto) => {
		const { id, ...body } = dto
		return putJson<PartnerInfo>(`${BASE}/${id}`, body)
	},

	updateMainPhoto: ({ id, file }: UpdatePartnerPhotoDto) => {
		const form = new FormData()
		form.append('file', file)

		return patchJson<PartnerInfo>(`${BASE}/${id}/main-photo`, form)
	},

	remove: (id: number) =>
		deleteJson<RemovePartnerInfoResponse>(`${BASE}/${id}`),
}
