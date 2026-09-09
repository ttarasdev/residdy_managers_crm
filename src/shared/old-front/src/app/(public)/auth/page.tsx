'use client'

import c from './AuthPage.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { useThemeStore } from '@/shared/theme/theme.store'
import { useState } from 'react'
import { validateEmail, validatePass } from '@/shared/lib/authFunctions'
import { Theme } from '@/shared/types-enums/theme'
import { PAGE_PATHS } from '@/shared/types-enums/paths'
import AuthFormHeader from '@/components/features-components/auth-form/auth-form-header/AuthFormHeader'
import AuthFormInput from '@/components/features-components/auth-form/auth-form-input/AuthFormInput'
import AuthFormSubmit from '@/components/features-components/auth-form/auth-form-submit/AuthFormSubmit'
import { ThemedIcon } from '@/components/features-components/theme-icon/ThemedIcon'
import { authApi } from '@/api/manager-api/auth/auth'
import { managerApi } from '@/api/manager-api/manager/manager.api'

const AuthPage = () => {
	const router = useRouter()
	const queryClient = useQueryClient()
	const setThemeLocal = useThemeStore((s) => s.setTheme)

	const [loginValue, setLoginValue] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const isLoginValid = validateEmail(loginValue)
	const isPasswordValid = validatePass(password)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError(null)
		if (!isLoginValid || !isPasswordValid) {
			setError('Niepoprawny email lub hasło')
			return
		}
		setLoading(true)
		try {
			const { token } = await authApi.login({
				login: loginValue,
				password,
			})
			localStorage.setItem('access_token', token)
			const me = await queryClient.fetchQuery({
				queryKey: ['manager-me'],
				queryFn: ({ signal }) => managerApi.getCurrent({ signal }),
			})

			setThemeLocal((me?.theme as Theme) || Theme.WHITE)

			router.replace(PAGE_PATHS.MAIN)
		} catch (err) {
			console.error('❌ Login error:', err)
			setError((err as Error).message || 'Błąd logowania')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className={c.auth__container}>
			<ThemedIcon path="/logo_large" width={203} height={60} />
			<AuthFormHeader
				title="Witamy Ponownie!"
				subtitle="Witamy ponownie, wprowadź swoje dane"
			/>
			<form className={c.auth}>
				<AuthFormInput
					value={loginValue}
					onChange={setLoginValue}
					iconPath="/auth/email"
					labelTitle="email"
					type="email"
					placeholder="lorem@gmail.com"
				/>
				<AuthFormInput
					value={password}
					onChange={setPassword}
					iconPath="/auth/key"
					labelTitle="hasło"
					type="password"
					placeholder="password"
				/>
				<p className={c.auth__error}></p>
				<AuthFormSubmit
					buttonTitle="Zaloguj"
					submit={handleSubmit}
					isLoading={loading}
				/>
			</form>
			{error && <p className={c.auth__error}>{error}</p>}
			<Link className={c.auth__forgot} href="/forgot-password">
				Zapomniałeś hasło?
			</Link>

			<div className={c.theme}>
				<button
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
					onClick={() => setThemeLocal(Theme.WHITE)}
					className={`${c.theme__button} ${c.sun}`}
				>
					<ThemedIcon path="/menu_icons/sun" />
				</button>
			</div>
		</div>
	)
}

export default AuthPage
