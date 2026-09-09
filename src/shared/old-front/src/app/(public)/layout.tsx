import c from './layout.module.scss'
import { ThemeProvider } from '@/shared/theme/ThemeProvider'

export default function PublicLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className={c.layout}>
			<ThemeProvider />
			<main className={c.layout__content}>{children}</main>
		</div>
	)
}
