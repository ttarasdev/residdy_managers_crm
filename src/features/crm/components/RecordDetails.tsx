'use client'

import Link from 'next/link'
import { PartnerBannerDetails } from './PartnerBannerDetails'
import { getResource } from '../catalog'
import { getRelation } from '../relations'
import { getOperation } from '../data'
import { useRoles } from '../../../shared/hooks/useRoles'
import { MediaThumbnail } from '../../../components/media-components/MediaThumbnail'
import { type MediaKind, mediaPolicy } from '../media'
import { RichTextInput } from '../../../components/form-components/tiptap-input/RichTextInput'
import { isRecord } from '../data'
import { label } from '../labels'
import { DataTable, displayValue } from './DataTable'
import {
    MailSignaturePreview,
    MailSignatureSnapshotPreview,
} from './MailSignaturePreview'
import c from './crm.module.scss'

export function RecordDetails({
    value,
    depth = 0,
    resource,
}: {
    value: unknown
    depth?: number
    resource?: string
}) {
    const { hasAnyRole } = useRoles()

    if (!isRecord(value)) {
        if (Array.isArray(value) && value.every(isRecord))
            return (
                <DataTable
                    rows={value}
                    columns={Object.keys(value[0] ?? {})
                        .filter(
                            (key) =>
                                !isRecord(value[0]?.[key]) &&
                                !Array.isArray(value[0]?.[key]),
                        )
                        .slice(0, 7)}
                />
            )

        return <p>{displayValue(value)}</p>
    }

    if (resource === 'partner-banners')
        return <PartnerBannerDetails value={value} />

    const scalar = Object.entries(value).filter(
        ([key, item]) =>
            key !== 'html' && !isRecord(item) && !Array.isArray(item),
    )

    const nested = Object.entries(value).filter(
        ([, item]) => isRecord(item) || Array.isArray(item),
    )

    return (
        <div className={c.details}>
            {resource &&
            ['public-assets', 'private-assets', 'private-variants'].includes(
                resource,
            ) &&
            typeof value.id === 'number' ? (
                <MediaThumbnail
                    kind={resource as MediaKind}
                    id={value.id}
                    row={value}
                    icon={value.bucket === 'icons'}
                    large
                />
            ) : null}
            {resource === 'mail-signatures' ? (
                <MailSignaturePreview value={value} />
            ) : null}
            <MailSignatureSnapshotPreview value={value.signatureSnapshot} />
            {value.contentJson && isRecord(value.contentJson) ? (
                <RichTextInput
                    value={value.contentJson}
                    onChange={() => {}}
                    disabled
                />
            ) : null}
            {typeof value.html === 'string' ? (
                <iframe
                    title="Podgląd wiadomości"
                    className={c.htmlPreview}
                    sandbox=""
                    referrerPolicy="no-referrer"
                    srcDoc={`<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; img-src data: blob:"><style>body{font:14px/1.6 sans-serif;padding:16px;color:#172b3a;background:white;overflow-wrap:anywhere}img{max-width:100%}</style>${value.html}`}
                />
            ) : null}
            {scalar.map(([key, item]) => {
                const media = mediaPolicy(
                    resource,
                    key,
                    getRelation(key, resource),
                )

                return media && typeof item === 'number' ? (
                    <section key={key}>
                        <h3>{label(key)}</h3>
                        <MediaThumbnail
                            kind={media.kind}
                            id={item}
                            icon={media.icon}
                            large
                        />
                    </section>
                ) : null
            })}
            <dl className={c.facts}>
                {scalar.map(([key, item]) => (
                    <div key={key}>
                        <dt>{label(key)}</dt>
                        <dd>
                            {(() => {
                                const related = getResource(
                                    getRelation(key, resource),
                                )

                                return related &&
                                    typeof item === 'number' &&
                                    getOperation(related.id, 'getById') &&
                                    hasAnyRole(related.roles) ? (
                                    <Link
                                        className={c.back}
                                        href={`${related.path}/${item}`}
                                    >
                                        {displayValue(item, key)} ↗
                                    </Link>
                                ) : (
                                    displayValue(item, key)
                                )
                            })()}
                        </dd>
                    </div>
                ))}
            </dl>
            {depth < 2 &&
                nested
                    .filter(
                        ([key]) =>
                            !['contentJson', 'signatureSnapshot'].includes(key),
                    )
                    .map(([key, item]) => (
                        <section className={c.nested} key={key}>
                            <h3>{label(key)}</h3>
                            <RecordDetails value={item} depth={depth + 1} />
                        </section>
                    ))}
        </div>
    )
}
