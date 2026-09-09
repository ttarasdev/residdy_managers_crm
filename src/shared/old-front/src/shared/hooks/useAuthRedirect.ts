import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export const useAuthRedirect = () => {
	const router = useRouter()

	useEffect(() => {
		const checkAuth = async () => {
			const token = localStorage.getItem('access_token')
			if (!token) {
				router.replace('/auth')
				return
			}

			try {
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/manager-auth/check`,
					{
						method: 'POST',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					},
				)

				if (!res.ok) {
					throw new Error('Token not valid')
				}
			} catch (error) {
				localStorage.removeItem('access_token')
				router.replace('/auth')
			}
		}

		checkAuth()
	}, [router])
}
