'use client'

import { useQuery } from '@tanstack/react-query'
import { mailSignaturesApi } from '../../../api/mail/mail-signatures/mail-signatures.api'
import { MediaThumbnail } from '../../../components/media-components/MediaThumbnail'
import { isRecord } from '../data'
import c from './crm.module.scss'
import s from '../../../components/media-components/media.module.scss'

export function MailSignaturePreview({
    id,
    value,
}: {
    id?: number
    value?: Record<string, unknown>
}) {
    const query = useQuery({
        queryKey: ['crm', 'mail-signatures', 'preview', id],
        enabled: Boolean(id) && !value,
        queryFn: ({ signal }) => mailSignaturesApi.getById(id!, { signal }),
    })

    const signature = value ?? query.data

    if (!signature)
        return query.isError ? (
            <p role="alert">Nie udało się pobrać podpisu.</p>
        ) : null

    return (
        <section
            className={`${c.card} ${s.signature}`}
            aria-label="Podgląd podpisu e-mail"
        >
            {signature.logoAssetId ? (
                <MediaThumbnail
                    kind="public-assets"
                    id={Number(signature.logoAssetId)}
                />
            ) : null}
            <strong>{String(signature.companyName ?? '')}</strong>
            {['address', 'email', 'website', 'text'].map((key) => {
                const text = (signature as Record<string, unknown>)[key]

                return text ? <p key={key}>{String(text)}</p> : null
            })}
        </section>
    )
}

export function MailSignatureSnapshotPreview({ value }: { value: unknown }) {
    if (!isRecord(value) || typeof value.html !== 'string') return null

    const html =
        typeof value.logo === 'string' && /^[A-Za-z0-9+/=]+$/.test(value.logo)
            ? value.html.replaceAll(
                  'cid:residdy-signature-logo',
                  `data:image/png;base64,${value.logo}`,
              )
            : value.html

    return (
        <iframe
            title="Zapisany podpis kampanii"
            className={c.htmlPreview}
            sandbox=""
            referrerPolicy="no-referrer"
            srcDoc={`<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; img-src data:"><style>body{padding:16px;background:white}</style>${html}`}
        />
    )
}
