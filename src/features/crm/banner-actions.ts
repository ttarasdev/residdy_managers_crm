import type { Operation } from './types'

const actions: Record<string, readonly string[]> = {
    pending_review: ['approve', 'reject'],
    approved: ['activate'],
    active: ['finish'],
    draft: ['remove'],
    rejected: ['remove'],
    finished: ['remove'],
}

export function isBannerActionAvailable(
    operation: Operation,
    record?: Record<string, unknown>,
) {
    if (operation.resource !== 'partner-banners') return true

    if (!record) return false

    const status = String(record.status ?? '')

    if (!(actions[status] ?? []).includes(operation.method)) return false

    const company = record.company as Record<string, unknown> | undefined

    if (
        ['approve', 'reject', 'activate'].includes(operation.method) &&
        ['blocked', 'archived'].includes(String(company?.status))
    )
        return false

    if (
        operation.method === 'activate' &&
        company &&
        company.status !== 'active'
    )
        return false

    return true
}
