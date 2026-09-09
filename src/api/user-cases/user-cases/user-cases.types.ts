import type { Case } from '../../cases/cases/cases.types'
import type { User } from '../../users/users/users.types'
import type { UserCaseStage } from '../user-case-stages/user-case-stages.types'

export interface UserCase {
    id: number
    userId: number
    templateCaseId: number
    activeStageNo: number
    status: UserCaseStatus
    user?: User | null
    template?: Case | null
    stages?: UserCaseStage[]
    createdAt: string
    updatedAt: string
}

export enum UserCaseStatus {
    ACTIVE = 'active',
    COMPLETED = 'completed',
    ARCHIVED = 'archived',
}
