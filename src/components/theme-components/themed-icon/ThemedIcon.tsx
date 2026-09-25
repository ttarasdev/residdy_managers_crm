import Image from 'next/image'
import c from './ThemedIcon.module.scss'

interface Props {
    path: string
    width?: number
    height?: number
    alt?: string
    loading?: 'eager' | 'lazy'
}

export function ThemedIcon({
    path,
    width = 15,
    height = 15,
    alt = '',
    loading = 'lazy',
}: Props) {
    return (
        <span
            className={c.icon}
            style={{ width, height }}
            role={alt ? 'img' : undefined}
            aria-label={alt || undefined}
            aria-hidden={alt ? undefined : true}
        >
            <Image
                className={c.light}
                src={`${path}_black.svg`}
                width={width}
                height={height}
                alt=""
                loading={loading}
            />
            <Image
                className={c.dark}
                src={`${path}_white.svg`}
                width={width}
                height={height}
                alt=""
                loading={loading}
            />
        </span>
    )
}
