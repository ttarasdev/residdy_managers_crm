import type { Specialist } from '../../specialists/specialists/specialists.types'
import type { SpecialistConsultation } from '../specialist-consultations/specialist-consultations.types'

export interface ConsultationSlot {
    id: number
    specialistId: number
    specialistConsultationId: number
    startsAt: string
    endsAt: string
    status: ConsultationSlotStatus
    specialist?: Specialist | null
    specialistConsultation?: SpecialistConsultation | null
    createdAt: string
    updatedAt: string
}

export enum ConsultationSlotStatus {
    OPEN = 'open',
    HELD = 'held',
    BOOKED = 'booked',
    CANCELED = 'canceled',
}
