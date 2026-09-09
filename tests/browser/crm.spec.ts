import { test, expect, type Page } from '@playwright/test'
import { resources } from '../../src/features/crm/catalog'

async function mockApi(
    page: Page,
    roles = ['admin', 'manager', 'writer', 'marketolog'],
) {
    await page.addInitScript(() =>
        localStorage.setItem('access_token', 'mock-manager'),
    )

    const writes: {
        path: string
        method: string
        body: Record<string, unknown> | string
    }[] = []

    const errors: string[] = []

    page.on('pageerror', (error) => errors.push(error.message))

    let theme = 'white'

    let stages = [
        { id: 10, caseId: 1, title: 'Dokumenty', stageNo: 1, lan: 'PL' },
        { id: 11, caseId: 1, title: 'Wizyta', stageNo: 2, lan: 'PL' },
    ]

    const record = {
        id: 1,
        accountId: 10,
        title: 'Karta pobytu',
        name: 'Anna',
        surname: 'Nowak',
        email: 'anna@example.test',
        typeId: 1,
        lan: 'PL',
        subtitle: 'Przygotowanie dokumentów',
        iconId: 1,
        status: 'draft',
        isPopular: false,
        createdAt: '2026-09-01T12:00:00Z',
    }

    await page.route('http://api.crm.test/**', async (route) => {
        const request = route.request()

        const path = new URL(request.url()).pathname

        const method = request.method()

        const headers = {
            'access-control-allow-origin': '*',
            'access-control-allow-headers': '*',
            'access-control-allow-methods': '*',
        }

        if (method === 'OPTIONS') return route.fulfill({ status: 204, headers })

        let data: unknown

        if (path === '/managers/me') {
            if (method === 'PATCH') theme = request.postDataJSON().theme

            data = {
                ...record,
                roles: roles.map((name, id) => ({ id, name })),
                theme,
            }
        } else if (method !== 'GET') {
            const body = request
                .headers()
                ['content-type']?.includes('application/json')
                ? request.postDataJSON()
                : (request.postData() ?? '')

            writes.push({ path, method, body })

            if (path.endsWith('/reorder')) {
                stages = [
                    { ...stages[1], stageNo: 1 },
                    { ...stages[0], stageNo: 2 },
                ]

                data = stages
            } else
                data = {
                    ...record,
                    ...(typeof body === 'object' ? body : {}),
                    ...(path === '/private-variants'
                        ? { id: 5, mediumAssetId: 6 }
                        : {}),
                }
        } else if (/\/case-stages\/\d+$/.test(path))
            data = { rows: stages, total: 2 }
        else if (/\/case-stage-tasks\/by-stage\/\d+$/.test(path))
            data = {
                rows: [
                    { id: 20, stageId: 10, title: 'Paszport', sortKey: 1 },
                    { id: 21, stageId: 10, title: 'Wniosek', sortKey: 2 },
                ],
                total: 2,
            }
        else if (path.startsWith('/private-variants/'))
            data = { id: 5, mediumAssetId: 6 }
        else if (path.endsWith('/download'))
            return route.fulfill({
                headers,
                contentType: 'image/png',
                body: Buffer.from(
                    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a1i8AAAAASUVORK5CYII=',
                    'base64',
                ),
            })
        else if (/\/\d+$/.test(path) || path.endsWith('/me'))
            data = { ...record, categories: [{ id: 1, name: 'Aktualności' }] }
        else data = { rows: [record], total: 1 }

        return route.fulfill({
            contentType: 'application/json',
            headers,
            body: JSON.stringify(data),
        })
    })

    return { writes, errors }
}

test('all menu modules and create dialogs render without runtime errors', async ({
    page,
}) => {
    const { errors } = await mockApi(page)

    for (const resource of resources.filter((item) => !item.hidden)) {
        await page.goto(resource.path)

        await expect(page.locator('main h1')).toHaveText(resource.title)

        const create = page
            .getByRole('button', { name: /^(Dodaj|Dodaj konto)$/ })
            .first()

        if ((await create.count()) && (await create.isEnabled())) {
            await create.click()

            await expect(page.getByRole('dialog')).toBeVisible()

            await page
                .getByRole('dialog')
                .getByRole('button', { name: 'Zamknij', exact: true })
                .click()
        }
    }

    await page.goto('/main')

    await expect(page.locator('main h1')).toContainText('Anna')

    await expect(
        page.getByRole('button', { name: 'Ciemny motyw' }),
    ).toBeEnabled()

    await page.getByRole('button', { name: 'Ciemny motyw' }).click()

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'black')

    await page.reload()

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'black')

    expect(
        await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
        ),
    ).toBe(true)

    expect(errors).toEqual([])
})

test('case editing and stage/task ordering send the correct requests', async ({
    page,
}) => {
    const { writes, errors } = await mockApi(page)

    await page.goto('/main/legalization/cases/1')

    await expect(
        page.getByRole('heading', { name: 'Etapy sprawy', exact: true }),
    ).toBeVisible()

    await page
        .getByRole('button', { name: 'Przesuń w dół', exact: true })
        .first()
        .click()

    await expect
        .poll(() =>
            writes.some(
                (item) =>
                    item.path === '/case-stages/10/reorder' &&
                    typeof item.body === 'object' &&
                    item.body.direction === 'down',
            ),
        )
        .toBe(true)

    await page.getByText('Pokaż zadania', { exact: true }).first().click()

    await expect(
        page.getByRole('heading', { name: 'Zadania etapu' }),
    ).toBeVisible()

    const tasks = page
        .locator('section')
        .filter({ has: page.getByRole('heading', { name: 'Zadania etapu' }) })
        .last()

    await tasks
        .getByRole('button', { name: 'Przesuń w dół', exact: true })
        .first()
        .click()

    await expect
        .poll(() =>
            writes.some((item) => item.path === '/case-stage-tasks/20/reorder'),
        )
        .toBe(true)

    await page.getByRole('button', { name: 'Edytuj', exact: true }).click()

    const dialog = page.getByRole('dialog')

    await dialog.getByLabel('Tytuł', { exact: true }).fill('Nowa karta')

    await dialog.getByRole('button', { name: 'Edytuj', exact: true }).click()

    await expect(dialog.getByText('Gotowe', { exact: true })).toBeVisible()

    expect(
        writes.some(
            (item) =>
                item.path === '/cases/1' &&
                typeof item.body === 'object' &&
                item.body.title === 'Nowa karta' &&
                item.body.isPopular === false,
        ),
    ).toBe(true)

    expect(errors).toEqual([])
})

test('blog creation supports a nested file upload and structured rich content', async ({
    page,
}) => {
    const { writes, errors } = await mockApi(page)

    await page.goto('/main/blog/posts')

    await page.getByRole('button', { name: 'Dodaj', exact: true }).click()

    const parent = page.getByRole('dialog').first()

    await parent.getByLabel(/^Tytuł/).fill('Nowy wpis')

    await parent.getByLabel(/^Język/).selectOption('PL')

    await parent
        .getByRole('textbox', { name: 'Treść', exact: true })
        .fill('Treść wpisu')

    await parent
        .getByRole('button', { name: 'Prześlij plik', exact: true })
        .click()

    const upload = page.getByRole('dialog').last()

    await upload.locator('input[type=file]').setInputFiles({
        name: 'cover.png',
        mimeType: 'image/png',
        buffer: Buffer.from('mock-image'),
    })

    await upload.getByLabel(/^Przeznaczenie/).selectOption('partner_main')

    await upload.getByRole('button', { name: 'Dodaj', exact: true }).click()

    await expect(page.getByRole('dialog')).toHaveCount(1)

    await parent.getByRole('button', { name: 'Dodaj', exact: true }).click()

    await expect(parent.getByText('Gotowe', { exact: true })).toBeVisible()

    expect(
        writes.some(
            (item) =>
                item.path === '/private-variants' &&
                typeof item.body === 'string' &&
                item.body.includes('cover.png'),
        ),
    ).toBe(true)

    expect(
        writes.some(
            (item) =>
                item.path === '/blog-posts' &&
                typeof item.body === 'object' &&
                item.body.variantId === 5 &&
                JSON.stringify(item.body.contentJson).includes('Treść wpisu'),
        ),
    ).toBe(true)

    expect(errors).toEqual([])
})

for (const role of ['admin', 'manager', 'writer', 'marketolog']) {
    test(`${role}: navigation and direct route permissions`, async ({
        page,
    }) => {
        await mockApi(page, [role])

        await page.goto('/main/managers/1')

        await expect(page.locator('main h1')).toHaveText(
            role === 'admin' ? 'Zespół · #1' : 'Brak uprawnień',
        )

        await page.goto('/main/mail/jobs')

        await expect(page.locator('main h1')).toHaveText(
            role === 'writer' ? 'Kampanie e-mail' : 'Brak uprawnień',
        )

        if (role === 'marketolog') {
            await page.goto('/main/partners')

            await expect(page.locator('main h1')).toHaveText('Partnerzy')

            await expect(
                page.getByRole('button', { name: 'Dodaj konto' }),
            ).toBeDisabled()
        }
    })
}

test('v2 plans, trial settings and provider prices use the new DTOs', async ({
    page,
}) => {
    const { errors, writes } = await mockApi(page)

    await page.route(
        'http://api.crm.test/subscription-plans/trial-settings',
        (route) =>
            route.fulfill({
                json: { id: 1, planId: 1, days: 14, enabled: false },
            }),
    )

    await page.goto('/main/resources/subscription-plans')

    await page.getByRole('button', { name: 'Dodaj', exact: true }).click()

    let dialog = page.getByRole('dialog')

    await dialog.getByLabel(/^Kod/).fill('basic')

    await dialog.getByLabel(/^Nazwa/).fill('Plan podstawowy')

    await dialog.getByLabel(/^Pozycja planu/).fill('0')

    await dialog.getByLabel(/^Dokumenty na miesiąc/).fill('-1')

    await dialog.getByLabel(/^Otwarte sprawy/).fill('3')

    await dialog.getByLabel(/^Rabat na konsultacje/).fill('10')

    await dialog.getByLabel(/^Przechowywanie dokumentów/).fill('-1')

    await dialog.getByRole('button', { name: 'Dodaj', exact: true }).click()

    await expect(dialog.getByText('Gotowe', { exact: true })).toBeVisible()

    expect(
        writes.some(
            (item) =>
                item.path === '/subscription-plans' &&
                typeof item.body === 'object' &&
                item.body.documentsPerMonth === -1 &&
                item.body.rank === 0,
        ),
    ).toBe(true)

    await dialog
        .getByRole('button', { name: 'Zamknij', exact: true })
        .last()
        .click()

    await page
        .getByRole('button', { name: 'Zmień okres próbny', exact: true })
        .click()

    dialog = page.getByRole('dialog')

    await expect(dialog.getByLabel(/^Liczba dni/)).toHaveValue('14')

    await expect(dialog.getByLabel(/^Włączone/)).toHaveValue('false')

    await dialog.getByRole('button', { name: 'Anuluj', exact: true }).click()

    await page.goto('/main/resources/subscription-prices')

    await page.getByRole('button', { name: 'Dodaj', exact: true }).click()

    dialog = page.getByRole('dialog')

    await dialog.getByLabel(/^Plan subskrypcji/).selectOption('1')

    await dialog.getByLabel(/^Dostawca/).selectOption('google')

    await dialog.getByLabel(/^Okres rozliczeniowy/).selectOption('monthly')

    await dialog.getByLabel(/^ID produktu u dostawcy/).fill('basic.monthly')

    await dialog.getByLabel(/^ID planu bazowego/).fill('monthly')

    await dialog.getByRole('button', { name: 'Dodaj', exact: true }).click()

    await expect(dialog.getByText('Gotowe', { exact: true })).toBeVisible()

    expect(
        writes.some(
            (item) =>
                item.path === '/subscription-prices' &&
                typeof item.body === 'object' &&
                item.body.planId === 1 &&
                item.body.provider === 'google',
        ),
    ).toBe(true)

    expect(errors).toEqual([])
})

test('v2 legal documents upload drafts, publish selected versions and download by version ID', async ({
    page,
}) => {
    const { errors } = await mockApi(page)

    const calls: { path: string; method: string; body: string }[] = []

    const document = {
        code: 'privacy_policy',
        title: 'Polityka prywatności',
        versionId: 73,
        version: 2,
        isPlaceholder: false,
        publishedAt: '2026-09-01T12:00:00Z',
        url: 'http://api.crm.test/legal-document.pdf',
        sha256: 'abc',
    }

    let version = {
        id: 73,
        documentId: 8,
        version: 2,
        status: 'draft',
        isPlaceholder: false,
    }

    await page.route('http://api.crm.test/legal-**', (route) => {
        const request = route.request()

        const path = new URL(request.url()).pathname

        calls.push({
            path,
            method: request.method(),
            body: request.postData() ?? '',
        })

        if (path.endsWith('/draft') || path.endsWith('/file'))
            return route.fulfill({
                contentType: 'application/pdf',
                body: '%PDF-1.7 mock',
            })

        if (path.endsWith('/publish'))
            version = { ...version, status: 'published' }

        return route.fulfill({
            json:
                path === '/legal-documents/privacy_policy'
                    ? document
                    : request.method() === 'GET'
                      ? {
                            rows: [version],
                            total: 1,
                            page: 1,
                            limit: 20,
                            offset: 0,
                        }
                      : version,
        })
    })

    await page.goto(
        '/main/resources/legal-document-versions?code=privacy_policy',
    )

    await expect(
        page.getByRole('button', { name: 'Otwórz 73', exact: true }),
    ).toBeVisible()

    await page.getByRole('button', { name: 'Dodaj', exact: true }).click()

    let dialog = page.getByRole('dialog')

    await expect(dialog.getByLabel(/^Kod/)).toHaveValue('privacy_policy')

    await dialog.locator('input[type=file]').setInputFiles({
        name: 'policy.pdf',
        mimeType: 'application/pdf',
        buffer: Buffer.from('%PDF-1.7 mock'),
    })

    await dialog.getByRole('button', { name: 'Dodaj', exact: true }).click()

    await expect(dialog.getByText('Gotowe', { exact: true })).toBeVisible()

    expect(
        calls.some(
            (call) =>
                call.method === 'POST' &&
                call.path === '/legal-document-versions/privacy_policy' &&
                call.body.includes('policy.pdf'),
        ),
    ).toBe(true)

    await dialog
        .getByRole('button', { name: 'Zamknij', exact: true })
        .last()
        .click()

    await page.getByRole('button', { name: 'Otwórz 73', exact: true }).click()

    await page
        .getByRole('dialog')
        .getByRole('button', { name: 'Opublikuj PDF', exact: true })
        .click()

    dialog = page.getByRole('dialog')

    await dialog
        .getByRole('button', { name: 'Opublikuj PDF', exact: true })
        .click()

    await expect(dialog.getByText('Gotowe', { exact: true })).toBeVisible()

    expect(
        calls.some(
            (call) =>
                call.path === '/legal-document-versions/73/publish' &&
                call.method === 'POST',
        ),
    ).toBe(true)

    await page.goto('/main/resources/legal-documents/privacy_policy')

    await page
        .getByRole('button', { name: 'Pobierz plik', exact: true })
        .click()

    const download = page.waitForEvent('download')

    await page
        .getByRole('dialog')
        .getByRole('button', { name: 'Pobierz plik', exact: true })
        .click()

    expect((await download).suggestedFilename()).toContain('73.pdf')

    expect(
        calls.some((call) => call.path === '/legal-documents/versions/73/file'),
    ).toBe(true)

    expect(
        calls.some((call) => call.path.includes('/versions/privacy_policy/')),
    ).toBe(false)

    expect(errors).toEqual([])
})

test('v2 analytics validates UTC ranges and paginates server aggregates', async ({
    page,
}) => {
    const { errors } = await mockApi(page)

    const requests: URL[] = []

    await page.route('http://api.crm.test/analytics/**', (route) => {
        const url = new URL(route.request().url())

        requests.push(url)

        return route.fulfill({
            json: {
                from: '2026-09-01',
                to: '2026-10-01',
                generatedAt: '2026-10-01T00:00:00Z',
                timezone: 'UTC',
                group: 'day',
                toExclusive: true,
                cacheSeconds: 120,
                plans: {
                    rows: [{ planId: 1, count: 7 }],
                    total: 41,
                    page: Number(url.searchParams.get('page') ?? 1),
                    limit: 20,
                    offset: 0,
                },
            },
        })
    })

    await page.goto('/main/resources/analytics')

    await page
        .getByRole('navigation', { name: 'Raporty analityczne' })
        .getByRole('button', { name: 'Subskrypcje', exact: true })
        .click()

    await expect(
        page.getByRole('button', { name: 'Następna', exact: true }),
    ).toBeEnabled()

    await page.getByRole('button', { name: 'Następna', exact: true }).click()

    await expect
        .poll(() =>
            requests.some(
                (url) =>
                    url.pathname === '/analytics/subscriptions' &&
                    url.searchParams.get('page') === '2',
            ),
        )
        .toBe(true)

    await page.getByLabel('Od (UTC)', { exact: true }).fill('2026-09-01')

    await page
        .getByLabel('Do (UTC, bez tego dnia)', { exact: true })
        .fill('2026-10-01')

    await page.getByLabel('Grupowanie', { exact: true }).selectOption('month')

    await page
        .getByRole('button', { name: 'Zastosuj filtry', exact: true })
        .click()

    await expect
        .poll(() =>
            requests.some(
                (url) =>
                    url.searchParams.get('from') === '2026-09-01' &&
                    url.searchParams.get('to') === '2026-10-01' &&
                    url.searchParams.get('group') === 'month' &&
                    url.searchParams.get('page') === '1',
            ),
        )
        .toBe(true)

    await page
        .getByLabel('Do (UTC, bez tego dnia)', { exact: true })
        .fill('2026-08-01')

    await page
        .getByRole('button', { name: 'Zastosuj filtry', exact: true })
        .click()

    await expect(
        page.getByRole('alert').filter({ hasText: 'Wybierz zakres' }),
    ).toBeVisible()

    expect(errors).toEqual([])
})

test('v2 admin can explicitly retry and cancel a booking', async ({ page }) => {
    const { writes, errors } = await mockApi(page, ['admin'])

    await page.goto('/main/consultations/1')

    for (const [title, path] of [
        ['Ponów operacje', '/consultation-bookings/1/retry-operations'],
        ['Anuluj rezerwację', '/consultation-bookings/1/cancel-by-admin'],
    ]) {
        await page.getByRole('button', { name: title, exact: true }).click()

        const dialog = page.getByRole('dialog')

        await dialog.getByRole('button', { name: title, exact: true }).click()

        await expect(dialog.getByText('Gotowe', { exact: true })).toBeVisible()

        expect(writes.some((item) => item.path === path)).toBe(true)

        await dialog
            .getByRole('button', { name: 'Zamknij', exact: true })
            .last()
            .click()
    }

    expect(errors).toEqual([])
})
