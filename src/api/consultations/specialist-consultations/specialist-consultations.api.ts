import type { PageResponse } from '../../common.types'
import type { RequestOptions } from '../../http.types'
import type {
    SpecialistConsultation,
    SpecialistConsultationsQuery,
} from './specialist-consultations.types'
import { http } from '../../http'

const BASE = '/specialist-consultations'

export const specialistConsultationsApi = {
    /** GET /specialist-consultations/active */
    list: (
        query: SpecialistConsultationsQuery = {},
        options?: RequestOptions,
    ) =>
        http.get<PageResponse<SpecialistConsultation>>(`${BASE}/active`, {
            ...options,
            query: { ...query },
        }),

    /** GET /specialist-consultations/active/:id */
    getById: (id: number, options?: RequestOptions) =>
        http.get<SpecialistConsultation>(
            `${BASE}/active/${encodeURIComponent(String(id))}`,
            { ...options },
        ),
}
