import { Suspense } from 'react'
import { LoginForm } from '@/components/auth-components/login-form/LoginForm'

export default function AuthPage() {
    return (
        <Suspense fallback={null}>
            <LoginForm />
        </Suspense>
    )
}
