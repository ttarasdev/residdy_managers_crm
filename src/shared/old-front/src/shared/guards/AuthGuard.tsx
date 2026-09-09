'use client'

import { useAuthRedirect } from '../hooks/useAuthRedirect'

const AuthGuard = () => {
	useAuthRedirect()
	return null
}

export default AuthGuard
