export enum LegalDocumentCode {
    REGISTRATION_TERMS = 'registration_terms',
    PRIVACY_POLICY = 'privacy_policy',
    SUBSCRIPTION_TERMS = 'subscription_terms',
    CONSULTATION_TERMS = 'consultation_terms',
    SPECIALIST_TERMS = 'specialist_terms',
    PARTNER_TERMS = 'partner_terms',
}

export enum LegalPlacement {
    REGISTRATION = 'registration',
    SUBSCRIPTION = 'subscription_checkout',
    CONSULTATION = 'consultation_checkout',
    SPECIALIST = 'specialist',
    PARTNER = 'partner',
}

export interface LegalDocumentsQuery {
    page?: number
    limit?: number
    offset?: number
    placement?: LegalPlacement
}

export interface LegalDocument {
    code: LegalDocumentCode
    title: string
    versionId: number
    version: number
    publishedAt: string
    isPlaceholder: boolean
    sha256: string
    url: string
}
