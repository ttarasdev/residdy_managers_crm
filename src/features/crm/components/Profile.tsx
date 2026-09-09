'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../../../shared/hooks/useAuth'
import { accountsApi } from '../../../api/accounts/accounts/accounts.api'
import { getOperation, getOperations } from '../data'
import type { Operation } from '../types'
import { operationLabels } from '../labels'
import { RecordDetails } from './RecordDetails'
import { ActionDialog } from './ActionDialog'
import { Button } from '../../../components/ui/Button'
import { State } from '../../../components/ui/State'
import c from './crm.module.scss'

export function Profile() {
    const { manager } = useAuth()

    const account = useQuery({
        queryKey: ['crm', 'accounts', 'me'],
        queryFn: ({ signal }) => accountsApi.getMe({ signal }),
    })

    const [action, setAction] = useState<Operation | null>(null)

    return (
        <div className={c.page}>
            <header className={c.pageHeader}>
                <div>
                    <p className={c.eyebrow}>KONTO</p>
                    <h1>Mój profil</h1>
                    <p className={c.description}>
                        Dane osobowe, preferencje i bezpieczeństwo konta.
                    </p>
                </div>
                <Button
                    variant="primary"
                    onClick={() =>
                        setAction(getOperation('managers', 'updateMe')!)
                    }
                >
                    Edytuj profil
                </Button>
            </header>
            <section className={c.card}>
                <RecordDetails value={manager} />
            </section>
            <section className={c.card}>
                <div className={c.cardHeader}>
                    <h2>Konto i dostęp</h2>
                </div>
                {account.isPending || account.error ? (
                    <State
                        loading={account.isPending}
                        error={account.error}
                        onRetry={() => {
                            void account.refetch()
                        }}
                    />
                ) : (
                    <RecordDetails value={account.data} />
                )}
            </section>
            <section className={c.card}>
                <div className={c.cardHeader}>
                    <h2>Bezpieczeństwo</h2>
                    <div className={c.actions}>
                        {getOperations('account-auth')
                            .filter((operation) =>
                                [
                                    'requestEmailChange',
                                    'confirmEmailChange',
                                    'requestPasswordChange',
                                    'changePassword',
                                ].includes(operation.method),
                            )
                            .map((operation) => (
                                <Button
                                    key={operation.id}
                                    onClick={() => setAction(operation)}
                                >
                                    {operationLabels[operation.method]}
                                </Button>
                            ))}
                    </div>
                </div>
            </section>
            {action && (
                <ActionDialog
                    operation={action}
                    record={manager ? { ...manager } : undefined}
                    onClose={() => setAction(null)}
                />
            )}
        </div>
    )
}
