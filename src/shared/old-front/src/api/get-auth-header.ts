export function getAuthHeader(): Record<string, string> {
	if (typeof window === 'undefined') return {}

	const token = localStorage.getItem('access_token')
	if (!token) return {}

	return {
		Authorization: `Bearer ${token}`,
	}
}
