/** UI constraints copied from backend v2 DTOs; the server still validates every request. */
export interface FieldRules {
    min?: number
    max?: number
    step?: number
    minLength?: number
    maxLength?: number
    pattern?: string
    accept?: string
    maxFileSize?: number
    hint?: string
}

const rules: Record<string, Record<string, FieldRules>> = {
    'subscription-plans': {
        code: {
            pattern: '[a-z][a-z0-9_-]{1,39}',
            hint: 'Ten sam kod tworzy kolejną wersję planu i wycofuje poprzednią.',
        },
        name: { minLength: 1, maxLength: 100 },
        rank: { min: 0, max: 1000, step: 1 },
        documentsPerMonth: {
            min: -1,
            max: 1000000,
            step: 1,
            hint: '−1 oznacza brak limitu.',
        },
        openCases: {
            min: -1,
            max: 1000000,
            step: 1,
            hint: '−1 oznacza brak limitu.',
        },
        consultationDiscountPercent: { min: 0, max: 100, step: 1 },
        retentionMonths: {
            min: -1,
            max: 1200,
            step: 1,
            hint: 'Pełne miesiące lub −1 bez limitu. Wartość 0 jest niedozwolona.',
        },
        days: { min: 1, max: 90, step: 1 },
    },
    'subscription-prices': {
        productId: { minLength: 1, maxLength: 160 },
        basePlanId: { minLength: 1, maxLength: 160 },
    },
    'user-subscriptions': {
        eventId: {
            minLength: 8,
            maxLength: 100,
            hint: 'Zachowaj ID przy ponowieniu tego samego zdarzenia; nowa operacja wymaga nowego ID.',
        },
        legalAcceptanceId: {
            pattern:
                '[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}',
        },
    },
    'legal-document-versions': {
        file: {
            accept: '.pdf,application/pdf',
            maxFileSize: 2 * 1024 * 1024,
            hint: 'Czytelny, niezaszyfrowany PDF do 2 MB.',
        },
    },
    'payment-ledger': {
        currency: { pattern: '[A-Z]{3}', hint: 'Kod waluty, np. PLN, EUR.' },
    },
}

export function getFieldRules(
    resource: string | undefined,
    name: string,
): FieldRules {
    return rules[resource ?? '']?.[name] ?? {}
}
