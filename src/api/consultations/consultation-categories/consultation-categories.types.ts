import type { PublicAsset } from '../../media/public-assets/public-assets.types'
import type { SpecialistConsultation } from '../specialist-consultations/specialist-consultations.types'

export interface ConsultationCategory {
    id: number
    titleUa: string
    titlePl: string
    titleEn: string
    titleRu: string
    assetId: number
    isActive: boolean
    isPopular: boolean
    specialistConsultations?: SpecialistConsultation[]
    createdAt: string
    updatedAt: string
    icon?: PublicAsset | null
}

export interface ConsultationCategoriesQuery {
    page?: number
    limit?: number
    offset?: number
    isActive?: boolean
    isPopular?: boolean
}

export interface CreateConsultationCategoryDto {
    titleUa: string
    titlePl: string
    titleEn: string
    titleRu: string
    assetId: number
    isActive?: boolean
    isPopular?: boolean
}

export type UpdateConsultationCategoryDto =
    Partial<CreateConsultationCategoryDto>
