'use client'

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getOperation, isRecord } from '../../features/crm/data'
import type { MediaPolicy } from '../../features/crm/media'
import { Button } from '../ui/Button'
import MediaFileInput from '../form-components/media-file-input/MediaFileInput'
import s from './media.module.scss'

export function MediaUpload({
    policy,
    announcement = false,
    onUploaded,
}: {
    policy: MediaPolicy
    announcement?: boolean
    onUploaded: (id: number) => void
}) {
    const [file, setFile] = useState<File | null>(null)

    const client = useQueryClient()

    const mutation = useMutation({
        mutationFn: async () => {
            if (!file) throw new Error('Wybierz plik')

            if (file.size > 20 * 1024 * 1024)
                throw new Error('Maksymalny rozmiar pliku: 20 MB')

            const result = announcement
                ? await getOperation(
                      'app-announcements',
                      'uploadImage',
                  )!.execute([file])
                : await getOperation(policy.kind, 'create')!.execute([
                      {
                          bucket: policy.bucket,
                          originalName: file.name,
                          ...(policy.kind !== 'public-assets'
                              ? {
                                    visibility:
                                        policy.bucket === 'manager_files'
                                            ? 'private'
                                            : undefined,
                                }
                              : {}),
                      },
                      file,
                  ])

            const item =
                isRecord(result) && isRecord(result.asset)
                    ? result.asset
                    : result

            if (!isRecord(item) || !Number.isSafeInteger(item.id))
                throw new Error('Niepoprawna odpowiedź serwera')

            return Number(item.id)
        },
        onSuccess: (id) => {
            void client.invalidateQueries({ queryKey: ['crm', policy.kind] })

            onUploaded(id)
        },
    })

    return (
        <div className={s.upload}>
            <MediaFileInput
                inputTitle="Nowy plik"
                disabled={mutation.isPending}
                accept={
                    policy.icon
                        ? 'image/svg+xml,image/png'
                        : policy.kind === 'private-assets'
                          ? undefined
                          : 'image/jpeg,image/png,image/webp,image/avif'
                }
                setFile={setFile}
            />
            <Button
                disabled={!file || mutation.isPending}
                onClick={() => mutation.mutate()}
            >
                {mutation.isPending ? 'Przesyłanie…' : 'Prześlij plik'}
            </Button>
            {mutation.error && <p role="alert">{mutation.error.message}</p>}
        </div>
    )
}
