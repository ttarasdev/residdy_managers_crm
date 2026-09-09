import type { PublicAsset } from '../../media/public-assets/public-assets.types'
import type { GDocTemplate } from '../g-doc-templates/g-doc-templates.types'

export interface GDocType {
    id: number
    iconId: number
    titleUA: string
    titlePL: string
    titleEN: string
    titleRU: string
    isPopular: boolean
    status: GDocTypeStatus
    icon?: PublicAsset | null
    templates?: GDocTemplate[]
    createdAt: string
    updatedAt: string
}

export enum GDocTypeStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
}

export interface GDocTypesQuery {
    offset?: number
    page?: number
    limit?: number
    status?: GDocTypeStatus
    isPopular?: boolean
    search?: string
}

export interface CreateGDocTypeDto {
    iconId: number
    titleUA: string
    titlePL: string
    titleEN: string
    titleRU: string
    isPopular?: boolean
    status?: GDocTypeStatus
}

export type UpdateGDocTypeDto = Partial<CreateGDocTypeDto>
