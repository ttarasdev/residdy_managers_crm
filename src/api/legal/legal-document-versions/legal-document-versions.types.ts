export enum LegalVersionStatus {
    DRAFT = 'draft',
    PUBLISHED = 'published',
}

export interface LegalVersionsQuery {
    page?: number
    limit?: number
    offset?: number
}

export interface CreateLegalVersionDto {
    isPlaceholder?: boolean
}

export interface LegalDocumentVersion {
    id: number
    documentId: number
    version: number
    status: LegalVersionStatus
    draftPath: string | null
    assetId: number | null
    sha256: string
    isPlaceholder: boolean
    publishedAt: string | null
    createdByAccountId: number | null
    createdAt: string
    updatedAt: string
}
