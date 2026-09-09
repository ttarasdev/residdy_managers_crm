export type MailSnippet = {
	id: number
	title: string
	topic: string
	text: string
	managerId: number
	isPopular: boolean
	createdAt?: string
	updatedAt?: string
}

export type CreateMailSnippetDto = {
	title: string
	topic: string
	text: string
}

export type UpdateMailSnippetDto = {
	id: number
	dto: Partial<CreateMailSnippetDto> & {
		isPopular?: boolean
	}
}

export type DeleteMailSnippetDto = {
	id: number
}

export type DeleteMailSnippetResponse = {
	success: boolean
}
