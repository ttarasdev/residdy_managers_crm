import type { Specialist } from '../../specialists/specialists/specialists.types'
import type { User } from '../../users/users/users.types'
import type { ConsultationReview } from '../consultation-reviews/consultation-reviews.types'
import type { ConsultationSlot } from '../consultation-slots/consultation-slots.types'
import type { SpecialistConsultation } from '../specialist-consultations/specialist-consultations.types'

export enum ConsultationRefundStatus {
    NONE = 'none',
    PENDING = 'pending',
    SUCCEEDED = 'succeeded',
    FAILED = 'failed',
}

export enum ConsultationMeetingStatus {
    NONE = 'none',
    PENDING = 'pending',
    READY = 'ready',
    CANCELED = 'canceled',
    FAILED = 'failed',
}

export interface ConsultationBooking {
    paymentProvider: string
    paidAt: string | null
    withdrawalUntil: string | null
    earlyServiceConsentAt: string | null
    originalStartsAt: string | null
    canceledAt: string | null
    refundStatus: ConsultationRefundStatus
    refundReference: string | null
    refundedAt: string | null
    meetingStatus: ConsultationMeetingStatus
    meetingProvider: string | null
    meetingId: string | null
    meetingUrl: string | null
    revision: number
    subscriptionPlanId: number | null
    subscriptionDiscountPercent: number
    id: number
    userId: number
    specialistId: number
    consultationSlotId: number
    specialistConsultationId: number
    price: string
    originalPrice: string
    discount: string
    promocodeId: number | null
    promocodeCode: string | null
    userFileAssetId: number | null
    durationMinutes: number
    startsAt: string
    endsAt: string
    currency: string
    status: ConsultationBookingStatus
    expiresAt: string | null
    userText: string
    userFileName: string | null
    user?: Pick<User, 'id' | 'name' | 'surname'> | null
    specialist?: Pick<Specialist, 'id' | 'name' | 'surname'> | null
    consultationSlot?: ConsultationSlot | null
    specialistConsultation?: SpecialistConsultation | null
    consultationReview?: ConsultationReview | null
    createdAt: string
    updatedAt: string
}

export enum ConsultationBookingStatus {
    AWAITING_PAYMENT = 'awaiting_payment',
    PAID = 'paid',
    CANCELED = 'canceled',
    COMPLETED = 'completed',
    NO_SHOW = 'no_show',
    REFUNDED = 'refunded',
}

export interface ConsultationBookingsQuery {
    page?: number
    limit?: number
    offset?: number
    userId?: number
    specialistId?: number
    status?: ConsultationBookingStatus
}
