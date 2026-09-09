export enum MailAccount {
    RESIDDY_APP = 'RESIDDY_APP',
    RESIDDY_CONTACT = 'RESIDDY_CONTACT',
}

export interface PublicMailAccountConfig {
    provider: 'smtp'
    host: string
    port: number
    fromName: string
    fromEmail: string
    secure: boolean
    ratePerMin: number
    dailyQuota: number
}
