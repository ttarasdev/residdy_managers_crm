import { queryOptions } from '@tanstack/react-query'
import { managersApi } from '../../api/managers/managers/managers.api'
import { ApiResponseError } from '../../api/api-error'
import type { RequestOptions } from '../../api/http.types'

export const sessionQueryKey = ['auth', 'manager'] as const

export async function fetchManagerSession(options: RequestOptions) {
    const manager = await managersApi.getMe(options)

    if (
        !manager ||
        !Number.isSafeInteger(manager.id) ||
        !Number.isSafeInteger(manager.accountId) ||
        !Array.isArray(manager.roles) ||
        !manager.roles.every((role) => typeof role.name === 'string')
    ) {
        throw new ApiResponseError(200, '/managers/me')
    }

    return manager
}

export function managerSessionOptions(token: string | null) {
    return queryOptions({
        queryKey: sessionQueryKey,

        queryFn: ({ signal }) => fetchManagerSession({ token, signal }),

        enabled: Boolean(token),
        staleTime: 60_000,
        refetchInterval: 5 * 60_000,
        refetchOnWindowFocus: 'always',
        refetchOnReconnect: 'always',
        networkMode: 'always',
    })
}
