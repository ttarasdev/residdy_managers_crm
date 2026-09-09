import type { CaseStageTask } from '../../cases/case-stage-tasks/case-stage-tasks.types'
import type { UserCaseStage } from '../user-case-stages/user-case-stages.types'
import type { UserCase } from '../user-cases/user-cases.types'

export interface UserCaseTask {
    id: number
    userCaseId: number
    userCaseStageId: number
    templateTaskId: number
    status: UserCaseTaskStatus
    selectedDate: string | null
    doneAt: string | null
    userCase?: UserCase | null
    stage?: UserCaseStage | null
    template?: CaseStageTask | null
    createdAt: string
    updatedAt: string
}

export enum UserCaseTaskStatus {
    LOCKED = 'locked',
    OPEN = 'open',
    DONE = 'done',
}
