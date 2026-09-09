'use client'

import type { InputHTMLAttributes } from 'react'
import c from './MediaFileInput.module.scss'

interface Props
    extends Omit<
        InputHTMLAttributes<HTMLInputElement>,
        'type' | 'value' | 'onChange' | 'multiple'
    > {
    setFile: (file: File | null) => void
    inputTitle?: string
}

export default function MediaFileInput({
    setFile,
    inputTitle = 'Plik:',
    ...props
}: Props) {
    return (
        <label className={c.label}>
            {inputTitle}
            <input
                {...props}
                type="file"
                className={c.input}
                onChange={(event) => setFile(event.target.files?.[0] ?? null)}
            />
        </label>
    )
}
