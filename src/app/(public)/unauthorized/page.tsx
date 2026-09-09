'use client'

import { useRouter } from 'next/navigation'
import { AccessState } from '@/components/feedback/AccessState'
import { routes } from '@/shared/config/routes'
import { useAuth } from '@/shared/hooks/useAuth'

export default function UnauthorizedPage() {
    const { logout } = useAuth()

    const router = useRouter()

    const exit = () => {
        logout()

        router.replace(routes.auth)
    }

    return (
        <AccessState title="Brak dostępu do CRM" onExit={exit}>
            Zaloguj się kontem menedżera.
        </AccessState>
    )
}
