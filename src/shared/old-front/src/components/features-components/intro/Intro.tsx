'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import styles from './Intro.module.scss'
import { PAGE_PATHS } from '@/shared/types-enums/paths'

const Intro = () => {
	const router = useRouter()

	useEffect(() => {
		const timer = setTimeout(() => {
			const token = localStorage.getItem('access_token')

			if (token) {
				router.replace(PAGE_PATHS.MAIN)
			} else {
				router.replace(PAGE_PATHS.AUTH)
			}
		}, 3000)

		return () => clearTimeout(timer)
	}, [router])

	return (
		<div className={styles.wrapper}>
			<div className={styles.logoWrapper}>
				<Image
					src="/logo.svg"
					alt="Logo firmy"
					width={160}
					height={160}
					priority
					className={styles.logo}
				/>
				<p className={styles.text}>
					Witamy w systemie CRM dla menedżerów
				</p>
			</div>
		</div>
	)
}

export default Intro
