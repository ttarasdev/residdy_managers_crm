import type { GDocTemplate } from '../g-doc-templates/g-doc-templates.types'

export interface GDocVar {
    id: number
    key: string
    labelUA: string
    labelPL: string
    labelEN: string
    labelRU: string
    templates?: GDocTemplate[]
    createdAt: string
    updatedAt: string
}

export interface GDocVarsQuery {
    offset?: number
    page?: number
    limit?: number
    search?: string
}

export interface CreateGDocVarDto {
    key: string
    labelUA: string
    labelPL: string
    labelEN: string
    labelRU: string
}
