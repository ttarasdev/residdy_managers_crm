'use client'

import { useEffect, type ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { AccessState } from '../../components/feedback/AccessState'
import { routes, getSafeReturnPath } from '../config/routes'
import { useAuth } from '../hooks/useAuth'

export function AuthGuard({ children }: { children: ReactNode }) {
    const { status, refreshSession, logout, isRefreshing } = useAuth()

    const pathname = usePathname()

    const router = useRouter()

    useEffect(() => {
        if (status === 'anonymous') {
            const next = getSafeReturnPath(
                `${pathname}${window.location.search}${window.location.hash}`,
            )

            router.replace(`${routes.auth}?next=${encodeURIComponent(next)}`)
        } else if (status === 'forbidden') {
            router.replace(routes.unauthorized)
        }
    }, [status, pathname, router])

    if (status === 'error') {
        return (
            <AccessState
                title="Nie udało się sprawdzić sesji"
                onRetry={refreshSession}
                onExit={logout}
                pending={isRefreshing}
            >
                Sprawdź połączenie i spróbuj ponownie.
            </AccessState>
        )
    }

    return status === 'authenticated' ? children : null
}
