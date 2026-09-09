'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { accountAuthApi } from '../../api/accounts/account-auth/account-auth.api'
import type { LoginAccountDto } from '../../api/accounts/account-auth/account-auth.types'
import { setAccessToken } from '../../api/auth-token'
import { ApiResponseError } from '../../api/api-error'
import { fetchManagerSession } from '../auth/session-query'
import { getSessionSnapshot } from '../auth/session-store'
import { getSafeReturnPath } from '../config/routes'

export function useLogin(returnTo?: string | null) {
    const router = useRouter()

    const pending = useRef<AbortController | null>(null)

    useEffect(() => () => pending.current?.abort(), [])

    return useMutation({
        meta: { skipAuthHandling: true },

        mutationFn: async (dto: LoginAccountDto) => {
            pending.current?.abort()

            const controller = new AbortController()

            pending.current = controller

            const revision = getSessionSnapshot().revision

            const { token } = await accountAuthApi.login(dto, {
                signal: controller.signal,
            })

            if (typeof token !== 'string' || !token.trim())
                throw new ApiResponseError(200, '/account-auth/login')

            const manager = await fetchManagerSession({
                token,
                signal: controller.signal,
            })

            controller.signal.throwIfAborted()

            if (revision !== getSessionSnapshot().revision)
                throw new DOMException(
                    'Session changed during login',
                    'AbortError',
                )

            // Only a verified manager token is persisted, never a user/specialist token.
            setAccessToken(token)

            return manager
        },

        onSuccess: () => router.replace(getSafeReturnPath(returnTo)),
    })
}
