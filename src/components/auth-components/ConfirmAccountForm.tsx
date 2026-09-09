'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useMutation } from '@tanstack/react-query'
import { accountAuthApi } from '../../api/accounts/account-auth/account-auth.api'
import { AuthShell } from './auth-shell/AuthShell'
import { AuthFormInput } from './auth-form-input/AuthFormInput'
import { Button } from '../ui/Button'
import c from './auth-shell/AuthShell.module.scss'

export function ConfirmAccountForm() {
    const [email, setEmail] = useState('')

    const [code, setCode] = useState('')

    const mutation = useMutation({
        meta: { skipAuthHandling: true },
        mutationFn: (action: 'confirm' | 'resend') =>
            action === 'confirm'
                ? accountAuthApi.confirm({
                      email: email.trim().toLowerCase(),
                      code: code.trim(),
                  })
                : accountAuthApi.resend({ email: email.trim().toLowerCase() }),
    })

    return (
        <AuthShell
            title="Potwierdź konto"
            subtitle="Wpisz kod otrzymany na adres e-mail"
            linkHref="/auth"
            linkTitle="Wróć do logowania"
        >
            <form
                className={c.form}
                onSubmit={(event) => {
                    event.preventDefault()

                    if (!mutation.isPending) mutation.mutate('confirm')
                }}
            >
                <AuthFormInput
                    name="email"
                    labelTitle="E-mail"
                    iconPath="/auth/email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={setEmail}
                    disabled={mutation.isPending}
                />
                <AuthFormInput
                    name="code"
                    pattern="[0-9]{6}"
                    inputMode="numeric"
                    minLength={6}
                    maxLength={6}
                    labelTitle="Kod"
                    iconPath="/auth/key"
                    required
                    autoComplete="one-time-code"
                    value={code}
                    onChange={setCode}
                    disabled={mutation.isPending}
                />
                {mutation.error && (
                    <p className={c.error} role="alert">
                        {mutation.error.message}
                    </p>
                )}
                {mutation.isSuccess && (
                    <p role="status">
                        {mutation.variables === 'confirm' ? (
                            <>
                                Konto potwierdzone.{' '}
                                <Link href="/auth">Zaloguj się</Link>
                            </>
                        ) : (
                            'Wysłano kod potwierdzający.'
                        )}
                    </p>
                )}
                <Button
                    type="submit"
                    variant="primary"
                    disabled={mutation.isPending}
                >
                    Potwierdź konto
                </Button>
                <Button
                    disabled={mutation.isPending || !email.trim()}
                    onClick={() => mutation.mutate('resend')}
                >
                    Wyślij kod ponownie
                </Button>
            </form>
        </AuthShell>
    )
}
