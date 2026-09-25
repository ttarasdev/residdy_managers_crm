import { test, afterEach } from 'node:test'
import assert from 'node:assert/strict'
import { join } from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

const load = (file) =>
    require(join(process.env.RESIDDY_TEST_DIR, 'features/crm', file))

const { operations } = load('generated/operations.js')

const { resources } = load('catalog.js')

const { buildArgs, initialValues, getOperation, normalizeRows } =
    load('data.js')

const { readResource } = load('read-resource.js')

const originalFetch = global.fetch

afterEach(() => {
    global.fetch = originalFetch
})

test('every generated API operation has a resource and every field has a usable schema', () => {
    assert.equal(operations.length, 233)

    assert.equal(
        new Set(operations.map((item) => item.id)).size,
        operations.length,
    )

    function field(item) {
        assert(item.name)

        assert(
            [
                'number',
                'string',
                'boolean',
                'enum',
                'json',
                'object',
                'file',
                'array',
            ].includes(item.kind),
        )

        if (item.kind === 'enum') assert(item.choices.length)

        if (item.kind === 'object') item.fields.forEach(field)

        if (item.kind === 'array') field(item.item)
    }

    for (const operation of operations) {
        assert(
            resources.some((resource) => resource.id === operation.resource),
            operation.id,
        )

        operation.args.forEach(field)
    }
})

test('edit values preserve false, clearable strings and numeric relationships without sending response-only fields', () => {
    const operation = getOperation('blog-posts', 'update')

    const values = initialValues(operation, {
        id: 7,
        title: 'Old',
        isPopular: false,
        categories: [{ id: 3, name: 'News' }],
        createdAt: 'yesterday',
    })

    values.dto.title = ''

    values.dto.categoryIds.push('9')

    const [id, dto] = buildArgs(operation, values)

    assert.equal(id, 7)

    assert.equal(dto.title, '')

    assert.equal(dto.isPopular, false)

    assert.deepEqual(dto.categoryIds, [3, 9])

    assert.equal(dto.createdAt, undefined)

    assert.equal(dto.categories, undefined)
})

test('invalid numeric input is rejected and URL boolean filters become booleans', () => {
    const operation = getOperation('cases', 'list')

    assert.deepEqual(
        buildArgs(operation, {
            query: { page: '2', isPopular: 'false', limit: '20' },
        }),
        [{ page: 2, isPopular: false, limit: 20 }],
    )

    assert.throws(
        () => buildArgs(operation, { query: { typeId: 'broken' } }),
        /liczbę/,
    )
})

test('generated reorder action sends the ID and DTO to the actual API wrapper', async () => {
    let request

    global.fetch = async (url, init) => {
        request = { url, ...init }

        return new Response(JSON.stringify([]), {
            headers: { 'Content-Type': 'application/json' },
        })
    }

    await getOperation('case-stage-tasks', 'reorder').execute(
        [12, { direction: 'down' }],
        { baseUrl: 'https://api.example.test', token: 'test' },
    )

    assert.equal(request.method, 'PATCH')

    assert.match(request.url, /\/case-stage-tasks\/12\/reorder$/)

    assert.deepEqual(JSON.parse(request.body), { direction: 'down' })
})

test('mail account lists preserve string keys', () => {
    assert.deepEqual(normalizeRows(['support']).rows, [
        { id: 'support', account: 'support', name: 'support' },
    ])
})

test('specialist management reads the full manager list record rather than the public profile', async () => {
    let request

    global.fetch = async (url) => {
        request = new URL(url)

        return new Response(
            JSON.stringify({
                rows: [{ id: 8, account: { status: 'blocked' }, phone: '123' }],
                total: 1,
            }),
            { headers: { 'Content-Type': 'application/json' } },
        )
    }

    const record = await readResource('specialists', 8, {
        baseUrl: 'https://api.example.test',
        token: 'test',
    })

    assert.equal(request.pathname, '/specialists')

    assert.equal(request.searchParams.get('id'), '8')

    assert.equal(record.account.status, 'blocked')
})

test('inactive consultation categories remain editable across list pages', async () => {
    const pages = []

    global.fetch = async (url) => {
        const page = Number(new URL(url).searchParams.get('page'))

        pages.push(page)

        const rows =
            page === 1
                ? Array.from({ length: 100 }, (_, index) => ({ id: index + 1 }))
                : [{ id: 101, isActive: false }]

        return new Response(JSON.stringify({ rows, total: 101 }), {
            headers: { 'Content-Type': 'application/json' },
        })
    }

    const record = await readResource('consultation-categories', 101, {
        baseUrl: 'https://api.example.test',
        token: 'test',
    })

    assert.deepEqual(pages, [1, 2])

    assert.equal(record.isActive, false)
})

test('mail edits read stored audience and attachment JSON into request DTO names', () => {
    const operation = getOperation('mail-jobs', 'update')

    const values = initialValues(operation, {
        id: 2,
        audienceJson: { accountTypes: ['user'] },
        attachmentsJson: [{ mediaAssetId: 9 }],
        inlineImagesJson: [{ mediaAssetId: 10, cid: 'logo' }],
    })

    assert.deepEqual(buildArgs(operation, values), [
        2,
        {
            audience: { accountTypes: ['user'] },
            attachments: [{ mediaAssetId: 9 }],
            inlineImages: [{ mediaAssetId: 10, cid: 'logo' }],
        },
    ])
})

test('action validation rejects missing rich content and incomplete array items', () => {
    const { validateAction } = load('validation.js')

    assert.throws(
        () =>
            validateAction(getOperation('blog-posts', 'create'), {
                dto: { title: 'Post', variantId: 1, lan: 'PL' },
            }),
        /Treść/,
    )

    assert.throws(
        () =>
            validateAction(getOperation('mail-jobs', 'update'), {
                id: 2,
                dto: { inlineImages: [{ mediaAssetId: 1 }] },
            }),
        /Identyfikator obrazu/,
    )
})

test('backend v2 catalog exposes manager additions and excludes personal checkout routes', () => {
    for (const resource of [
        'subscription-plans',
        'subscription-prices',
        'user-subscriptions',
        'legal-documents',
        'legal-document-versions',
        'payment-ledger',
        'analytics',
    ])
        assert.deepEqual(resources.find((item) => item.id === resource).roles, [
            'admin',
        ])

    assert.equal(getOperation('user-subscriptions', 'checkout'), undefined)

    assert.equal(getOperation('consultation-bookings', 'reschedule'), undefined)

    assert.equal(getOperation('user-purchases', 'list'), undefined)

    assert.deepEqual(
        getOperation('consultation-bookings', 'cancelByAdmin').roles,
        ['admin'],
    )
})

test('backend v2 schemas and UI validation preserve limit sentinels and exclude reserved public uploads', () => {
    const { validateAction } = load('validation.js')

    const create = getOperation('subscription-plans', 'create')

    const values = {
        dto: {
            code: 'basic',
            name: 'Basic',
            rank: '0',
            documentsPerMonth: '-1',
            openCases: '3',
            consultationDiscountPercent: '10',
            retentionMonths: '-1',
        },
    }

    validateAction(create, values)

    assert.equal(buildArgs(create, values)[0].documentsPerMonth, -1)

    assert.throws(
        () =>
            validateAction(create, {
                dto: { ...values.dto, retentionMonths: '0' },
            }),
        /Przechowywanie/,
    )

    assert.throws(
        () =>
            validateAction(create, {
                dto: { ...values.dto, consultationDiscountPercent: '101' },
            }),
        /Rabat/,
    )

    assert.throws(
        () =>
            validateAction(
                getOperation('subscription-plans', 'updateTrialSettings'),
                { dto: { planId: 1, days: 91, enabled: false } },
            ),
        /dni/,
    )

    const bucket = getOperation('public-assets', 'create')
        .args.find((item) => item.name === 'dto')
        .fields.find((item) => item.name === 'bucket')

    assert(!bucket.choices.includes('legal_documents'))

    const queryBucket = getOperation(
        'public-assets',
        'list',
    ).args[0].fields.find((item) => item.name === 'bucket')

    assert(queryBucket.choices.includes('legal_documents'))

    assert.throws(
        () =>
            validateAction(getOperation('legal-document-versions', 'create'), {
                code: 'privacy_policy',
                dto: {},
                file: new File(
                    [new Uint8Array(2 * 1024 * 1024 + 1)],
                    'large.pdf',
                ),
            }),
        /2 MB/,
    )
})

test('analytics charts preserve dimensions, currency boundaries and exact amount safety', () => {
    const { analyticsCharts } = load('analytics-charts.js')

    const [registrations] = analyticsCharts('registrations', [
        { period: '2026-09-01', type: 'users', count: 3 },
        { period: '2026-09-01', type: 'managers', count: 1 },
        { period: '2026-09-02', type: 'users', count: 4 },
    ])

    assert.equal(registrations.kind, 'line')

    assert.deepEqual(
        registrations.series.map((series) => series.values),
        [
            [3, 4],
            [1, 0],
        ],
    )

    const money = analyticsCharts('series', [
        {
            period: '2026-09-01',
            currency: 'PLN',
            kind: 'payment',
            amountMinor: '100',
        },
        {
            period: '2026-09-01',
            currency: 'EUR',
            kind: 'refund',
            amountMinor: '50',
        },
    ])

    assert.equal(money.length, 2)

    assert.match(money[0].title, /PLN/)

    assert.match(money[1].title, /EUR/)

    assert.deepEqual(
        analyticsCharts('series', [
            {
                period: '2026-09-01',
                currency: 'PLN',
                amountMinor: '9007199254740993',
            },
        ]),
        [],
    )

    assert.deepEqual(analyticsCharts('registrations', []), [])

    assert.match(
        analyticsCharts('plans', {
            rows: [{ planId: 1, count: 3 }],
            total: 50,
        })[0].note,
        /bieżącej strony/,
    )
})

test('announcement management is writer-only and replace preserves schedule and clears optional action fields', () => {
    const resource = resources.find((r) => r.id === 'app-announcements')

    assert.deepEqual(resource.roles, ['writer'])

    const actions = operations.filter((o) => o.resource === resource.id)

    assert.equal(actions.length, 6)

    for (const action of actions) assert.deepEqual(action.roles, ['writer'])

    const update = getOperation(resource.id, 'update')

    assert.equal(update.verb, 'PUT')

    const record = {
        id: 5,
        title: 'Promo',
        enabled: true,
        startsAt: '2026-10-01T10:00:00Z',
        endsAt: '2026-10-02T10:00:00Z',
        imagePlId: 1,
        imageUaId: 1,
        imageEnId: 1,
        imageRuId: 1,
        actionType: 'none',
        actionUrl: null,
        actionScreen: null,
        actionRecordType: null,
        actionRecordId: null,
    }

    const args = buildArgs(update, initialValues(update, record))

    assert.equal(args[0], 5)

    assert.equal(args[1].startsAt, record.startsAt)

    assert.equal(args[1].actionUrl, undefined)
})

test('media policies restrict icons and covers to the library, blog to uploads, and preserve nullable block edits', () => {
    const { mediaPolicy } = load('media.js')

    assert.deepEqual(mediaPolicy('cases', 'iconId', 'public-assets'), {
        kind: 'public-assets',
        bucket: 'icons',
        icon: true,
        upload: false,
        browse: true,
    })

    assert.deepEqual(
        mediaPolicy('case-instructions', 'headerVariantId', 'private-variants'),
        {
            kind: 'private-variants',
            bucket: 'instruction_headers',
            upload: false,
            browse: true,
        },
    )

    assert.deepEqual(
        mediaPolicy('blog-posts', 'variantId', 'private-variants'),
        {
            kind: 'private-variants',
            bucket: 'blog_images',
            upload: true,
            browse: false,
        },
    )

    const update = getOperation('case-instruction-blocks', 'update')

    assert.deepEqual(
        buildArgs(update, {
            id: 5,
            dto: {
                type: 'text',
                variantId: null,
                contentJson: { type: 'doc', content: [] },
            },
        }),
        [
            5,
            {
                type: 'text',
                variantId: null,
                contentJson: { type: 'doc', content: [] },
            },
        ],
    )

    assert.equal(
        buildArgs(getOperation('mail-jobs', 'update'), {
            id: 5,
            dto: { signatureId: null },
        })[1].signatureId,
        null,
    )
})

test('company creation and banner moderation are restricted to admins', () => {
    const create = operations.find(
        (o) => o.resource === 'partner-companies' && o.method === 'create',
    )
    assert.ok(create)
    assert.deepEqual(create.roles, ['admin'])
    assert.ok(JSON.stringify(create).includes('partnerId'))
    for (const op of operations.filter(
        (o) =>
            o.resource === 'partner-banners' &&
            ['approve', 'reject', 'activate', 'finish'].includes(o.method),
    ))
        assert.deepEqual(op.roles, ['admin'])
})

test('banner actions expose only valid moderation transitions', () => {
    const { isBannerActionAvailable } = load('banner-actions.js')
    const actions = operations.filter((o) => o.resource === 'partner-banners')
    for (const [status, expected] of Object.entries({
        pending_review: ['approve', 'reject'],
        approved: ['activate'],
        active: ['finish'],
        finished: ['remove'],
        rejected: ['remove'],
        draft: ['remove'],
    })) {
        assert.deepEqual(
            actions
                .filter((op) =>
                    isBannerActionAvailable(op, {
                        status,
                        company: { status: 'active' },
                    }),
                )
                .map((o) => o.method)
                .sort(),
            expected.sort(),
        )
    }
    assert.equal(
        isBannerActionAvailable(
            actions.find((o) => o.method === 'activate'),
            { status: 'approved', company: { status: 'draft' } },
        ),
        false,
    )
})
