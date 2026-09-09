'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { resourceForPath } from '../../../features/crm/catalog'
import { RoleGuard } from '../../../shared/guards/RoleGuard'
import { Header } from '../header/Header'
import { Sidebar } from '../sidebar/Sidebar'
import c from './AppShell.module.scss'

export function AppShell({ children }: { children: ReactNode }) {
    const pathname = usePathname()

    const resource = resourceForPath(pathname)

    return (
        <div className={c.shell}>
            <Sidebar />
            <div className={c.body}>
                <Header />
                <main className={c.content} key={pathname}>
                    <RoleGuard
                        allowedRoles={resource?.roles ?? []}
                        fallback={
                            <section className={c.denied}>
                                <h1>Brak uprawnień</h1>
                                <p>Nie masz dostępu do tej strony.</p>
                            </section>
                        }
                    >
                        {children}
                    </RoleGuard>
                </main>
            </div>
        </div>
    )
}
