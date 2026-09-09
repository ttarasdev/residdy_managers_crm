'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { subscriptionPlansApi } from '../../../api/subscriptions/subscription-plans/subscription-plans.api'
import { useRoles } from '../../../shared/hooks/useRoles'
import { Button } from '../../../components/ui/Button'
import { State } from '../../../components/ui/State'
import { getOperation } from '../data'
import { ActionDialog } from './ActionDialog'
import { RecordDetails } from './RecordDetails'
import c from './crm.module.scss'

export function TrialSettings() {
    const { hasAnyRole } = useRoles()

    const [editing, setEditing] = useState(false)

    const query = useQuery({
        queryKey: ['crm', 'subscription-plans', 'trial-settings'],
        enabled: hasAnyRole(['admin']),
        queryFn: ({ signal }) => subscriptionPlansApi.trialSettings({ signal }),
    })

    if (!hasAnyRole(['admin'])) return null

    return (
        <section className={c.card}>
            <div className={c.cardHeader}>
                <h2>Okres próbny</h2>
                <Button disabled={!query.data} onClick={() => setEditing(true)}>
                    Zmień okres próbny
                </Button>
            </div>
            {query.isPending || query.error ? (
                <State
                    loading={query.isPending}
                    error={query.error}
                    onRetry={() => {
                        void query.refetch()
                    }}
                />
            ) : (
                <RecordDetails value={query.data} />
            )}
            {editing && query.data && (
                <ActionDialog
                    operation={
                        getOperation(
                            'subscription-plans',
                            'updateTrialSettings',
                        )!
                    }
                    record={{ ...query.data }}
                    onClose={() => setEditing(false)}
                />
            )}
        </section>
    )
}
