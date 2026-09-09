'use client'

import c from '../auth/AuthPage.module.scss'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { validateEmail } from '@/shared/lib/authFunctions'
import AuthFormHeader from '@/components/features-components/auth-form/auth-form-header/AuthFormHeader'
import AuthFormInput from '@/components/features-components/auth-form/auth-form-input/AuthFormInput'
import AuthFormSubmit from '@/components/features-components/auth-form/auth-form-submit/AuthFormSubmit'
import { ThemedIcon } from '@/components/features-components/theme-icon/ThemedIcon'
import { useThemeStore } from '@/shared/theme/theme.store'
import { Theme } from '@/shared/types-enums/theme'
import Image from 'next/image'
import { managerResetApi } from '@/api/manager-api/manager-reset/manager-reset.api'

export default function ForgotPasswordPage() {
	const router = useRouter()
	const setThemeLocal = useThemeStore((s) => s.setTheme)

	const [email, setEmail] = useState('')
	const [localError, setLocalError] = useState<string | null>(null)

	const normalizedEmail = useMemo(() => email.trim().toLowerCase(), [email])
	const isEmailValid = validateEmail(normalizedEmail)

	const { mutateAsync, isPending, isSuccess } = useMutation({
		mutationFn: () => managerResetApi.request({ email: normalizedEmail }),
	})

	const canSubmit = isEmailValid && !isPending

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLocalError(null)

		if (!isEmailValid) {
			setLocalError('Niepoprawny email')
			return
		}

		try {
			await mutateAsync()

			const q = new URLSearchParams({ email: normalizedEmail })
			router.push(`/forgot-password/confirm?${q.toString()}`)
		} catch (err) {
			console.error('❌ Forgot password error:', err)
			setLocalError((err as Error).message || 'Błąd wysyłania kodu')
		}
	}

	return (
		<div className={c.auth__container}>
			<ThemedIcon path="/logo_large" width={203} height={60} />

			<AuthFormHeader
				title="Reset hasła"
				subtitle="Podaj email, wyślemy kod potwierdzający"
			/>

			<form className={c.auth} onSubmit={handleSubmit}>
				<AuthFormInput
					value={email}
					onChange={setEmail}
					iconPath="/auth/email"
					labelTitle="email"
					type="email"
					placeholder="manager@email.com"
				/>

				<p className={c.auth__error}></p>

				<AuthFormSubmit
					buttonTitle={isPending ? 'Wysyłanie...' : 'Wyślij kod'}
					submit={handleSubmit}
					isLoading={isPending}
				/>
			</form>

			{localError && <p className={c.auth__error}>{localError}</p>}

			{isSuccess && !localError ? (
				<p className={c.auth__success}>
					Jeśli konto istnieje, wysłaliśmy kod na ten email.
				</p>
			) : null}

			<Link className={c.auth__forgot} href="/auth">
				Wróć do logowania
			</Link>

			<div className={c.theme}>
				<button
					type="button"
					onClick={() => setThemeLocal(Theme.BLACK)}
					className={`${c.theme__button} ${c.moon}`}
				>
					<Image
						alt="moon"
						src="/menu_icons/moon.svg"
						width={15}
						height={15}
					/>
				</button>

				<button
					type="button"
					onClick={() => setThemeLocal(Theme.WHITE)}
					className={`${c.theme__button} ${c.sun}`}
				>
					<ThemedIcon path="/menu_icons/sun" width={15} height={15} />
				</button>
			</div>
		</div>
	)
}
