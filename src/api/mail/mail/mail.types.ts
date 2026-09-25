import type { MailAccount } from '../mail-accounts/mail-accounts.types'

export interface SendMailDto {
    signatureId?: number
    account: MailAccount
    toEmail: string
    subject: string
    html?: string
    text?: string
    attachments?: AttachmentInputDto[]
    inlineCidImages?: InlineCidImageInputDto[]
}

export interface AttachmentInputDto {
    mediaAssetId: number
    filename?: string
}

export interface InlineCidImageInputDto {
    cid: string
    mediaAssetId: number
}

export interface SendMailResponse {
    ok: true
    provider: 'smtp'
    messageId: string
    accepted: (
        | string
        | {
              name: string
              address: string
          }
    )[]
    rejected: (
        | string
        | {
              name: string
              address: string
          }
    )[]
    attachments: number
    inlineCidImages: number
}
