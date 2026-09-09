import type { Account } from '../../accounts/accounts/accounts.types'
import type { Languages } from '../../common.types'
import type { Specialist } from '../../specialists/specialists/specialists.types'
import type { ConsultationBooking } from '../consultation-bookings/consultation-bookings.types'
import type { ConsultationCategory } from '../consultation-categories/consultation-categories.types'
import type { ConsultationSlot } from '../consultation-slots/consultation-slots.types'

export interface SpecialistConsultation {
    id: number
    specialistId: number
    consultationCategoryId: number
    titleUa: string
    titlePl: string
    titleEn: string
    titleRu: string
    descriptionUa: string
    descriptionPl: string
    descriptionEn: string
    descriptionRu: string
    durationMinutes: number
    price: string
    lans: Languages[]
    status: SpecialistConsultationStatus
    specialist?:
        | (Pick<
              Specialist,
              'id' | 'name' | 'surname' | 'rating' | 'verified'
          > & {
              account?: Pick<Account, 'avatarId'> | null
          })
        | null
    consultationCategory?: ConsultationCategory | null
    consultationSlots?: ConsultationSlot[]
    consultationBookings?: ConsultationBooking[]
    createdAt: string
    updatedAt: string
}

export enum SpecialistConsultationStatus {
    DRAFT = 'draft',
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    ARCHIVED = 'archived',
}

export interface SpecialistConsultationsQuery {
    page?: number
    limit?: number
    offset?: number
    consultationCategoryId?: number
    specialistId?: number
    status?: SpecialistConsultationStatus
}
