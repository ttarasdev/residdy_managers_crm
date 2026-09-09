import { test, afterEach } from 'node:test'
import assert from 'node:assert/strict'
import { join } from 'node:path'
import { createRequire } from 'node:module'

const loadModule = createRequire(import.meta.url)

const load = (file) => loadModule(join(process.env.RESIDDY_API_TEST_DIR, file))

const { http, toFormData } = load('http.js')

const { ApiError, ApiResponseError } = load('api-error.js')

const { getAccessToken, setAccessToken, clearAccessToken } =
    load('auth-token.js')

const options = {
    baseUrl: 'https://api.example.test/v1/',
    token: 'manager-token',
}

const originalFetch = global.fetch

const originalWindow = Object.getOwnPropertyDescriptor(global, 'window')

afterEach(() => {
    global.fetch = originalFetch

    if (originalWindow) Object.defineProperty(global, 'window', originalWindow)
    else Reflect.deleteProperty(global, 'window')
})

function capture(response = { success: true }, status = 200) {
    const calls = []

    global.fetch = async (url, init) => {
        calls.push({ url, ...init })

        return new Response(status === 204 ? null : JSON.stringify(response), {
            status,
            headers: { 'Content-Type': 'application/json' },
        })
    }

    return calls
}

test('query serialization omits absent values and preserves false, zero, Unicode and arrays', async () => {
    const calls = capture({ rows: [], total: 0, page: 1, limit: 20, offset: 0 })

    await http.get('/blog-posts', {
        ...options,
        query: {
            q: 'Ім’я & Łódź',
            isPopular: false,
            offset: 0,
            absent: undefined,
            nil: null,
            ids: [1, 2],
        },
    })

    const url = new URL(calls[0].url)

    assert.equal(url.pathname, '/v1/blog-posts')

    assert.equal(url.searchParams.get('q'), 'Ім’я & Łódź')

    assert.equal(url.searchParams.get('isPopular'), 'false')

    assert.equal(url.searchParams.get('offset'), '0')

    assert.equal(url.searchParams.has('absent'), false)

    assert.equal(url.searchParams.has('nil'), false)

    assert.deepEqual(url.searchParams.getAll('ids'), ['1', '2'])
})

test('protected requests forward token, headers and signal without browser storage on the server', async () => {
    const calls = capture()

    const controller = new AbortController()

    await http.get('/managers/me', {
        ...options,
        signal: controller.signal,
        headers: { 'X-Trace': 'abc' },
    })

    assert.equal(calls[0].headers.get('Authorization'), 'Bearer manager-token')

    assert.equal(calls[0].headers.get('X-Trace'), 'abc')

    assert.equal(calls[0].headers.has('Content-Type'), false)

    assert.equal(calls[0].signal, controller.signal)

    assert.equal(calls[0].cache, 'no-store')

    assert.equal(calls[0].credentials, 'omit')
})

test('server tokens are isolated per concurrent request', async () => {
    const calls = capture()

    await Promise.all([
        http.get('/managers/me', { ...options, token: 'first' }),
        http.get('/managers/me', { ...options, token: 'second' }),
    ])

    assert.deepEqual(
        calls.map((call) => call.headers.get('Authorization')),
        ['Bearer first', 'Bearer second'],
    )
})

test('login uses the new email contract and never forwards an existing Authorization header', async () => {
    const { accountAuthApi } = load('accounts/account-auth/account-auth.api.js')

    const calls = capture({ token: 'new-token' })

    const dto = { email: 'manager@example.test', password: 'example-password' }

    const result = await accountAuthApi.login(dto, {
        ...options,
        headers: { Authorization: 'Bearer old' },
    })

    assert.equal(calls[0].url, 'https://api.example.test/v1/account-auth/login')

    assert.equal(calls[0].method, 'POST')

    assert.deepEqual(JSON.parse(calls[0].body), dto)

    assert.equal(calls[0].headers.has('Authorization'), false)

    assert.deepEqual(result, { token: 'new-token' })
})

test('browser token helpers and explicit token:null behave consistently', async () => {
    const values = new Map()

    global.window = {
        dispatchEvent: () => true,
        localStorage: {
            getItem: (key) => values.get(key) ?? null,
            setItem: (key, value) => values.set(key, value),
            removeItem: (key) => values.delete(key),
        },
    }

    setAccessToken('stored')

    assert.equal(getAccessToken(), 'stored')

    const calls = capture()

    await http.get('/managers/me', { baseUrl: options.baseUrl })

    await http.get('/managers/me', { ...options, token: null })

    assert.equal(calls[0].headers.get('Authorization'), 'Bearer stored')

    assert.equal(calls[1].headers.has('Authorization'), false)

    clearAccessToken()

    assert.equal(getAccessToken(), null)
})

test('Nest validation errors retain status, individual messages and payload', async () => {
    const payload = {
        statusCode: 400,
        error: 'Bad Request',
        message: ['email must be an email', 'password is required'],
    }

    capture(payload, 400)

    await assert.rejects(
        http.post('/account-auth/login', {}, options),
        (error) => {
            assert.ok(error instanceof ApiError)

            assert.equal(error.status, 400)

            assert.deepEqual(error.data, payload)

            assert.deepEqual(error.messages, payload.message)

            assert.equal(error.message, payload.message.join('\n'))

            return true
        },
    )
})

test('non-JSON failures remain ApiError and 401 does not cause hidden redirects', async () => {
    global.fetch = async () =>
        new Response('upstream unavailable', { status: 502 })

    await assert.rejects(
        http.get('/managers/me', options),
        (error) =>
            error instanceof ApiError &&
            error.status === 502 &&
            error.data === 'upstream unavailable',
    )

    capture({ message: 'Unauthorized' }, 401)

    await assert.rejects(
        http.get('/managers/me', options),
        (error) => error instanceof ApiError && error.status === 401,
    )
})

test('malformed and empty successful JSON responses are not disguised as typed data', async () => {
    for (const body of ['<html>proxy page</html>', '']) {
        global.fetch = async () => new Response(body, { status: 200 })

        await assert.rejects(
            http.get('/managers/me', options),
            ApiResponseError,
        )
    }
})

test('204 deletion and JSON success deletion preserve their distinct contracts', async () => {
    const { managersApi } = load('managers/managers/managers.api.js')

    const { blogPostsApi } = load('blog/blog-posts/blog-posts.api.js')

    capture(null, 204)

    assert.equal(await managersApi.remove(5, options), undefined)

    capture({ success: true })

    assert.deepEqual(await blogPostsApi.remove(5, options), { success: true })
})

test('cancellation and network failures propagate without retrying mutations', async () => {
    for (const failure of [
        new DOMException('Aborted', 'AbortError'),
        new TypeError('fetch failed'),
    ]) {
        let attempts = 0

        global.fetch = async () => {
            attempts++

            throw failure
        }

        await assert.rejects(
            http.post('/mail/send', {}, options),
            (error) => error === failure,
        )

        assert.equal(attempts, 1)
    }
})

test('multipart uploads use the backend file field and allow fetch to set the boundary', async () => {
    const { privateAssetsApi } = load(
        'media/private-assets/private-assets.api.js',
    )

    const calls = capture({ id: 9 })

    const file = new File(['document'], 'template.docx')

    const dto = {
        bucket: 'gdoc_templates',
        originalName: 'template.docx',
        ownerAccountId: 8,
        visibility: 'managers',
    }

    await privateAssetsApi.create(dto, file, {
        ...options,
        headers: { 'Content-Type': 'application/json' },
    })

    assert.ok(calls[0].body instanceof FormData)

    assert.equal(calls[0].body.get('file'), file)

    assert.equal(calls[0].body.get('ownerAccountId'), '8')

    assert.equal(calls[0].body.get('originalName'), 'template.docx')

    assert.equal(calls[0].headers.has('Content-Type'), false)

    assert.equal(calls[0].headers.get('Authorization'), 'Bearer manager-token')

    const form = toFormData({ zero: 0, flag: false, absent: undefined }, file)

    assert.equal(form.get('zero'), '0')

    assert.equal(form.get('flag'), 'false')

    assert.equal(form.has('absent'), false)
})

test('file downloads preserve bytes and use protected manager booking routes', async () => {
    const { consultationBookingsApi } = load(
        'consultations/consultation-bookings/consultation-bookings.api.js',
    )

    const bytes = new Uint8Array([0, 255, 16, 128])

    global.fetch = async (url, init) => {
        assert.equal(
            url,
            'https://api.example.test/v1/consultation-bookings/7/file',
        )

        assert.equal(init.headers.get('Authorization'), 'Bearer manager-token')

        return new Response(bytes, {
            headers: { 'Content-Type': 'application/pdf' },
        })
    }

    const blob = await consultationBookingsApi.download(7, options)

    assert.equal(blob.type, 'application/pdf')

    assert.deepEqual(new Uint8Array(await blob.arrayBuffer()), bytes)
})

test('manager routes, identifiers and body-only DTOs are wired correctly', async () => {
    const { partnerCompaniesApi } = load(
        'partners/partner-companies/partner-companies.api.js',
    )

    const { partnerBannersApi } = load(
        'partners/partner-banners/partner-banners.api.js',
    )

    const { managersApi } = load('managers/managers/managers.api.js')

    const { consultationReviewsApi } = load(
        'consultations/consultation-reviews/consultation-reviews.api.js',
    )

    const { consultationPromocodesApi } = load(
        'promocodes/consultation-promocodes/consultation-promocodes.api.js',
    )

    const { caseStagesApi } = load('cases/case-stages/case-stages.api.js')

    const calls = capture()

    await partnerCompaniesApi.list({ page: 2 }, options)

    await partnerCompaniesApi.getById(11, options)

    await partnerBannersApi.getById(12, options)

    await managersApi.updateRoles(2, { roleIds: [1, 3] }, options)

    await consultationReviewsApi.reject(
        9,
        { rejectionReason: 'Needs review' },
        options,
    )

    await consultationPromocodesApi.update(4, { specialistId: 3 }, options)

    await caseStagesApi.listByCase(8, { offset: 20 }, options)

    assert.deepEqual(
        calls.map((call) => [call.method, new URL(call.url).pathname]),
        [
            ['GET', '/v1/partner-companies/manage'],
            ['GET', '/v1/partner-companies/manage/11'],
            ['GET', '/v1/partner-banners/manage/12'],
            ['PATCH', '/v1/managers/2/roles'],
            ['PATCH', '/v1/consultation-reviews/9/reject'],
            ['PATCH', '/v1/consultation-promocode/4'],
            ['GET', '/v1/case-stages/8'],
        ],
    )

    assert.deepEqual(JSON.parse(calls[3].body), { roleIds: [1, 3] })

    assert.deepEqual(JSON.parse(calls[4].body), {
        rejectionReason: 'Needs review',
    })

    assert.deepEqual(JSON.parse(calls[5].body), { specialistId: 3 })

    assert.equal(new URL(calls[6].url).searchParams.get('offset'), '20')
})

test('private signed-file paths encode each segment and keep signature parameters', async () => {
    const { filesApi } = load('media/files/files.api.js')

    global.fetch = async (url, init) => {
        assert.equal(
            new URL(url).pathname,
            '/v1/files/private/gdoc_templates/folder/a%20%23%3F.docx',
        )

        assert.equal(new URL(url).searchParams.get('sig'), 'a+b/c=')

        assert.equal(init.headers.get('Authorization'), 'Bearer manager-token')

        return new Response('file')
    }

    await filesApi.download(
        'gdoc_templates',
        ['folder', 'a #?.docx'],
        { e: 123, sig: 'a+b/c=' },
        options,
    )
})

test('user and specialist self-service operations are absent from management APIs', () => {
    const { usersApi } = load('users/users/users.api.js')

    const { specialistsApi } = load(
        'specialists/specialists/specialists.api.js',
    )

    const { partnersApi } = load('partners/partners/partners.api.js')

    const { consultationBookingsApi } = load(
        'consultations/consultation-bookings/consultation-bookings.api.js',
    )

    for (const api of [usersApi, specialistsApi, partnersApi]) {
        assert.equal('getMe' in api, false)

        assert.equal('updateMe' in api, false)

        assert.equal('uploadMyAvatar' in api, false)
    }

    assert.equal('register' in usersApi, false)

    assert.equal('create' in consultationBookingsApi, false)

    assert.equal('cancel' in consultationBookingsApi, false)

    assert.equal('confirmDev' in consultationBookingsApi, false)
})

test('the authenticated transport rejects external endpoint URLs', async () => {
    let called = false

    global.fetch = async () => {
        called = true

        return new Response()
    }

    await assert.rejects(
        http.get('https://elsewhere.example.test/steal', options),
    )

    await assert.rejects(http.get('//elsewhere.example.test/steal', options))

    assert.equal(called, false)
})

test('backend v2 subscription routes preserve trial false and versioned plan DTOs', async () => {
    const { subscriptionPlansApi } = load(
        'subscriptions/subscription-plans/subscription-plans.api.js',
    )

    const { subscriptionPricesApi } = load(
        'subscriptions/subscription-prices/subscription-prices.api.js',
    )

    const calls = capture()

    await subscriptionPlansApi.create(
        {
            code: 'basic',
            name: 'Basic',
            rank: 0,
            documentsPerMonth: -1,
            openCases: 3,
            consultationDiscountPercent: 10,
            retentionMonths: -1,
        },
        options,
    )

    await subscriptionPlansApi.trialSettings(options)

    await subscriptionPlansApi.updateTrialSettings(
        { planId: 2, days: 30, enabled: false },
        options,
    )

    await subscriptionPlansApi.retire(2, options)

    await subscriptionPricesApi.create(
        {
            planId: 2,
            provider: 'google',
            interval: 'monthly',
            productId: 'subscription.basic',
            basePlanId: 'monthly',
        },
        options,
    )

    await subscriptionPricesApi.retire(9, options)

    assert.deepEqual(
        calls.map((call) => [call.method, new URL(call.url).pathname]),
        [
            ['POST', '/v1/subscription-plans'],
            ['GET', '/v1/subscription-plans/trial-settings'],
            ['PATCH', '/v1/subscription-plans/trial-settings'],
            ['PATCH', '/v1/subscription-plans/2/retire'],
            ['POST', '/v1/subscription-prices'],
            ['PATCH', '/v1/subscription-prices/9/retire'],
        ],
    )

    assert.equal(JSON.parse(calls[0].body).documentsPerMonth, -1)

    assert.deepEqual(JSON.parse(calls[2].body), {
        planId: 2,
        days: 30,
        enabled: false,
    })
})

test('backend v2 legal uploads and downloads use document codes and version IDs separately', async () => {
    const { legalDocumentVersionsApi } = load(
        'legal/legal-document-versions/legal-document-versions.api.js',
    )

    const { legalDocumentsApi } = load(
        'legal/legal-documents/legal-documents.api.js',
    )

    const calls = capture()

    const file = new File(['%PDF-1.7'], 'terms.pdf', {
        type: 'application/pdf',
    })

    await legalDocumentVersionsApi.create(
        'privacy_policy',
        { isPlaceholder: false },
        file,
        options,
    )

    await legalDocumentVersionsApi.list(
        'privacy_policy',
        { page: 2, limit: 20 },
        options,
    )

    await legalDocumentVersionsApi.publish(73, options)

    await legalDocumentVersionsApi.downloadDraft(73, options)

    await legalDocumentsApi.getById('privacy_policy', options)

    await legalDocumentsApi.download(73, options)

    assert.equal(
        new URL(calls[0].url).pathname,
        '/v1/legal-document-versions/privacy_policy',
    )

    assert(calls[0].body instanceof FormData)

    assert.equal(calls[0].body.get('isPlaceholder'), 'false')

    assert.equal(calls[0].body.get('file').name, 'terms.pdf')

    assert.equal(calls[0].headers.get('Content-Type'), null)

    assert.equal(new URL(calls[1].url).searchParams.get('page'), '2')

    assert.equal(
        new URL(calls[2].url).pathname,
        '/v1/legal-document-versions/73/publish',
    )

    assert.equal(
        new URL(calls[3].url).pathname,
        '/v1/legal-document-versions/73/draft',
    )

    assert.equal(
        new URL(calls[5].url).pathname,
        '/v1/legal-documents/versions/73/file',
    )

    assert.equal(calls[3].headers.get('Authorization'), 'Bearer manager-token')

    assert.equal(calls[4].headers.get('Authorization'), null)

    assert.equal(calls[5].headers.get('Authorization'), null)
})

test('backend v2 booking administration uses manager endpoints', async () => {
    const { consultationBookingsApi } = load(
        'consultations/consultation-bookings/consultation-bookings.api.js',
    )

    const calls = capture()

    await consultationBookingsApi.retryOperations(8, options)

    await consultationBookingsApi.cancelByAdmin(8, options)

    assert.deepEqual(
        calls.map((call) => [call.method, new URL(call.url).pathname]),
        [
            ['POST', '/v1/consultation-bookings/8/retry-operations'],
            ['PATCH', '/v1/consultation-bookings/8/cancel-by-admin'],
        ],
    )
})

test('analytics and ledger keep UTC dates, environments and large monetary strings intact', async () => {
    const { analyticsApi } = load('analytics/analytics.api.js')

    const { paymentLedgerApi } = load(
        'payments/payment-ledger/payment-ledger.api.js',
    )

    const calls = capture({
        rows: [{ amountMinor: '90071992547409930', currency: 'PLN' }],
        total: 1,
    })

    for (const report of [
        'overview',
        'subscriptions',
        'consultations',
        'usage',
        'revenue',
    ])
        await analyticsApi[report](
            { from: '2026-09-01', to: '2026-10-01', group: 'month', page: 2 },
            options,
        )

    const result = await paymentLedgerApi.list(
        {
            from: '2026-09-01',
            to: '2026-10-01',
            environment: 'sandbox',
            currency: 'PLN',
            kind: 'refund',
        },
        options,
    )

    assert.equal(result.rows[0].amountMinor, '90071992547409930')

    assert.equal(new URL(calls[0].url).searchParams.get('from'), '2026-09-01')

    assert.equal(new URL(calls[4].url).pathname, '/v1/analytics/revenue')

    assert.equal(
        new URL(calls[5].url).searchParams.get('environment'),
        'sandbox',
    )

    assert.equal(new URL(calls[5].url).searchParams.get('kind'), 'refund')
})

test('development subscription simulation sends the explicit user and idempotency event', async () => {
    const { userSubscriptionsApi } = load(
        'subscriptions/user-subscriptions/user-subscriptions.api.js',
    )

    const calls = capture()

    await userSubscriptionsApi.simulate(
        15,
        { eventId: 'manual-event-001', action: 'renew', priceId: 4 },
        options,
    )

    assert.equal(
        new URL(calls[0].url).pathname,
        '/v1/user-subscriptions/dev/15/events',
    )

    assert.deepEqual(JSON.parse(calls[0].body), {
        eventId: 'manual-event-001',
        action: 'renew',
        priceId: 4,
    })
})
