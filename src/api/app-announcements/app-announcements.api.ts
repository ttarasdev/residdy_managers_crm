import { http, toFormData } from '../http'
import type { RequestOptions } from '../http.types'
import type { PageResponse, SuccessResponse } from '../common.types'
import type { PublicAsset } from '../media/public-assets/public-assets.types'
import type {
    AppAnnouncement,
    AppAnnouncementsQuery,
    SaveAppAnnouncementDto,
} from './app-announcements.types'

const BASE = '/app-announcements'

export const appAnnouncementsApi = {
    /** GET /app-announcements — roles: writer */
    list: (query: AppAnnouncementsQuery = {}, options?: RequestOptions) =>
        http.get<PageResponse<AppAnnouncement>>(BASE, {
            ...options,
            query: { ...query },
        }),
    /** GET /app-announcements/:id — roles: writer */
    getById: (id: number, options?: RequestOptions) =>
        http.get<AppAnnouncement>(
            `${BASE}/${encodeURIComponent(String(id))}`,
            options,
        ),
    /** POST /app-announcements — roles: writer */
    create: (dto: SaveAppAnnouncementDto, options?: RequestOptions) =>
        http.post<AppAnnouncement>(BASE, dto, options),
    /** PUT /app-announcements/:id — roles: writer */
    update: (
        id: number,
        dto: SaveAppAnnouncementDto,
        options?: RequestOptions,
    ) =>
        http.put<AppAnnouncement>(
            `${BASE}/${encodeURIComponent(String(id))}`,
            dto,
            options,
        ),
    /** DELETE /app-announcements/:id — roles: writer */
    remove: (id: number, options?: RequestOptions) =>
        http.delete<SuccessResponse>(
            `${BASE}/${encodeURIComponent(String(id))}`,
            options,
        ),
    /** POST /app-announcements/images — roles: writer */
    uploadImage: (file: File, options?: RequestOptions) =>
        http.post<PublicAsset>(`${BASE}/images`, toFormData({}, file), options),
}
