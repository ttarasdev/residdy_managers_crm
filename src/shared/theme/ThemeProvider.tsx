'use client'

import { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { setTheme, useTheme } from './theme'

export function ThemeProvider() {
    const { theme } = useTheme()

    const { manager } = useAuth()

    const managerId = manager?.id

    const managerTheme = manager?.theme

    useEffect(() => {
        document.documentElement.dataset.theme = theme
    }, [theme])

    useEffect(() => {
        if (managerTheme === 'white' || managerTheme === 'black')
            setTheme(managerTheme)
    }, [managerId, managerTheme])

    return null
}
