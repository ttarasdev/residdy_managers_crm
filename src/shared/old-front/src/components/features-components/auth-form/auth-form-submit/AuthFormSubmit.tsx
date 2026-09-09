'use client'

import c from './AuthFormSubmit.module.scss'

interface Props {
	submit: (e: React.FormEvent) => void
	isLoading: boolean
	buttonTitle: string
}

const AuthFormSubmit: React.FC<Props> = ({
	submit,
	isLoading,
	buttonTitle,
}) => {
	return (
		<button onClick={submit} className={c.submit} disabled={isLoading}>
			{isLoading ? 'Logowanie...' : buttonTitle}
		</button>
	)
}

export default AuthFormSubmit
