export type AnnouncementActionType =
    | 'none'
    | 'external_url'
    | 'screen'
    | 'record'

export type AnnouncementScreen =
    | 'home'
    | 'subscription_plans'
    | 'consultations'
    | 'blog'
    | 'legalization'
    | 'partners'
    | 'documents'

export type AnnouncementRecordType =
    | 'case'
    | 'blog_post'
    | 'consultation'
    | 'partner_company'

export interface SaveAppAnnouncementDto {
    intervalMinutes?: number
    title: string
    startsAt: string
    endsAt: string
    enabled: boolean
    imagePlId: number
    imageUaId: number
    imageEnId: number
    imageRuId: number
    actionType: AnnouncementActionType
    actionUrl?: string
    actionScreen?: AnnouncementScreen
    actionRecordType?: AnnouncementRecordType
    actionRecordId?: number
}

export interface AppAnnouncement extends SaveAppAnnouncementDto {
    id: number
    createdByAccountId: number
    createdAt: string
    updatedAt: string
}

export interface AppAnnouncementsQuery {
    page?: number
    limit?: number
    offset?: number
    enabled?: boolean
}
