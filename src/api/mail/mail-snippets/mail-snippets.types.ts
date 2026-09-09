export interface MailSnippet {
    id: number
    title: string
    topic: string
    text: string
    createdByAccountId: number
    isPopular: boolean
    createdAt: string
    updatedAt: string
}

export interface CreateMailSnippetDto {
    title: string
    topic: string
    text: string
}

export interface MailSnippetsQuery {
    page?: number
    limit?: number
    offset?: number
    isPopular?: boolean
}

export type UpdateMailSnippetDto = Partial<CreateMailSnippetDto> & {
    isPopular?: boolean
}
