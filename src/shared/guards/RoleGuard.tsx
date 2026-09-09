'use client'

import type { ReactNode } from 'react'
import { AccessState } from '../../components/feedback/AccessState'
import { useRoles } from '../hooks/useRoles'

export function RoleGuard({
    allowedRoles,
    children,
    fallback,
}: {
    allowedRoles: readonly string[]
    children: ReactNode
    fallback?: ReactNode
}) {
    const { isReady, hasAnyRole } = useRoles()

    if (!isReady) return null

    if (!hasAnyRole(allowedRoles)) {
        return fallback === undefined ? (
            <AccessState title="Brak uprawnień">
                Nie masz dostępu do tej sekcji.
            </AccessState>
        ) : (
            fallback
        )
    }

    return children
}
