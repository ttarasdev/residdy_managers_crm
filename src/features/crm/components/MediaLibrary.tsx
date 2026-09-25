'use client'

import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../../../shared/hooks/useAuth'
import { useRoles } from '../../../shared/hooks/useRoles'
import { mediaBuckets, bucketLabels, type MediaKind } from '../media'
import { getResource } from '../catalog'
import { getOperation } from '../data'
import { MediaGrid } from '../../../components/media-components/MediaGrid'
import { MediaUpload } from '../../../components/media-components/MediaUpload'
import { MediaThumbnail } from '../../../components/media-components/MediaThumbnail'
import { Button } from '../../../components/ui/Button'
import ModalPortal from '../../../components/form-components/modal-portal/ModalPortal'
import { ActionDialog } from './ActionDialog'
import { RecordDetails } from './RecordDetails'
import c from './crm.module.scss'
import s from '../../../components/media-components/media.module.scss'

export function MediaLibrary({ kind }: { kind: MediaKind }) {
    const [bucket, setBucket] = useState<string>(mediaBuckets[kind][0])

    const [selected, setSelected] = useState<Record<string, unknown> | null>(
        null,
    )

    const [action, setAction] = useState<
        'remove' | 'download' | 'togglePopular' | null
    >(null)

    const [upload, setUpload] = useState(false)

    const { manager } = useAuth()

    const { hasAnyRole } = useRoles()

    const client = useQueryClient()

    const policy = {
        kind,
        bucket,
        icon: bucket === 'icons',
        upload: true,
        browse: true,
    }

    const canUpload =
        bucket === 'manager_files' ||
        hasAnyRole(
            bucket.startsWith('instruction')
                ? ['admin', 'manager']
                : ['admin', 'manager', 'writer'],
        )

    const canDelete =
        selected &&
        hasAnyRole(getOperation(kind, 'remove')!.roles) &&
        (hasAnyRole(['admin']) ||
            Number(selected.ownerAccountId ?? selected.createdByAccountId) ===
                manager?.accountId)

    return (
        <div className={c.page}>
            <header className={c.pageHeader}>
                <div>
                    <p className={c.eyebrow}>Biblioteka</p>
                    <h1>{getResource(kind)?.title}</h1>
                </div>
                {canUpload && (
                    <Button onClick={() => setUpload(!upload)}>
                        Dodaj do biblioteki
                    </Button>
                )}
            </header>
            <nav className={s.tabs} aria-label="Kategorie biblioteki">
                {mediaBuckets[kind].map((item) => (
                    <Button
                        key={item}
                        aria-pressed={item === bucket}
                        variant={item === bucket ? 'primary' : 'secondary'}
                        onClick={() => {
                            setBucket(item)

                            setUpload(false)
                        }}
                    >
                        {bucketLabels[item]}
                    </Button>
                ))}
            </nav>
            <p className={c.description}>
                {bucket === 'manager_files'
                    ? 'Pliki osobiste widzisz tylko Ty i administrator.'
                    : 'Wybierz plik po podglądzie. Każda kategoria ma swoje przeznaczenie.'}
            </p>
            {upload && canUpload && (
                <section className={c.card}>
                    <MediaUpload
                        key={bucket}
                        policy={policy}
                        onUploaded={() => setUpload(false)}
                    />
                </section>
            )}
            <section className={c.card}>
                <MediaGrid
                    key={`${kind}:${bucket}`}
                    policy={policy}
                    onSelect={setSelected}
                />
            </section>
            {selected && !action && (
                <ModalPortal
                    title={String(selected.originalName)}
                    onClose={() => setSelected(null)}
                >
                    <div className={s.dialog}>
                        <div className={s.toolbar}>
                            <h2>{String(selected.originalName)}</h2>
                            <Button onClick={() => setSelected(null)}>
                                Zamknij
                            </Button>
                        </div>
                        <div className={c.details}>
                            <MediaThumbnail
                                kind={kind}
                                id={Number(selected.id)}
                                row={selected}
                                icon={policy.icon}
                                large
                            />
                            {kind === 'private-assets' && (
                                <Button onClick={() => setAction('download')}>
                                    Pobierz plik
                                </Button>
                            )}
                            {canDelete && (
                                <Button
                                    onClick={() => setAction('togglePopular')}
                                >
                                    {selected.isPopular
                                        ? 'Usuń z ulubionych'
                                        : 'Dodaj do ulubionych'}
                                </Button>
                            )}
                            {canDelete && (
                                <Button
                                    variant="danger"
                                    onClick={() => setAction('remove')}
                                >
                                    Usuń plik
                                </Button>
                            )}
                        </div>
                        <RecordDetails value={selected} />
                    </div>
                </ModalPortal>
            )}
            {selected && action && (
                <ActionDialog
                    operation={getOperation(kind, action)!}
                    record={selected}
                    onClose={() => setAction(null)}
                    onSuccess={() => {
                        setAction(null)

                        setSelected(null)

                        void client.invalidateQueries({
                            queryKey: ['crm', kind],
                        })
                    }}
                />
            )}
        </div>
    )
}
