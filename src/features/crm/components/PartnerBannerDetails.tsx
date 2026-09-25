'use client'

import { useState } from 'react'
import { MediaThumbnail } from '../../../components/media-components/MediaThumbnail'
import { isRecord } from '../data'
import { valueLabel } from '../labels'
import s from './PartnerBannerDetails.module.scss'

const explanations: Record<string, string> = {
    pending_review:
        'Sprawdź obraz, treści i link. Następnie zatwierdź lub odrzuć reklamę.',
    approved: 'Reklama zatwierdzona. Aktywuj ją, aby rozpocząć wyświetlanie.',
    active: 'Reklama jest aktywna. Możesz zakończyć jej wyświetlanie.',
    finished: 'Wyświetlanie reklamy zostało zakończone.',
    rejected:
        'Reklama odrzucona. Partner może poprawić ją i przesłać ponownie.',
    draft: 'Szkic reklamy — oczekuje na przesłanie do moderacji.',
}

const date = (value: unknown) => {
    if (!value) return '—'

    const parsed = new Date(String(value))

    return Number.isNaN(parsed.getTime()) ? '—' : parsed.toLocaleString('pl-PL')
}

export function PartnerBannerDetails({
    value,
}: {
    value: Record<string, unknown>
}) {
    const [language, setLanguage] = useState('Pl')

    const big = value.type === 'big'

    const company = isRecord(value.company) ? value.company : undefined

    const status = String(value.status)

    const views = Number(value.viewsCount) || 0

    const clicks = Number(value.clicksCount) || 0

    let url: string | undefined

    try {
        const link = new URL(String(value.linkUrl))

        if (
            ['https:', 'http:'].includes(link.protocol) &&
            !link.username &&
            !link.password
        )
            url = link.href
    } catch {}

    return (
        <div className={s.layout}>
            <section className={s.previewSection}>
                <div className={s.heading}>
                    <h3>Podgląd reklamy</h3>
                    <select
                        aria-label="Język podglądu"
                        value={language}
                        onChange={(event) => setLanguage(event.target.value)}
                    >
                        <option value="Pl">Polski</option>
                        <option value="Ua">Ukraiński</option>
                        <option value="En">Angielski</option>
                        <option value="Ru">Rosyjski</option>
                    </select>
                </div>
                <div className={`${s.preview} ${big ? s.big : s.small}`}>
                    <div className={s.image}>
                        {typeof value.photoId === 'number' ? (
                            <MediaThumbnail
                                kind="private-variants"
                                id={value.photoId}
                                large
                            />
                        ) : (
                            <span>Brak obrazu</span>
                        )}
                    </div>
                    <div className={s.copy}>
                        <strong>
                            {String(value[`title${language}`] || 'Brak tytułu')}
                        </strong>
                        <p>
                            {String(
                                value[`subtitle${language}`] || 'Brak opisu',
                            )}
                        </p>
                    </div>
                </div>
                <small>
                    {big ? 'Duży plakat · 37:50' : 'Mały baner · 370 × 120'} ·
                    Podgląd orientacyjny
                </small>
            </section>
            <section className={s.info}>
                <div className={s.status} data-active={status === 'active'}>
                    {valueLabel(status)}
                </div>
                <p>
                    {explanations[status] ?? 'Sprawdź aktualny status reklamy.'}
                </p>
                {company && company.status !== 'active' && (
                    <p className={s.notice}>
                        Firma nie jest aktywna — reklama nie może być
                        wyświetlana.
                    </p>
                )}
                {value.rejectReason ? (
                    <p className={s.notice}>
                        Powód odrzucenia: {String(value.rejectReason)}
                    </p>
                ) : null}
                <dl>
                    <div>
                        <dt>Firma</dt>
                        <dd>
                            {String(
                                company?.companyName ?? `#${value.companyId}`,
                            )}
                        </dd>
                    </div>
                    <div>
                        <dt>Link docelowy</dt>
                        <dd>
                            {url ? (
                                <a
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {url} ↗
                                </a>
                            ) : (
                                'Brak prawidłowego linku'
                            )}
                        </dd>
                    </div>
                    <div>
                        <dt>Wyświetlenia</dt>
                        <dd>
                            {views.toLocaleString('pl-PL')} /{' '}
                            {value.maxViews == null
                                ? 'bez limitu'
                                : Number(value.maxViews).toLocaleString(
                                      'pl-PL',
                                  )}
                        </dd>
                    </div>
                    <div>
                        <dt>Kliknięcia</dt>
                        <dd>{clicks.toLocaleString('pl-PL')}</dd>
                    </div>
                    <div>
                        <dt>CTR</dt>
                        <dd>
                            {(views
                                ? (clicks / views) * 100
                                : 0
                            ).toLocaleString('pl-PL', {
                                maximumFractionDigits: 2,
                            })}
                            %
                        </dd>
                    </div>
                    <div>
                        <dt>Początek</dt>
                        <dd>{date(value.startDate)}</dd>
                    </div>
                    <div>
                        <dt>Koniec</dt>
                        <dd>
                            {value.endDate
                                ? date(value.endDate)
                                : 'Bez daty końcowej'}
                        </dd>
                    </div>
                </dl>
            </section>
        </div>
    )
}
