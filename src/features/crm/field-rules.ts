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
    'partner-companies': {
        companyName: { minLength: 1, maxLength: 255 },
        file: {
            accept: '.jpg,.jpeg,.png,.webp',
            maxFileSize: 20 * 1024 * 1024,
            hint: 'Logo: proporcje 1:1, zalecane 800 × 800 px. PNG z przezroczystym tłem, JPEG lub WebP; do 20 MB.',
        },
    },
    'partner-company-info': {
        file: {
            accept: '.jpg,.jpeg,.png,.webp',
            maxFileSize: 20 * 1024 * 1024,
            hint: 'Zdjęcie główne: zalecane poziome 4:3, np. 1600 × 1200 px. JPEG, PNG lub WebP, do 20 MB.',
        },
    },
    'app-announcements': {
        intervalMinutes: { min: 1, max: 43200, step: 1, hint: 'Np. 10 = co 10 minut. Domyślnie 1440 (24 godziny). Czas liczony od wyświetlenia, osobno dla konta na urządzeniu.' },
        title: {
            minLength: 1,
            maxLength: 150,
            hint: 'Nazwa wewnętrzna, niewidoczna w aplikacji.',
        },
        file: {
            accept: '.jpg,.jpeg,.png,.webp',
            maxFileSize: 5 * 1024 * 1024,
            hint: 'Zalecany pionowy obraz 3:4, np. 1200 × 1600 px. Cały obraz jest widoczny bez przycinania. JPEG, PNG lub WebP, do 5 MB i 16 megapikseli.',
        },
        actionUrl: { maxLength: 2048, hint: 'Pełny adres HTTPS.' },
        endsAt: {
            hint: 'Koniec wyłączny. Okresy włączonych reklam nie mogą się nakładać.',
        },
    },
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
