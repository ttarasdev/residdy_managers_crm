'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useRoles } from '../hooks/useRoles'
import { ROLE_NAMES } from '@/api/manager-api/auth/auth.types'

type Props = {
	allowedRoles: ROLE_NAMES[]
}

const RoleGuard = ({ allowedRoles }: Props) => {
	const { roles } = useRoles()
	const router = useRouter()

	useEffect(() => {
		const hasAccess = roles.some((role) => allowedRoles.includes(role))
		if (roles.length > 0 && !hasAccess) {
			router.replace('/unauthorized')
		}
	}, [roles, allowedRoles, router])

	return null
}

export default RoleGuard
