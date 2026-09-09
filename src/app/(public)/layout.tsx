import type { ReactNode } from 'react'
import c from './layout.module.scss'

export default function PublicLayout({ children }: { children: ReactNode }) {
    return <div className={c.layout}>{children}</div>
}
