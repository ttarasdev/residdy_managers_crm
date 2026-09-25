'use client'

import { useState } from 'react'
import type { MediaPolicy } from '../../features/crm/media'
import { bucketLabels } from '../../features/crm/media'
import { Button } from '../ui/Button'
import ModalPortal from '../form-components/modal-portal/ModalPortal'
import { MediaGrid } from './MediaGrid'
import { MediaThumbnail } from './MediaThumbnail'
import { MediaUpload } from './MediaUpload'
import s from './media.module.scss'

export function MediaPicker({
    policy,
    value,
    onChange,
    disabled,
    id,
    announcement,
}: {
    policy: MediaPolicy
    value: unknown
    onChange: (value: unknown) => void
    disabled?: boolean
    id: string
    announcement?: boolean
}) {
    const [open, setOpen] = useState(false)

    const [upload, setUpload] = useState(false)

    return (
        <div className={s.picker}>
            {Number(value) > 0 && (
                <div className={s.selected}>
                    <MediaThumbnail
                        kind={policy.kind}
                        id={Number(value)}
                        icon={policy.icon}
                    />
                </div>
            )}
            {policy.browse && (
                <Button
                    id={id}
                    disabled={disabled}
                    onClick={() => setOpen(true)}
                >
                    Wybierz z biblioteki
                </Button>
            )}
            {policy.upload && (
                <Button
                    id={policy.browse ? undefined : id}
                    disabled={disabled}
                    onClick={() => setUpload(!upload)}
                >
                    Dodaj nowe zdjęcie
                    {policy.kind === 'private-assets' ? ' / plik' : ''}
                </Button>
            )}
            {upload && !disabled && (
                <MediaUpload
                    policy={policy}
                    announcement={announcement}
                    onUploaded={(id) => {
                        onChange(id)

                        setUpload(false)
                    }}
                />
            )}
            {open && !disabled && (
                <ModalPortal
                    title={bucketLabels[policy.bucket ?? ''] ?? 'Biblioteka'}
                    onClose={() => setOpen(false)}
                >
                    <div className={s.dialog}>
                        <div className={s.toolbar}>
                            <h2>
                                {bucketLabels[policy.bucket ?? ''] ??
                                    'Biblioteka'}
                            </h2>
                            <Button onClick={() => setOpen(false)}>
                                Zamknij
                            </Button>
                        </div>
                        <MediaGrid
                            policy={policy}
                            selected={Number(value)}
                            onSelect={(row) => {
                                onChange(row.id)

                                setOpen(false)
                            }}
                        />
                    </div>
                </ModalPortal>
            )}
        </div>
    )
}
