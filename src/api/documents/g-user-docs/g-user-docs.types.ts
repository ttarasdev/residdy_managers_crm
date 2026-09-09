import type { PrivateAsset } from '../../media/private-assets/private-assets.types'
import type { User } from '../../users/users/users.types'
import type { GDocTemplate } from '../g-doc-templates/g-doc-templates.types'

export interface GUserDoc {
    subscriptionPlanId: number | null
    id: number
    userId: number
    gDocTemplateId: number
    assetId: number
    user?: User | null
    template?: GDocTemplate | null
    asset?: PrivateAsset | null
    createdAt: string
    updatedAt: string
}
