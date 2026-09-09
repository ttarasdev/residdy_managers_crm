'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    LayoutDashboard,
    CreditCard,
    ScrollText,
    ChartNoAxesCombined,
    BriefcaseBusiness,
    UsersRound,
    FileText,
    Image,
    CalendarDays,
    Handshake,
    TicketPercent,
    Mail,
    Workflow,
    ShieldCheck,
    ChevronRight,
} from 'lucide-react'
import { resources } from '../../../features/crm/catalog'
import { useRoles } from '../../../shared/hooks/useRoles'
import c from './Sidebar.module.scss'

const icons = {
    Subskrypcje: CreditCard,
    'Dokumenty prawne': ScrollText,
    Finanse: ChartNoAxesCombined,
    Legalizacja: BriefcaseBusiness,
    Ludzie: UsersRound,
    Treści: FileText,
    Biblioteka: Image,
    Konsultacje: CalendarDays,
    Partnerzy: Handshake,
    Promocje: TicketPercent,
    Komunikacja: Mail,
    Automatyzacja: Workflow,
    Konto: ShieldCheck,
}

export function Sidebar() {
    const pathname = usePathname()

    const { hasAnyRole } = useRoles()

    const groups = [
        ...new Set(
            resources.filter((item) => !item.hidden).map((item) => item.group),
        ),
    ]

    return (
        <aside className={c.sidebar}>
            <Link className={c.brand} href="/main">
                <span>
                    Residdy<span className={c.brandSmall}>Workflow</span>
                </span>
            </Link>
            <nav aria-label="Menu główne" className={c.navigation}>
                <Link
                    href="/main"
                    className={c.home}
                    aria-current={pathname === '/main' ? 'page' : undefined}
                >
                    <LayoutDashboard size={17} />
                    Pulpit
                </Link>
                {groups.map((group) => {
                    const Icon = icons[group as keyof typeof icons]

                    return (
                        <details key={group} className={c.group} open>
                            <summary>
                                <Icon size={15} />
                                <span>{group}</span>
                                <ChevronRight size={13} />
                            </summary>
                            {resources
                                .filter(
                                    (item) =>
                                        item.group === group && !item.hidden,
                                )
                                .map((item) =>
                                    hasAnyRole(item.roles) ? (
                                        <Link
                                            key={item.id}
                                            href={item.path}
                                            className={c.link}
                                            aria-current={
                                                pathname === item.path ||
                                                pathname.startsWith(
                                                    `${item.path}/`,
                                                )
                                                    ? 'page'
                                                    : undefined
                                            }
                                        >
                                            {item.title}
                                        </Link>
                                    ) : (
                                        <span
                                            key={item.id}
                                            className={c.disabled}
                                            title="Nie masz dostępu do tego obszaru"
                                            aria-disabled="true"
                                        >
                                            {item.title}
                                        </span>
                                    ),
                                )}
                        </details>
                    )
                })}
            </nav>
            <footer className={c.footer}>
                <span className={c.dot} />
                Panel zarządzania
            </footer>
        </aside>
    )
}
