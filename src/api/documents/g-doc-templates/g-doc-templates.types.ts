import type { PrivateAsset } from '../../media/private-assets/private-assets.types'
import type { PublicAsset } from '../../media/public-assets/public-assets.types'
import type { GDocType } from '../g-doc-types/g-doc-types.types'
import type { GDocVar } from '../g-doc-vars/g-doc-vars.types'
import type { GUserDoc } from '../g-user-docs/g-user-docs.types'

export interface GDocTemplate {
    id: number
    gDocTypeId: number
    iconId: number
    titleUA: string
    titlePL: string
    titleEN: string
    titleRU: string
    assetId: number
    asset?: PrivateAsset | null
    status: GDocTemplateStatus
    type?: GDocType | null
    icon?: PublicAsset | null
    variables?: GDocVar[]
    userDocs?: GUserDoc[]
    createdAt: string
    updatedAt: string
}

export enum GDocTemplateStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
}

export interface GDocTemplatesQuery {
    offset?: number
    page?: number
    limit?: number
    gDocTypeId?: number
    status?: GDocTemplateStatus
    search?: string
}

export interface CreateGDocTemplateDto {
    gDocTypeId: number
    iconId: number
    assetId: number
    titleUA: string
    titlePL: string
    titleEN: string
    titleRU: string
    status?: GDocTemplateStatus
    variableIds?: number[]
}

export type UpdateGDocTemplateDto = Partial<CreateGDocTemplateDto>
