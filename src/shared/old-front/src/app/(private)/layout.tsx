import Header from '@/components/features-components/header/Header'
import Menu from '@/components/features-components/menu/Menu'
import AuthGuard from '@/shared/guards/AuthGuard'
import c from './layout.module.scss'
import { ThemeProvider } from '@/shared/theme/ThemeProvider'

export default function PrivateLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className={c.layout}>
			<ThemeProvider />
			<AuthGuard />
			<Header />
			<div className={c.layout__body}>
				<Menu />
				<main className={c.layout__content}>{children}</main>
			</div>
		</div>
	)
}
