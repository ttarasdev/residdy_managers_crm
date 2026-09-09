'use client'

import Link from 'next/link'
import { useQueries } from '@tanstack/react-query'
import {
    ArrowUpRight,
    BriefcaseBusiness,
    CalendarDays,
    FileText,
    Handshake,
    Mail,
    Bell,
} from 'lucide-react'
import { useAuth } from '../../../shared/hooks/useAuth'
import { useRoles } from '../../../shared/hooks/useRoles'
import { resources } from '../catalog'
import { getOperation, normalizeRows } from '../data'
import c from './dashboard.module.scss'

const highlights = [
    'cases',
    'consultation-bookings',
    'blog-posts',
    'partners',
    'mail-jobs',
    'user-notification-jobs',
]

const icons = [BriefcaseBusiness, CalendarDays, FileText, Handshake, Mail, Bell]

export function Dashboard({ group }: { group?: string }) {
    const { manager } = useAuth()

    const { hasAnyRole } = useRoles()

    const visible = resources.filter(
        (resource) =>
            !resource.hidden &&
            (!group || resource.group === group) &&
            hasAnyRole(resource.roles),
    )

    const featured = highlights
        .map((id) => resources.find((resource) => resource.id === id)!)
        .filter((resource) => hasAnyRole(resource.roles))

    const counts = useQueries({
        queries: featured.map((resource) => ({
            queryKey: ['crm', resource.id, 'dashboard'],
            queryFn: async ({ signal }: { signal: AbortSignal }) =>
                normalizeRows(
                    await getOperation(resource.id, 'list')!.execute(
                        [{ page: 1, limit: 1 }],
                        { signal },
                    ),
                ).total,
        })),
    })

    return (
        <div className={c.page}>
            <header className={c.header}>
                <p className={c.eyebrow}>RESIDDY WORKFLOW</p>
                <h1>
                    {group ??
                        `Dzień dobry${manager?.name ? `, ${manager.name}` : ''}`}
                </h1>
                <p>
                    Wszystko, czego potrzebujesz do codziennej pracy — w jednym
                    miejscu.
                </p>
            </header>
            {!group && (
                <div className={c.stats}>
                    {featured.map((resource, index) => {
                        const Icon = icons[highlights.indexOf(resource.id)]

                        return (
                            <Link
                                href={resource.path}
                                className={c.stat}
                                key={resource.id}
                            >
                                <div>
                                    <Icon size={18} />
                                    <ArrowUpRight size={15} />
                                </div>
                                <strong>
                                    {counts[index].isPending
                                        ? '…'
                                        : counts[index].error
                                          ? '—'
                                          : counts[index].data}
                                </strong>
                                <span>{resource.title}</span>
                                {counts[index].error && (
                                    <small>Dane niedostępne</small>
                                )}
                            </Link>
                        )
                    })}
                </div>
            )}
            <section>
                <div className={c.sectionHeader}>
                    <h2>{group ? 'Obszary pracy' : 'Twój obszar pracy'}</h2>
                    <span>{visible.length} dostępnych modułów</span>
                </div>
                <div className={c.modules}>
                    {visible.map((resource) => (
                        <Link
                            key={resource.id}
                            href={resource.path}
                            className={c.module}
                        >
                            <div>
                                <span className={c.tag}>{resource.group}</span>
                                <ArrowUpRight size={17} />
                            </div>
                            <h3>{resource.title}</h3>
                            <p>{resource.description}</p>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    )
}
