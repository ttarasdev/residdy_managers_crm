'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, LogOut, Moon, Sun, UserRound } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { resourceForPath } from '../../../features/crm/catalog'
import { useAuth } from '../../../shared/hooks/useAuth'
import { useTheme, type Theme } from '../../../shared/theme/theme'
import { managersApi } from '../../../api/managers/managers/managers.api'
import {
    ManagerTheme,
    type Manager,
} from '../../../api/managers/managers/managers.types'
import { Button } from '../../ui/Button'
import c from './Header.module.scss'

export function Header() {
    const pathname = usePathname()

    const resource = resourceForPath(pathname)

    const { manager, logout } = useAuth()

    const { theme, setTheme } = useTheme()

    const client = useQueryClient()

    const mutation = useMutation({
        mutationFn: (value: Theme) =>
            managersApi.updateMe({
                theme:
                    value === 'black' ? ManagerTheme.BLACK : ManagerTheme.WHITE,
            }),
    })

    function toggleTheme() {
        const previous = theme

        const next = theme === 'black' ? 'white' : 'black'

        setTheme(next)

        mutation.mutate(next, {
            onSuccess: () =>
                client.setQueryData<Manager>(['auth', 'manager'], (value) =>
                    value
                        ? {
                              ...value,
                              theme:
                                  next === 'black'
                                      ? ManagerTheme.BLACK
                                      : ManagerTheme.WHITE,
                          }
                        : value,
                ),
            onError: () => setTheme(previous),
        })
    }

    return (
        <header className={c.header}>
            <nav className={c.breadcrumb} aria-label="Ścieżka">
                <Link href="/main">Workflow</Link>
                <ChevronRight size={14} />
                <span>
                    {resource?.title ??
                        (pathname === '/main/profile'
                            ? 'Mój profil'
                            : 'Pulpit')}
                </span>
            </nav>
            <div className={c.actions}>
                {mutation.error && (
                    <span role="alert" className={c.error}>
                        Nie zapisano motywu
                    </span>
                )}
                <Button
                    variant="ghost"
                    onClick={toggleTheme}
                    disabled={mutation.isPending}
                    aria-label={
                        theme === 'black' ? 'Jasny motyw' : 'Ciemny motyw'
                    }
                >
                    {theme === 'black' ? <Sun size={18} /> : <Moon size={18} />}
                </Button>
                <Link href="/main/profile" className={c.profile}>
                    <span className={c.avatar}>
                        <UserRound size={17} />
                    </span>
                    <span>
                        {manager?.name || 'Menedżer'}
                        <small>
                            {manager?.roles
                                ?.map((role) => role.name)
                                .join(' · ')}
                        </small>
                    </span>
                </Link>
                <Button
                    variant="ghost"
                    onClick={logout}
                    aria-label="Wyloguj się"
                    title="Wyloguj się"
                >
                    <LogOut size={17} />
                </Button>
            </div>
        </header>
    )
}
