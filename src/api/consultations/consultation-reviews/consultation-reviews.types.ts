import type { Specialist } from '../../specialists/specialists/specialists.types'
import type { User } from '../../users/users/users.types'
import type { ConsultationBooking } from '../consultation-bookings/consultation-bookings.types'

export interface ConsultationReview {
    id: number
    userId: number
    specialistId: number
    consultationBookingId: number
    rating: number
    comment: string
    status: ConsultationReviewStatus
    rejectionReason: string | null
    user?: Pick<User, 'id' | 'name'> | null
    specialist?: Pick<Specialist, 'id' | 'name' | 'surname'> | null
    consultationBooking?: ConsultationBooking | null
    createdAt: string
    updatedAt: string
}

export enum ConsultationReviewStatus {
    PENDING_MODERATION = 'pending_moderation',
    PUBLISHED = 'published',
    REJECTED = 'rejected',
}

export interface ConsultationReviewsQuery {
    page?: number
    limit?: number
    offset?: number
    userId?: number
    specialistId?: number
    consultationBookingId?: number
    status?: ConsultationReviewStatus
}

export interface RejectConsultationReviewDto {
    rejectionReason: string
}
