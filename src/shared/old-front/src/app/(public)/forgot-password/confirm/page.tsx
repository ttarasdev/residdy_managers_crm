'use client'

import c from '../../auth/AuthPage.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { useMutation } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import AuthFormHeader from '@/components/features-components/auth-form/auth-form-header/AuthFormHeader'
import AuthFormInput from '@/components/features-components/auth-form/auth-form-input/AuthFormInput'
import AuthFormSubmit from '@/components/features-components/auth-form/auth-form-submit/AuthFormSubmit'
import { ThemedIcon } from '@/components/features-components/theme-icon/ThemedIcon'
import { useThemeStore } from '@/shared/theme/theme.store'
import { Theme } from '@/shared/types-enums/theme'
import { validateEmail } from '@/shared/lib/authFunctions'
import { managerResetApi } from '@/api/manager-api/manager-reset/manager-reset.api'

const passRule = /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/
const codeRule = /^\d{6}$/

export default function ForgotPasswordConfirmPage() {
	const router = useRouter()
	const sp = useSearchParams()
	const setThemeLocal = useThemeStore((s) => s.setTheme)

	const initialEmail = useMemo(
		() => (sp.get('email') || '').trim().toLowerCase(),
		[sp],
	)

	const [email, setEmail] = useState(initialEmail)
	const [code, setCode] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [localError, setLocalError] = useState<string | null>(null)

	const normalizedEmail = useMemo(() => email.trim().toLowerCase(), [email])

	const { mutateAsync, isPending } = useMutation({
		mutationFn: () =>
			managerResetApi.confirm({
				email: normalizedEmail,
				code: code.trim(),
				newPassword,
			}),
	})

	const isEmailValid = validateEmail(normalizedEmail)
	const isCodeValid = codeRule.test(code.trim())
	const isPassValid = passRule.test(newPassword)
	const isConfirmValid =
		newPassword === confirmPassword && confirmPassword.length > 0

	const canSubmit =
		isEmailValid &&
		isCodeValid &&
		isPassValid &&
		isConfirmValid &&
		!isPending

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLocalError(null)

		if (!isEmailValid) {
			setLocalError('Niepoprawny email')
			return
		}
		if (!isCodeValid) {
			setLocalError('Kod musi mieć 6 cyfr')
			return
		}
		if (!isPassValid) {
			setLocalError(
				'Hasło min. 8 znaków, 1 wielka litera i 1 znak specjalny',
			)
			return
		}
		if (!isConfirmValid) {
			setLocalError('Hasła nie są takie same')
			return
		}

		try {
			await mutateAsync()
			router.push('/auth')
		} catch (err) {
			console.error('❌ Confirm reset error:', err)
			setLocalError(
				(err as Error).message || 'Nieprawidłowy kod lub email',
			)
		}
	}

	return (
		<div className={c.auth__container}>
			<ThemedIcon path="/logo_large" width={203} height={60} />

			<AuthFormHeader
				title="Ustaw nowe hasło"
				subtitle="Wprowadź kod i nowe hasło, żeby dokończyć reset"
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

				<AuthFormInput
					value={code}
					onChange={(v) =>
						setCode(String(v).replace(/\D/g, '').slice(0, 6))
					}
					iconPath="/auth/key"
					labelTitle="kod (6 cyfr)"
					type="text"
					placeholder="123456"
				/>

				<AuthFormInput
					value={newPassword}
					onChange={setNewPassword}
					iconPath="/auth/key"
					labelTitle="nowe hasło"
					type="password"
					placeholder="Nowe hasło"
				/>

				<AuthFormInput
					value={confirmPassword}
					onChange={setConfirmPassword}
					iconPath="/auth/key"
					labelTitle="powtórz hasło"
					type="password"
					placeholder="Powtórz hasło"
				/>
				<p className={c.auth__error}>{localError ?? ''}</p>

				<AuthFormSubmit
					buttonTitle={
						isPending ? 'Zapisywanie...' : 'Ustaw nowe hasło'
					}
					submit={handleSubmit}
					isLoading={isPending}
				/>
			</form>

			<Link className={c.auth__forgot} href="/forgot-password">
				Wróć
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
