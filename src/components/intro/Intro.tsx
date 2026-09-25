'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { getAccessToken } from '../../api/auth-token'
import { routes } from '../../shared/config/routes'
import c from './Intro.module.scss'

declare global {
    interface Window {
        __residdyIntro?: WeakSet<HTMLElement>
    }
}

export function Intro() {
    const intro = useRef<HTMLElement>(null)

    const [isRedirecting, setIsRedirecting] = useState(false)

    useEffect(() => {
        if (intro.current && window.__residdyIntro?.has(intro.current)) return

        const timer = window.setTimeout(() => {
            setIsRedirecting(true)

            let destination: string = routes.auth

            try {
                if (getAccessToken()) destination = routes.main
            } catch {
                destination = routes.auth
            }

            window.location.replace(destination)
        }, 3000)

        return () => window.clearTimeout(timer)
    }, [])

    return (
        <main id="residdy-intro" ref={intro} className={c.wrapper}>
            <div className={c.logoWrapper}>
                <Image
                    src="/logo.svg"
                    alt="Residdy"
                    width={160}
                    height={160}
                    priority
                    className={c.logo}
                />
                <p className={c.text} role="status" aria-live="polite">
                    {isRedirecting
                        ? 'Otwieramy stronę, proszę czekać…'
                        : 'Witamy w systemie CRM dla menedżerów'}
                </p>
            </div>
        </main>
    )
}
