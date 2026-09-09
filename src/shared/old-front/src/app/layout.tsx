import type { Metadata } from 'next'
import './globals.scss'
import { Inter } from 'next/font/google'
import { Providers } from '@/shared/providers/Providers'

const inter = Inter({
	subsets: ['latin', 'latin-ext'],
	weight: ['100', '200', '300', '400', '500', '600', '700'],
	display: 'swap',
	variable: '--font-inter',
})

export const metadata: Metadata = {
	title: 'Managers CRM — system dla menedżerów',
	description:
		'Prosty i skuteczny CRM dla menedżerów: leady, klienci, transakcje, zadania i raporty.',
	applicationName: 'Managers CRM',
	keywords: [
		'CRM',
		'menedżerowie',
		'klienci',
		'transakcje',
		'zadania',
		'raporty',
		'RBAC',
	],
}

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="pl" data-theme="white" className={inter.className}>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
