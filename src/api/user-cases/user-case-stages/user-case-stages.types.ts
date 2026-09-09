import type { CaseStage } from '../../cases/case-stages/case-stages.types'
import type { UserCaseTask } from '../user-case-tasks/user-case-tasks.types'
import type { UserCase } from '../user-cases/user-cases.types'

export interface UserCaseStage {
    id: number
    userCaseId: number
    templateStageId: number
    status: UserCaseStageStatus
    userCase?: UserCase | null
    template?: CaseStage | null
    tasks?: UserCaseTask[]
    createdAt: string
    updatedAt: string
}

export enum UserCaseStageStatus {
    LOCKED = 'locked',
    ACTIVE = 'active',
    DONE = 'done',
}
