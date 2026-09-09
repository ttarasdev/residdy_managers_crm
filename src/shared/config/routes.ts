export const routes = {
    home: '/',
    auth: '/auth',
    forgotPassword: '/forgot-password',
    resetPassword: '/forgot-password/confirm',
    main: '/main',
    unauthorized: '/unauthorized',
    blog: '/main/blog',
    blogCategories: '/main/blog/categories',
    blogPosts: '/main/blog/posts',
    legalization: '/main/legalization',
    caseTypes: '/main/legalization/types',
    cases: '/main/legalization/cases',
    caseInstructions: '/main/legalization/instructions',
    caseReminders: '/main/legalization/reminders',
    mail: '/main/mail',
    mailJobs: '/main/mail/jobs',
    notifications: '/main/notifications',
    promocodes: '/main/promocodes',
    documents: '/main/documents',
    documentTypes: '/main/documents/types',
    documentTemplates: '/main/documents/templates',
    documentVariables: '/main/documents/variables',
    reminders: '/main/reminders',
    icons: '/main/icons',
    consultations: '/main/consultations',
    consultationCategories: '/main/consultations/categories',
    managers: '/main/managers',
    users: '/main/users',
    specialists: '/main/specialists',
    partners: '/main/partners',
    profile: '/main/profile',
    faq: '/main/faq',
    blogCategory: (id: string | number) =>
        `/main/blog/categories/${encodeURIComponent(String(id))}`,
    blogPost: (id: string | number) =>
        `/main/blog/posts/${encodeURIComponent(String(id))}`,
    caseType: (id: string | number) =>
        `/main/legalization/types/${encodeURIComponent(String(id))}`,
    case: (id: string | number) =>
        `/main/legalization/cases/${encodeURIComponent(String(id))}`,
    caseInstruction: (id: string | number) =>
        `/main/legalization/instructions/${encodeURIComponent(String(id))}`,
    caseReminder: (id: string | number) =>
        `/main/legalization/reminders/${encodeURIComponent(String(id))}`,
    mailJob: (id: string | number) =>
        `/main/mail/jobs/${encodeURIComponent(String(id))}`,
    promocode: (id: string | number) =>
        `/main/promocodes/${encodeURIComponent(String(id))}`,
    documentType: (id: string | number) =>
        `/main/documents/types/${encodeURIComponent(String(id))}`,
    documentTemplate: (id: string | number) =>
        `/main/documents/templates/${encodeURIComponent(String(id))}`,
    documentVariable: (id: string | number) =>
        `/main/documents/variables/${encodeURIComponent(String(id))}`,
    consultationCategory: (id: string | number) =>
        `/main/consultations/categories/${encodeURIComponent(String(id))}`,
    manager: (id: string | number) =>
        `/main/managers/${encodeURIComponent(String(id))}`,
    partner: (id: string | number) =>
        `/main/partners/${encodeURIComponent(String(id))}`,
} as const

/** Accept only internal private destinations, including their query and hash. */
export function getSafeReturnPath(value: string | null | undefined): string {
    if (!value || /[\\\u0000-\u0020]/.test(value)) return routes.main

    try {
        const url = new URL(value, 'https://crm.invalid')

        if (
            !value.startsWith('/') ||
            url.origin !== 'https://crm.invalid' ||
            (url.pathname !== routes.main &&
                !url.pathname.startsWith(`${routes.main}/`))
        )
            return routes.main

        return `${url.pathname}${url.search}${url.hash}`
    } catch {
        return routes.main
    }
}
