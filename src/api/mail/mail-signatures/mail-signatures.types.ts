export interface CreateMailSignatureDto {
    title: string
    companyName: string
    text?: string
    address?: string
    email?: string
    website?: string
    logoAssetId?: number
}

export interface MailSignature extends CreateMailSignatureDto {
    id: number
    createdByAccountId: number
    isPopular: boolean
    createdAt: string
    updatedAt: string
}

export interface MailSignatureSnapshot {
    html: string
    text: string
    logo?: string
}

export interface MailSignaturesQuery {
    page?: number
    limit?: number
    offset?: number
    isPopular?: boolean
}

export type UpdateMailSignatureDto = Partial<CreateMailSignatureDto> & {
    isPopular?: boolean
}
