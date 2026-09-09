import type { ReactNode } from 'react'
import styles from './AccessState.module.scss'

export function AccessState({
    title,
    children,
    onRetry,
    onExit,
    pending = false,
}: {
    title: string
    children?: ReactNode
    onRetry?: () => void
    onExit?: () => void
    pending?: boolean
}) {
    return (
        <main className={styles.state}>
            <div role="alert">
                <h1>{title}</h1>
                {children && <p>{children}</p>}
            </div>
            <div className={styles.actions}>
                {onRetry && (
                    <button type="button" onClick={onRetry} disabled={pending}>
                        Spróbuj ponownie
                    </button>
                )}
                {onExit && (
                    <button type="button" onClick={onExit}>
                        Wyloguj się
                    </button>
                )}
            </div>
        </main>
    )
}
