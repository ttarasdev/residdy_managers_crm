import type { Languages } from '../../common.types'
import type { PublicAsset } from '../../media/public-assets/public-assets.types'
import type { CaseInstruction } from '../case-instructions/case-instructions.types'
import type { CaseReminder } from '../case-reminders/case-reminders.types'
import type { CaseStage } from '../case-stages/case-stages.types'

export interface CaseStageTask {
    id: number
    stageId: number
    lan: Languages
    title: string
    subtitle: string
    type: StageTaskType
    reminderId: number | null
    instructionId: number | null
    sortKey: number
    iconId: number
    stage?: CaseStage | null
    reminder?: CaseReminder | null
    icon?: PublicAsset | null
    instruction?: CaseInstruction | null
    createdAt: string
    updatedAt: string
}

export enum StageTaskType {
    WITH_DATE = 'with_date',
    INFO = 'info',
    TEXT = 'text',
}

export interface CreateCaseTaskDto {
    stageId: number
    lan: Languages
    title: string
    subtitle: string
    type: StageTaskType
    iconId: number
    instructionId?: number
    reminderId?: number
}

export interface CaseStageTasksQuery {
    page?: number
    limit?: number
    offset?: number
}

export type UpdateCaseTaskDto = Partial<Omit<CreateCaseTaskDto, 'stageId'>>

export interface ReorderCaseStageTaskDto {
    direction: 'up' | 'down'
}
