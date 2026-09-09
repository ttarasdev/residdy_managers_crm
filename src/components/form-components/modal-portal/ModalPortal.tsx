'use client'

import { useEffect, useRef, useSyncExternalStore, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import c from './ModalPortal.module.scss'

const subscribe = () => () => {}

export default function ModalPortal({
    children,
    open = true,
    onClose,
    title,
}: {
    children: ReactNode
    open?: boolean
    onClose: () => void
    title: string
}) {
    const ready = useSyncExternalStore(
        subscribe,
        () => true,
        () => false,
    )

    const dialog = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        const element = dialog.current

        if (!element || !open) return

        const previous = document.activeElement as HTMLElement | null

        element.showModal()

        return () => {
            element.close()

            previous?.focus()
        }
    }, [open, ready])

    if (!ready || !open) return null

    return createPortal(
        <dialog
            ref={dialog}
            className={c.overlay}
            aria-label={title}
            onCancel={(event) => {
                event.preventDefault()

                onClose()
            }}
        >
            <div className={c.content}>{children}</div>
        </dialog>,
        document.body,
    )
}
