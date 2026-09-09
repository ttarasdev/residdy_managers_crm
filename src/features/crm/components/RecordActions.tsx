'use client'

import type { Operation } from '../types'
import { operationLabels } from '../labels'
import { rowName } from '../data'
import { useRoles } from '../../../shared/hooks/useRoles'
import ModalPortal from '../../../components/form-components/modal-portal/ModalPortal'
import { Button } from '../../../components/ui/Button'
import { RecordDetails } from './RecordDetails'
import c from './crm.module.scss'

export function RecordActions({
    resource,
    record,
    operations,
    onAction,
    onClose,
}: {
    resource: string
    record: Record<string, unknown>
    operations: Operation[]
    onAction: (operation: Operation) => void
    onClose: () => void
}) {
    const { hasAnyRole } = useRoles()

    return (
        <ModalPortal title={rowName(record)} onClose={onClose}>
            <div className={c.dialog}>
                <header className={c.dialogHeader}>
                    <h2>{rowName(record)}</h2>
                    <Button onClick={onClose}>Zamknij</Button>
                </header>
                <div className={c.dialogBody}>
                    <RecordDetails resource={resource} value={record} />
                </div>
                <footer className={c.dialogFooter}>
                    {operations.map((operation) => (
                        <Button
                            key={operation.id}
                            disabled={!hasAnyRole(operation.roles)}
                            onClick={() => onAction(operation)}
                        >
                            {operationLabels[operation.method]}
                        </Button>
                    ))}
                </footer>
            </div>
        </ModalPortal>
    )
}
