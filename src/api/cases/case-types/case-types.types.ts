import type { Languages } from '../../common.types'
import type { PublicAsset } from '../../media/public-assets/public-assets.types'
import type { Case } from '../cases/cases.types'

export interface CaseType {
    id: number
    title: string
    description: string
    status: CaseTypeStatus
    iconId: number
    isPopular: boolean
    lan: Languages
    icon?: PublicAsset | null
    cases?: Case[]
    createdAt: string
    updatedAt: string
}

export enum CaseTypeStatus {
    ACTIVE = 'active',
    DRAFT = 'draft',
    ARCHIVED = 'archived',
}

export interface CreateCaseTypeDto {
    title: string
    description: string
    iconId: number
    status?: CaseTypeStatus
    isPopular?: boolean
    lan: Languages
}

export interface CaseTypesQuery {
    page?: number
    status?: CaseTypeStatus
    limit?: number
    offset?: number
    isPopular?: boolean
    lan?: Languages
}

export type UpdateCaseTypeDto = Partial<CreateCaseTypeDto>
