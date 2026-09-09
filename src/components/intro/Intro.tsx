'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { getAccessToken } from '../../api/auth-token'
import { routes } from '../../shared/config/routes'
import c from './Intro.module.scss'

export function Intro() {
    const router = useRouter()

    useEffect(() => {
        const timer = window.setTimeout(() => {
            router.replace(getAccessToken() ? routes.main : routes.auth)
        }, 3000)

        return () => window.clearTimeout(timer)
    }, [router])

    return (
        <main className={c.wrapper}>
            <div className={c.logoWrapper}>
                <Image
                    src="/logo.svg"
                    alt="Residdy"
                    width={160}
                    height={160}
                    priority
                    className={c.logo}
                />
                <p className={c.text}>Witamy w systemie CRM dla menedżerów</p>
            </div>
        </main>
    )
}
