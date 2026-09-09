import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { DecodedToken, ROLE_NAMES } from '@/api/manager-api/auth/auth.types'

export const useRoles = () => {
	const [roles, setRoles] = useState<ROLE_NAMES[]>([])

	useEffect(() => {
		const token = localStorage.getItem('access_token')
		if (!token) return

		try {
			const decoded = jwtDecode<DecodedToken>(token)
			const extractedRoles = decoded.roles.map((role) => role.name)
			setRoles(extractedRoles)
		} catch (err) {
			console.error('Invalid token:', err)
			setRoles([])
		}
	}, [])

	return { roles }
}
