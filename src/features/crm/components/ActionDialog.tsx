'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { X, CheckCircle2 } from 'lucide-react'
import { getResource } from '../catalog'
import type { Operation } from '../types'
import { validateAction } from '../validation'
import { buildArgs, initialValues, getOperation, isRecord } from '../data'
import { operationLabels } from '../labels'
import { SchemaForm } from './SchemaForm'
import { RecordDetails } from './RecordDetails'
import ModalPortal from '../../../components/form-components/modal-portal/ModalPortal'
import { Button } from '../../../components/ui/Button'
import c from './crm.module.scss'

export function ActionDialog({
    operation,
    record,
    preset = {},
    onClose,
    onSuccess,
}: {
    operation: Operation
    record?: Record<string, unknown>
    preset?: Record<string, unknown>
    onClose: () => void
    onSuccess?: (result: unknown) => void
}) {
    const [values, setValues] = useState(() =>
        initialValues(operation, record, preset),
    )

    const client = useQueryClient()

    const router = useRouter()

    const title = operationLabels[operation.method] ?? operation.method

    const mutation = useMutation({
        mutationFn: () => {
            validateAction(operation, values)

            return operation.execute(buildArgs(operation, values))
        },
        onSuccess: async (result) => {
            await client.invalidateQueries({ queryKey: ['crm'] })

            void client.invalidateQueries({ queryKey: ['form-options'] })

            if (
                operation.resource === 'managers' ||
                operation.resource === 'accounts'
            )
                void client.invalidateQueries({ queryKey: ['auth', 'manager'] })

            if (result instanceof Blob) {
                const url = URL.createObjectURL(result)

                const link = document.createElement('a')

                link.href = url

                link.download =
                    typeof record?.originalName === 'string'
                        ? record.originalName
                        : `${operation.resource}-${record?.id ?? record?.versionId ?? 'plik'}${result.type === 'application/pdf' ? '.pdf' : ''}`

                link.click()

                setTimeout(() => URL.revokeObjectURL(url), 1000)
            }

            onSuccess?.(result)
        },
    })

    const fields = operation.args.filter(
        (field) =>
            !(
                record &&
                field.kind !== 'object' &&
                field.kind !== 'file' &&
                values[field.name] !== undefined
            ),
    )

    const close = () => {
        if (!mutation.isPending) onClose()
    }

    return (
        <ModalPortal title={title} onClose={close}>
            <form
                className={c.dialog}
                onSubmit={(event) => {
                    event.preventDefault()

                    if (!mutation.isPending) mutation.mutate()
                }}
            >
                <header className={c.dialogHeader}>
                    <div>
                        <span className={c.eyebrow}>
                            {getResource(operation.resource)?.title}
                        </span>
                        <h2>{title}</h2>
                    </div>
                    <Button
                        aria-label="Zamknij"
                        disabled={mutation.isPending}
                        onClick={close}
                    >
                        <X size={18} />
                    </Button>
                </header>
                {mutation.isSuccess ? (
                    <div className={c.dialogBody}>
                        <p className={c.success}>
                            <CheckCircle2 size={18} />
                            Gotowe
                        </p>
                        {mutation.data !== undefined &&
                            !(mutation.data instanceof Blob) && (
                                <RecordDetails
                                    value={mutation.data}
                                    resource={operation.resource}
                                />
                            )}
                        {['create', 'register', 'copy'].includes(
                            operation.method,
                        ) &&
                        getOperation(operation.resource, 'getById') &&
                        isRecord(mutation.data) &&
                        mutation.data.id ? (
                            <Button
                                variant="primary"
                                onClick={() => {
                                    router.push(
                                        `${getResource(operation.resource)!.path}/${encodeURIComponent(String((mutation.data as Record<string, unknown>).id))}`,
                                    )

                                    onClose()
                                }}
                            >
                                Otwórz rekord
                            </Button>
                        ) : null}
                        <Button variant="primary" onClick={onClose}>
                            Zamknij
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className={c.dialogBody}>
                            {[
                                'publish',
                                'cancelByAdmin',
                                'retryOperations',
                                'simulate',
                                'retire',
                            ].includes(operation.method) && (
                                <p className={c.warning}>
                                    {operation.method === 'publish'
                                        ? 'Publikacja ustawi tę wersję jako aktualny dokument prawny.'
                                        : operation.method === 'cancelByAdmin'
                                          ? 'Anulowanie może uruchomić zwrot płatności i anulowanie spotkania.'
                                          : operation.method ===
                                              'retryOperations'
                                            ? 'Serwer ponowi nieudane operacje rezerwacji, w tym obsługę spotkania i zwrotu.'
                                            : operation.method === 'simulate'
                                              ? 'Zdarzenie zmieni testową subskrypcję użytkownika. Serwer musi mieć włączone symulacje deweloperskie.'
                                              : 'Wycofany plan lub produkt zniknie z listy dostępnych ofert.'}
                                </p>
                            )}
                            {operation.verb === 'DELETE' && (
                                <p className={c.warning}>
                                    Ta operacja usunie wybrany rekord. Sprawdź
                                    wybór przed potwierdzeniem.
                                </p>
                            )}
                            <SchemaForm
                                fields={fields}
                                originalRecord={record}
                                resource={operation.resource}
                                value={values}
                                onChange={setValues}
                                disabled={mutation.isPending}
                            />
                            {!fields.length && (
                                <p>
                                    Potwierdź wykonanie operacji
                                    {record
                                        ? ` dla „${String(record.title ?? record.name ?? record.id ?? '')}”`
                                        : ''}
                                    .
                                </p>
                            )}
                            {mutation.error && (
                                <p className={c.error} role="alert">
                                    {mutation.error.message}
                                </p>
                            )}
                        </div>
                        <footer className={c.dialogFooter}>
                            <Button
                                disabled={mutation.isPending}
                                onClick={close}
                            >
                                Anuluj
                            </Button>
                            <Button
                                type="submit"
                                variant={
                                    operation.verb === 'DELETE'
                                        ? 'danger'
                                        : 'primary'
                                }
                                disabled={mutation.isPending}
                            >
                                {mutation.isPending ? 'Zapisywanie…' : title}
                            </Button>
                        </footer>
                    </>
                )}
            </form>
        </ModalPortal>
    )
}
