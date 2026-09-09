'use client'

import Link from 'next/link'
import { useState, type FormEvent } from 'react'
import { useSearchParams } from 'next/navigation'
import { useLogin } from '../../../shared/hooks/useLogin'
import { routes } from '../../../shared/config/routes'
import { AuthShell } from '../auth-shell/AuthShell'
import { AuthFormInput } from '../auth-form-input/AuthFormInput'
import { AuthFormSubmit } from '../auth-form-submit/AuthFormSubmit'
import c from '../auth-shell/AuthShell.module.scss'

export function LoginForm() {
    const searchParams = useSearchParams()

    const login = useLogin(searchParams.get('next'))

    const [email, setEmail] = useState('')

    const [password, setPassword] = useState('')

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (login.isPending) return

        login.mutate({ email: email.trim().toLowerCase(), password })
    }

    return (
        <AuthShell
            title="Witamy Ponownie!"
            subtitle="Witamy ponownie, wprowadź swoje dane"
            linkHref={routes.forgotPassword}
            linkTitle="Zapomniałeś hasło?"
        >
            <form
                className={c.form}
                onSubmit={submit}
                aria-label="Logowanie"
                aria-busy={login.isPending}
            >
                <AuthFormInput
                    name="email"
                    value={email}
                    onChange={setEmail}
                    iconPath="/auth/email"
                    labelTitle="email"
                    type="email"
                    autoComplete="username"
                    maxLength={254}
                    required
                    placeholder="manager@email.com"
                    disabled={login.isPending}
                />
                <AuthFormInput
                    name="password"
                    value={password}
                    onChange={setPassword}
                    iconPath="/auth/key"
                    labelTitle="hasło"
                    type="password"
                    autoComplete="current-password"
                    maxLength={128}
                    required
                    placeholder="Hasło"
                    disabled={login.isPending}
                />
                {login.error && (
                    <p className={c.error} role="alert">
                        {login.error.message || 'Nie udało się zalogować.'}
                    </p>
                )}
                <AuthFormSubmit
                    isLoading={login.isPending}
                    pendingTitle="Logowanie..."
                >
                    Zaloguj
                </AuthFormSubmit>
                <Link href="/confirm-account">Potwierdź nowe konto</Link>
            </form>
        </AuthShell>
    )
}
