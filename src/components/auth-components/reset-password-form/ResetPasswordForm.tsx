'use client'

import { useState, type FormEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { accountAuthApi } from '../../../api/accounts/account-auth/account-auth.api'
import type { ResetPasswordDto } from '../../../api/accounts/account-auth/account-auth.types'
import { routes } from '../../../shared/config/routes'
import { AuthShell } from '../auth-shell/AuthShell'
import { AuthFormInput } from '../auth-form-input/AuthFormInput'
import { AuthFormSubmit } from '../auth-form-submit/AuthFormSubmit'
import c from '../auth-shell/AuthShell.module.scss'

export function ResetPasswordForm() {
    const router = useRouter()

    const searchParams = useSearchParams()

    const [email, setEmail] = useState(() => searchParams.get('email') ?? '')

    const [code, setCode] = useState('')

    const [password, setPassword] = useState('')

    const [confirmation, setConfirmation] = useState('')

    const [localError, setLocalError] = useState<string | null>(null)

    const reset = useMutation({
        meta: { skipAuthHandling: true },
        mutationFn: (dto: ResetPasswordDto) =>
            accountAuthApi.resetPassword(dto),
    })

    const error = localError ?? reset.error?.message

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (reset.isPending) return

        setLocalError(null)

        if (password !== confirmation) {
            setLocalError('Hasła nie są takie same')

            return
        }

        reset.mutate(
            { email: email.trim().toLowerCase(), code, password },
            {
                onSuccess: () => router.replace(routes.auth),
            },
        )
    }

    return (
        <AuthShell
            title="Ustaw nowe hasło"
            subtitle="Wprowadź kod i nowe hasło, żeby dokończyć reset"
            linkHref={routes.forgotPassword}
            linkTitle="Wróć"
        >
            <form
                className={c.form}
                onSubmit={submit}
                aria-label="Nowe hasło"
                aria-busy={reset.isPending}
            >
                <AuthFormInput
                    name="email"
                    value={email}
                    onChange={setEmail}
                    iconPath="/auth/email"
                    labelTitle="email"
                    type="email"
                    autoComplete="email"
                    maxLength={254}
                    required
                    placeholder="manager@email.com"
                    disabled={reset.isPending}
                />
                <AuthFormInput
                    name="code"
                    value={code}
                    onChange={(value) =>
                        setCode(value.replace(/\D/g, '').slice(0, 6))
                    }
                    iconPath="/auth/key"
                    labelTitle="kod (6 cyfr)"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    pattern="[0-9]{6}"
                    maxLength={6}
                    required
                    placeholder="123456"
                    disabled={reset.isPending}
                />
                <AuthFormInput
                    name="password"
                    value={password}
                    onChange={setPassword}
                    iconPath="/auth/key"
                    labelTitle="nowe hasło"
                    type="password"
                    autoComplete="new-password"
                    minLength={8}
                    maxLength={128}
                    required
                    placeholder="8–128 znaków"
                    disabled={reset.isPending}
                />
                <AuthFormInput
                    name="confirmation"
                    value={confirmation}
                    onChange={setConfirmation}
                    iconPath="/auth/key"
                    labelTitle="powtórz hasło"
                    type="password"
                    autoComplete="new-password"
                    minLength={8}
                    maxLength={128}
                    required
                    placeholder="Powtórz hasło"
                    disabled={reset.isPending}
                />
                {error && (
                    <p className={c.error} role="alert">
                        {error}
                    </p>
                )}
                <AuthFormSubmit
                    isLoading={reset.isPending}
                    pendingTitle="Zapisywanie..."
                >
                    Ustaw nowe hasło
                </AuthFormSubmit>
            </form>
        </AuthShell>
    )
}
