import type { SpecialistConsultation } from '../../consultations/specialist-consultations/specialist-consultations.types'
import type { Specialist } from '../../specialists/specialists/specialists.types'
import type {
    CreatePromocodeDto,
    Promocode,
} from '../promocodes/promocodes.types'

export interface ConsultationPromocode {
    id: number
    promocodeId: number
    promocode?: Promocode | null
    specialistId: number | null
    specialist?: Pick<Specialist, 'id' | 'name' | 'surname'> | null
    specialistConsultationId: number | null
    specialistConsultation?: SpecialistConsultation | null
    createdAt: string
    updatedAt: string
}

export type CreateConsultationPromocodeDto = Omit<
    CreatePromocodeDto,
    'productType'
> & {
    specialistId?: number
    specialistConsultationId?: number
}

export interface UpdateConsultationPromocodeDto {
    specialistId?: number
    specialistConsultationId?: number
}

export type ConsultationPromocodeDetail = Promocode & {
    conditions: ConsultationPromocode | null
}
