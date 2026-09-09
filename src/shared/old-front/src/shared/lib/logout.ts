import { PAGE_PATHS } from '../types-enums/paths'

export const logout = (router: { replace: (path: string) => void }) => {
	localStorage.removeItem('access_token')
	router.replace(PAGE_PATHS.AUTH)
}
