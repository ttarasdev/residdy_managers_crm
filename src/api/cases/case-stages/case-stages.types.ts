import type { Languages } from '../../common.types'
import type { PublicAsset } from '../../media/public-assets/public-assets.types'
import type { CaseStageTask } from '../case-stage-tasks/case-stage-tasks.types'
import type { Case } from '../cases/cases.types'

export interface CaseStage {
    id: number
    caseId: number
    stageNo: number
    lan: Languages
    title: string
    iconId: number
    icon?: PublicAsset | null
    case?: Case | null
    tasks?: CaseStageTask[]
    createdAt: string
    updatedAt: string
}

export interface CreateCaseStageDto {
    caseId: number
    lan: Languages
    title: string
    iconId: number
}

export interface CaseStagesQuery {
    page?: number
    limit?: number
    offset?: number
}

export type UpdateCaseStageDto = Partial<Omit<CreateCaseStageDto, 'caseId'>>

export interface ReorderCaseStageDto {
    direction: ReorderDirection
}

export enum ReorderDirection {
    UP = 'up',
    DOWN = 'down',
}
