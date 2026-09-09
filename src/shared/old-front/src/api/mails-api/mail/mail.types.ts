import type { MailAccount } from '../mail-accounts/mail-accounts.types'

export type MailAttachmentInput = {
	mediaAssetId: number
	filename?: string
}

export type MailInlineCidImageInput = {
	cid: string
	mediaAssetId: number
}

export type SendMailDto = {
	account: MailAccount
	toEmail: string
	subject: string
	html?: string
	text?: string
	attachments?: MailAttachmentInput[]
	inlineCidImages?: MailInlineCidImageInput[]
}

export type SendMailResponse = {
	ok: boolean
	provider: string
	messageId: string
	accepted: string[]
	rejected: string[]
	response: string
	attachments: number
	inlineCidImages: number
}
