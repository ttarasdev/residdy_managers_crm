import type { Languages } from '../../common.types'
import type { PublicAsset } from '../../media/public-assets/public-assets.types'
import type { CaseStage } from '../case-stages/case-stages.types'
import type { CaseType } from '../case-types/case-types.types'

export interface Case {
    id: number
    typeId: number
    status: CaseStatus
    title: string
    subtitle: string
    version: number
    lan: Languages
    iconId: number
    icon?: PublicAsset | null
    isPopular: boolean
    caseType?: CaseType | null
    createdAt: string
    updatedAt: string
}

export enum CaseStatus {
    DRAFT = 'draft',
    ACTIVE = 'active',
    ARCHIVED = 'archived',
}

export interface CreateCaseDto {
    title: string
    typeId: number
    lan: Languages
    subtitle: string
    iconId: number
    status?: CaseStatus
    isPopular?: boolean
}

export interface CasesQuery {
    page?: number
    status?: CaseStatus
    lan?: Languages
    isPopular?: boolean
    typeId?: number
    limit?: number
    offset?: number
}

export type UpdateCaseDto = Partial<CreateCaseDto>

export type CaseDetail = Case & {
    stages: CaseStage[]
}
