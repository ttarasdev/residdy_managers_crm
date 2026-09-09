'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { accountAuthApi } from '../../../api/accounts/account-auth/account-auth.api'
import type { ForgotPasswordDto } from '../../../api/accounts/account-auth/account-auth.types'
import { routes } from '../../../shared/config/routes'
import { AuthShell } from '../auth-shell/AuthShell'
import { AuthFormInput } from '../auth-form-input/AuthFormInput'
import { AuthFormSubmit } from '../auth-form-submit/AuthFormSubmit'
import c from '../auth-shell/AuthShell.module.scss'

export function ForgotPasswordForm() {
    const router = useRouter()

    const [email, setEmail] = useState('')

    const request = useMutation({
        meta: { skipAuthHandling: true },
        mutationFn: (dto: ForgotPasswordDto) =>
            accountAuthApi.forgotPassword(dto),
    })

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (request.isPending) return

        const normalizedEmail = email.trim().toLowerCase()

        request.mutate(
            { email: normalizedEmail },
            {
                onSuccess: () =>
                    router.push(
                        `${routes.resetPassword}?${new URLSearchParams({ email: normalizedEmail })}`,
                    ),
            },
        )
    }

    return (
        <AuthShell
            title="Reset hasła"
            subtitle="Podaj email, wyślemy kod potwierdzający"
            linkHref={routes.auth}
            linkTitle="Wróć do logowania"
        >
            <form
                className={c.form}
                onSubmit={submit}
                aria-label="Reset hasła"
                aria-busy={request.isPending}
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
                    disabled={request.isPending}
                />
                {request.error && (
                    <p className={c.error} role="alert">
                        {request.error.message || 'Nie udało się wysłać kodu.'}
                    </p>
                )}
                <AuthFormSubmit
                    isLoading={request.isPending}
                    pendingTitle="Wysyłanie..."
                >
                    Wyślij kod
                </AuthFormSubmit>
            </form>
        </AuthShell>
    )
}
