import { test, afterEach, after } from 'node:test'
import assert from 'node:assert/strict'
import { join } from 'node:path'
import { createRequire } from 'node:module'
import { JSDOM } from 'jsdom'

const dom = new JSDOM('<!doctype html><html><body></body></html>', {
    url: 'https://crm.example.test/main',
})

for (const name of [
    'window',
    'self',
    'document',
    'HTMLElement',
    'StorageEvent',
    'Event',
    'navigator',
]) {
    Object.defineProperty(globalThis, name, {
        configurable: true,
        value: dom.window[name],
    })
}

globalThis.IS_REACT_ACT_ENVIRONMENT = true

process.env.NEXT_PUBLIC_API_URL = 'https://api.example.test'

const requireModule = createRequire(import.meta.url)

const Module = requireModule('node:module')

const originalLoad = Module._load

const redirects = []

const router = {
    replace: (path) => redirects.push(path),
    push: (path) => redirects.push(path),
}

Module._load = function (request, ...args) {
    if (request === 'next/navigation')
        return {
            useRouter: () => router,
            usePathname: () => window.location.pathname,
            useSearchParams: () => new URLSearchParams(window.location.search),
        }

    return originalLoad.call(this, request, ...args)
}

Module._extensions['.scss'] = (module) => {
    module.exports = {}
}

const React = requireModule('react')

const { render, screen, act, cleanup, waitFor, fireEvent } = await import(
    '@testing-library/react'
)

const { useQueryClient } = requireModule('@tanstack/react-query')

const load = (file) => requireModule(join(process.env.RESIDDY_TEST_DIR, file))

// Only retention time differs in tests, so unmounted queries do not hold Node open.
const queryFactory = load('shared/query/create-query-client.js')

const originalCreateQueryClient = queryFactory.createQueryClient

queryFactory.createQueryClient = (...args) => {
    const client = originalCreateQueryClient(...args)

    client.setDefaultOptions({
        ...client.getDefaultOptions(),
        queries: { ...client.getDefaultOptions().queries, gcTime: 0 },
        mutations: { ...client.getDefaultOptions().mutations, gcTime: 0 },
    })

    return client
}

const { Providers } = load('shared/providers/Providers.js')

const { AuthGuard } = load('shared/guards/AuthGuard.js')

const { RoleGuard } = load('shared/guards/RoleGuard.js')

const { useAuth } = load('shared/hooks/useAuth.js')

const { useRoles } = load('shared/hooks/useRoles.js')

const { useLogin } = load('shared/hooks/useLogin.js')

const { getAccessToken, setAccessToken, clearAccessToken } =
    load('api/auth-token.js')

const { ApiError, ApiResponseError } = load('api/api-error.js')

const { getSafeReturnPath } = load('shared/config/routes.js')

const { shouldRetryQuery } = load('shared/query/create-query-client.js')

const { sessionQueryKey } = load('shared/auth/session-query.js')

const { createEntityQueryKeys } = load('shared/query/query-keys.js')

const originalFetch = globalThis.fetch

const clients = new Set()

let latest

function manager(id = 1, roles = ['manager']) {
    return {
        id,
        accountId: id + 100,
        roles: roles.map((name, index) => ({ id: index + 1, name })),
    }
}

function json(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { 'Content-Type': 'application/json' },
    })
}

function Probe() {
    const client = useQueryClient()

    const auth = useAuth()

    const roles = useRoles()

    const login = useLogin('/main/users?page=2')

    clients.add(client)

    latest = { ...auth, roleState: roles, login, client }

    return React.createElement(
        'output',
        { 'data-testid': 'status' },
        auth.status,
    )
}

function mount({ guard = AuthGuard, allowedRoles, strict = false } = {}) {
    let content = React.createElement('span', null, 'Private content')

    if (allowedRoles)
        content = React.createElement(RoleGuard, { allowedRoles }, content)

    const tree = React.createElement(
        Providers,
        null,
        React.createElement(Probe),
        React.createElement(guard, null, content),
    )

    return render(
        strict ? React.createElement(React.StrictMode, null, tree) : tree,
    )
}

afterEach(() => {
    cleanup()

    for (const client of clients) client.clear()

    clients.clear()

    clearAccessToken()

    window.localStorage.removeItem('theme')

    document.documentElement.removeAttribute('data-theme')

    redirects.length = 0

    globalThis.fetch = originalFetch

    window.history.replaceState(null, '', '/main')
})

after(() => {
    Module._load = originalLoad

    dom.window.close()
})

test('anonymous private routes never mount private content or call the backend', async () => {
    let calls = 0

    globalThis.fetch = async () => {
        calls++

        return json(manager())
    }

    mount()

    await waitFor(() => assert.equal(latest.status, 'anonymous'))

    assert.equal(screen.queryByText('Private content'), null)

    assert.equal(calls, 0)

    assert.ok(redirects.includes('/auth?next=%2Fmain'))
})

test('private content remains hidden until a single shared manager query succeeds', async () => {
    setAccessToken('first')

    let resolve

    let calls = 0

    globalThis.fetch = async () => {
        calls++

        return new Promise((done) => {
            resolve = done
        })
    }

    mount()

    assert.equal(latest.status, 'loading')

    assert.equal(screen.queryByText('Private content'), null)

    await act(async () => resolve(json(manager())))

    await waitFor(() => assert.equal(latest.status, 'authenticated'))

    assert.ok(screen.getByText('Private content'))

    assert.equal(calls, 1)

    assert.equal(latest.roleState.hasRole('manager'), true)

    assert.equal(
        JSON.stringify(
            latest.client
                .getQueryCache()
                .getAll()
                .map((q) => q.queryKey),
        ).includes('first'),
        false,
    )
})

test('React StrictMode effect replay does not leave the session stuck loading', async () => {
    setAccessToken('strict')

    globalThis.fetch = async () => json(manager())

    mount({ strict: true })

    await waitFor(() => assert.equal(latest.status, 'authenticated'))

    assert.ok(screen.getByText('Private content'))
})

test('401 expires the session, clears cache and hides private content', async () => {
    setAccessToken('expired')

    globalThis.fetch = async () => json({ message: 'Unauthorized' }, 401)

    mount()

    await waitFor(() => assert.equal(latest.status, 'anonymous'))

    assert.equal(getAccessToken(), null)

    assert.equal(screen.queryByText('Private content'), null)
})

test('a non-manager token gets forbidden status without mounting private content', async () => {
    setAccessToken('user-token')

    globalThis.fetch = async () =>
        json({ message: 'Manager profile required' }, 403)

    mount()

    await waitFor(() => assert.equal(latest.status, 'forbidden'))

    assert.ok(redirects.includes('/unauthorized'))

    assert.equal(screen.queryByText('Private content'), null)
})

test('session errors preserve token and expose retry instead of silently logging out', async () => {
    setAccessToken('valid')

    globalThis.fetch = async () => new Response('broken JSON')

    mount()

    await waitFor(() => assert.equal(latest.status, 'error'))

    assert.equal(getAccessToken(), 'valid')

    assert.ok(screen.getByRole('alert'))

    globalThis.fetch = async () => json(manager())

    fireEvent.click(screen.getByText('Spróbuj ponownie'))

    await waitFor(() => assert.equal(latest.status, 'authenticated'))
})

test('roles deny empty manager permissions and do not grant implicit admin access', async () => {
    setAccessToken('roles')

    globalThis.fetch = async () => json(manager(1, []))

    mount({ allowedRoles: ['writer'] })

    await waitFor(() => assert.equal(latest.status, 'authenticated'))

    assert.equal(screen.queryByText('Private content'), null)

    await act(async () => {
        latest.client.setQueryData(sessionQueryKey, manager(1, ['admin']))
    })

    assert.equal(latest.roleState.hasAnyRole(['writer']), false)

    await act(async () => {
        latest.client.setQueryData(sessionQueryKey, manager(1, ['writer']))
    })

    await waitFor(() => assert.ok(screen.getByText('Private content')))
})

test('logout discards query and mutation caches and immediately unmounts private content', async () => {
    setAccessToken('logout')

    globalThis.fetch = async () => json(manager())

    mount()

    await waitFor(() => assert.equal(latest.status, 'authenticated'))

    const oldClient = latest.client

    oldClient.setQueryData(['users', 'list'], { private: true })

    oldClient
        .getMutationCache()
        .build(oldClient, { mutationFn: async () => null })

    await act(async () => latest.logout())

    assert.equal(screen.queryByText('Private content'), null)

    assert.equal(oldClient.getQueryCache().getAll().length, 0)

    assert.equal(oldClient.getMutationCache().getAll().length, 0)

    assert.notEqual(latest.client, oldClient)
})

test('cross-tab token replacement creates a new cache and ignores late unauthorized errors from the old one', async () => {
    setAccessToken('first')

    globalThis.fetch = async (_url, init) =>
        json(
            manager(
                init.headers.get('Authorization') === 'Bearer second' ? 2 : 1,
            ),
        )

    mount()

    await waitFor(() => assert.equal(latest.manager?.id, 1))

    const oldClient = latest.client

    oldClient.setQueryData(['secret'], 'first account')

    await act(async () => {
        window.localStorage.setItem('access_token', 'second')

        window.dispatchEvent(
            new StorageEvent('storage', {
                key: 'access_token',
                newValue: 'second',
            }),
        )
    })

    await waitFor(() => assert.equal(latest.manager?.id, 2))

    assert.notEqual(latest.client, oldClient)

    assert.equal(latest.client.getQueryData(['secret']), undefined)

    await act(async () =>
        oldClient
            .getQueryCache()
            .config.onError(new ApiError(401, null, '/old'), {
                meta: undefined,
            }),
    )

    assert.equal(getAccessToken(), 'second')
})

test('login verifies the manager profile before persisting and returning to an internal route', async () => {
    globalThis.fetch = async (url) =>
        url.endsWith('/account-auth/login')
            ? json({ token: 'verified' })
            : json(manager())

    mount({ guard: React.Fragment })

    await act(async () =>
        latest.login.mutateAsync({
            email: 'manager@example.test',
            password: 'password',
        }),
    )

    await waitFor(() => assert.equal(getAccessToken(), 'verified'))

    assert.ok(redirects.includes('/main/users?page=2'))
})

test('a successful account login without a manager profile never persists its token', async () => {
    globalThis.fetch = async (url) =>
        url.endsWith('/account-auth/login')
            ? json({ token: 'not-manager' })
            : json({ message: 'Forbidden' }, 403)

    mount({ guard: React.Fragment })

    await act(async () => {
        await assert.rejects(
            latest.login.mutateAsync({
                email: 'user@example.test',
                password: 'password',
            }),
            (error) => error instanceof ApiError && error.status === 403,
        )
    })

    assert.equal(getAccessToken(), null)
})

test('unmounting a pending login cannot later resurrect the session', async () => {
    let finish

    globalThis.fetch = async () =>
        new Promise((done) => {
            finish = done
        })

    const view = mount({ guard: React.Fragment })

    let result

    await act(async () => {
        result = latest.login
            .mutateAsync({ email: 'a@example.test', password: 'password' })
            .catch((error) => error)
    })

    view.unmount()

    // A fetch implementation may resolve despite an abort. The final session check must still reject it.
    globalThis.fetch = async () => json(manager())

    finish(json({ token: 'late' }))

    const error = await result

    assert.equal(error.name, 'AbortError')

    assert.equal(getAccessToken(), null)
})

test('redirect targets, retry policy and cache keys keep their boundaries', () => {
    for (const value of [
        'https://evil.test',
        '//evil.test/main',
        '/auth',
        '/main/../../auth',
        '/main\\evil',
        '/mainly',
        null,
    ])
        assert.equal(getSafeReturnPath(value), '/main')

    assert.equal(
        getSafeReturnPath('/main/users?page=2#details'),
        '/main/users?page=2#details',
    )

    assert.equal(shouldRetryQuery(0, new ApiError(403, null, '/')), false)

    assert.equal(shouldRetryQuery(0, new ApiResponseError(200, '/')), false)

    assert.equal(shouldRetryQuery(0, new TypeError('network')), true)

    assert.equal(shouldRetryQuery(2, new TypeError('network')), false)

    const keys = createEntityQueryKeys('users')

    assert.notDeepEqual(keys.list({ page: 1 }), keys.detail(1))
})

test('login form submits the new email contract once and displays API errors', async () => {
    const { LoginForm } = load(
        'components/auth-components/login-form/LoginForm.js',
    )

    const requests = []

    globalThis.fetch = async (url, options) => {
        requests.push({ url, body: JSON.parse(options.body) })

        return json({ message: 'Invalid email or password' }, 401)
    }

    render(React.createElement(Providers, null, React.createElement(LoginForm)))

    fireEvent.change(screen.getByLabelText('email'), {
        target: { value: 'Manager@Example.com' },
    })

    fireEvent.change(screen.getByLabelText('hasło'), {
        target: { value: 'password' },
    })

    fireEvent.submit(screen.getByRole('form', { name: 'Logowanie' }))

    await screen.findByRole('alert')

    assert.equal(requests.length, 1)

    assert.ok(requests[0].url.endsWith('/account-auth/login'))

    assert.deepEqual(requests[0].body, {
        email: 'manager@example.com',
        password: 'password',
    })

    assert.equal(getAccessToken(), null)
})

test('forgot password sends one request and carries normalized email to the code form', async () => {
    const { ForgotPasswordForm } = load(
        'components/auth-components/forgot-password-form/ForgotPasswordForm.js',
    )

    const requests = []

    globalThis.fetch = async (url, options) => {
        requests.push({ url, body: JSON.parse(options.body) })

        return json({ ok: true })
    }

    render(
        React.createElement(
            Providers,
            null,
            React.createElement(ForgotPasswordForm),
        ),
    )

    fireEvent.change(screen.getByLabelText('email'), {
        target: { value: 'Manager@Example.com' },
    })

    fireEvent.submit(screen.getByRole('form', { name: 'Reset hasła' }))

    await waitFor(() =>
        assert.ok(
            redirects.includes(
                '/forgot-password/confirm?email=manager%40example.com',
            ),
        ),
    )

    assert.equal(requests.length, 1)

    assert.ok(requests[0].url.endsWith('/account-auth/forgot-password'))

    assert.deepEqual(requests[0].body, { email: 'manager@example.com' })
})

test('password reset rejects mismatched confirmation and sends password instead of the old newPassword field', async () => {
    const { ResetPasswordForm } = load(
        'components/auth-components/reset-password-form/ResetPasswordForm.js',
    )

    window.history.replaceState(
        null,
        '',
        '/forgot-password/confirm?email=manager%40example.com',
    )

    const requests = []

    globalThis.fetch = async (url, options) => {
        requests.push({ url, body: JSON.parse(options.body) })

        return json({ ok: true })
    }

    render(
        React.createElement(
            Providers,
            null,
            React.createElement(ResetPasswordForm),
        ),
    )

    fireEvent.change(screen.getByLabelText('kod (6 cyfr)'), {
        target: { value: '012345' },
    })

    fireEvent.change(screen.getByLabelText('nowe hasło'), {
        target: { value: 'simplepass' },
    })

    fireEvent.change(screen.getByLabelText('powtórz hasło'), {
        target: { value: 'different' },
    })

    fireEvent.submit(screen.getByRole('form', { name: 'Nowe hasło' }))

    assert.equal(
        screen.getByRole('alert').textContent,
        'Hasła nie są takie same',
    )

    assert.equal(requests.length, 0)

    fireEvent.change(screen.getByLabelText('powtórz hasło'), {
        target: { value: 'simplepass' },
    })

    fireEvent.submit(screen.getByRole('form', { name: 'Nowe hasło' }))

    await waitFor(() => assert.ok(redirects.includes('/auth')))

    assert.equal(requests.length, 1)

    assert.ok(requests[0].url.endsWith('/account-auth/reset-password'))

    assert.deepEqual(requests[0].body, {
        email: 'manager@example.com',
        code: '012345',
        password: 'simplepass',
    })
})

test('theme reads the old preference, changes without backend requests and survives remount', async () => {
    const { ThemeSwitch } = load(
        'components/theme-components/theme-switch/ThemeSwitch.js',
    )

    window.localStorage.setItem(
        'theme',
        JSON.stringify({ state: { theme: 'black' }, version: 0 }),
    )

    globalThis.fetch = async () => {
        throw new Error('Public theme must not fetch a profile')
    }

    const view = render(
        React.createElement(Providers, null, React.createElement(ThemeSwitch)),
    )

    await waitFor(() =>
        assert.equal(document.documentElement.dataset.theme, 'black'),
    )

    fireEvent.click(screen.getByRole('button', { name: 'Jasny motyw' }))

    assert.equal(document.documentElement.dataset.theme, 'white')

    assert.equal(window.localStorage.getItem('theme'), 'white')

    view.unmount()

    render(
        React.createElement(Providers, null, React.createElement(ThemeSwitch)),
    )

    assert.equal(
        screen
            .getByRole('button', { name: 'Jasny motyw' })
            .getAttribute('aria-pressed'),
        'true',
    )
})

test('resource catalog uses the four roles and exact path segments', () => {
    const { getResource, resourceForPath } = load('features/crm/catalog.js')

    const { hasAnyRole } = load('shared/auth/permissions.js')

    assert.equal(resourceForPath('/main/blog/posts/12')?.id, 'blog-posts')

    assert.equal(resourceForPath('/main/blogger'), undefined)

    for (const id of ['mail', 'user-notification-jobs', 'user-reminders'])
        assert.equal(hasAnyRole(['writer'], getResource(id).roles), true)

    assert.equal(
        hasAnyRole(['marketolog'], getResource('partners').roles),
        true,
    )

    assert.equal(
        hasAnyRole(['marketolog'], getResource('managers').roles),
        false,
    )

    assert.equal(hasAnyRole(['admin'], getResource('mail').roles), false)
})

test('the shell blocks direct entry using the same permissions as header links', async () => {
    const { AppShell } = load(
        'components/layout-components/app-shell/AppShell.js',
    )

    window.history.replaceState(null, '', '/main/managers/12')

    setAccessToken('marketing-session')

    let requests = 0

    globalThis.fetch = async () => {
        requests++

        return json(manager(1, ['marketolog']))
    }

    render(
        React.createElement(
            Providers,
            null,
            React.createElement(AppShell, null, 'Protected employee data'),
        ),
    )

    await screen.findByRole('heading', { name: 'Brak uprawnień' })

    assert.equal(screen.queryByText('Protected employee data'), null)

    assert.equal(
        screen
            .getAllByText('Zespół')
            .find((element) => element.hasAttribute('aria-disabled'))
            ?.getAttribute('aria-disabled'),
        'true',
    )

    assert.equal(
        screen
            .getByRole('link', { name: 'Partnerzy', exact: true })
            .getAttribute('href'),
        '/main/partners',
    )

    assert.equal(requests, 1)
})

test('FormContainer owns submission once and disables fields while pending', () => {
    const { default: FormContainer } = load(
        'components/form-components/form-container/FormContainer.js',
    )

    const { default: TextInput } = load(
        'components/form-components/text-input/TextInput.js',
    )

    let submits = 0

    const tree = (pending) =>
        React.createElement(
            FormContainer,
            {
                title: 'Nowy wpis',
                isPending: pending,
                onSubmit: () => {
                    submits++
                },
            },
            React.createElement(TextInput, {
                inputTitle: 'Nazwa',
                value: 'Test',
                onChange: () => {},
            }),
        )

    const view = render(tree(false))

    fireEvent.click(screen.getByRole('button', { name: 'Wyślij' }))

    assert.equal(submits, 1)

    view.rerender(tree(true))

    assert.equal(screen.getByLabelText('Nazwa').matches(':disabled'), true)

    fireEvent.submit(screen.getByRole('form', { name: 'Nowy wpis' }))

    assert.equal(submits, 1)
})

test('form list preserves selected IDs from other pages and never submits its parent', () => {
    const { default: FormList } = load(
        'components/form-components/form-list/FormList.js',
    )

    let selected

    let submits = 0

    render(
        React.createElement(
            'form',
            {
                onSubmit: (event) => {
                    event.preventDefault()

                    submits++
                },
            },
            React.createElement(FormList, {
                title: 'Role',
                items: [{ id: 2, title: 'writer' }],
                value: [1],
                multiple: true,
                onChange: (value) => {
                    selected = value
                },
            }),
        ),
    )

    fireEvent.click(screen.getByRole('button', { name: 'writer' }))

    assert.deepEqual(selected, [1, 2])

    assert.equal(submits, 0)
})

test('API form lists paginate new rows responses and preserve filter-specific cache keys', async () => {
    const { default: FormCaseRemindersList } = load(
        'components/form-components/form-case-reminders-list/FormCaseRemindersList.js',
    )

    const calls = []

    globalThis.fetch = async (url) => {
        calls.push(new URL(url))

        const page = Number(new URL(url).searchParams.get('page'))

        return json({
            rows: [{ id: page, topic: `Reminder ${page}`, lan: 'PL' }],
            total: 41,
            page,
            limit: 40,
            offset: (page - 1) * 40,
        })
    }

    render(
        React.createElement(
            Providers,
            null,
            React.createElement(FormCaseRemindersList, {
                filters: { lan: 'PL' },
                value: [],
                onChange: () => {},
            }),
        ),
    )

    await screen.findByRole('button', { name: 'Reminder 1' })

    fireEvent.click(screen.getByRole('button', { name: '›' }))

    await screen.findByRole('button', { name: 'Reminder 2' })

    assert.equal(calls.length, 2)

    assert.equal(calls[1].searchParams.get('lan'), 'PL')

    assert.equal(calls[1].searchParams.get('page'), '2')
})

test('custom select supports keyboard selection and Escape', () => {
    const { default: FormSelect } = load(
        'components/form-components/form-select/FormSelect.js',
    )

    let selected

    render(
        React.createElement(FormSelect, {
            selectTitle: 'Status',
            item: 'a',
            options: [
                { title: 'A', value: 'a' },
                { title: 'B', value: 'b' },
            ],
            onChange: (value) => {
                selected = value
            },
        }),
    )

    const trigger = screen.getByRole('button', { name: 'Status A' })

    fireEvent.click(trigger)

    fireEvent.keyDown(screen.getByRole('option', { name: 'A' }), {
        key: 'ArrowDown',
    })

    assert.equal(document.activeElement.textContent, 'B')

    fireEvent.click(document.activeElement)

    assert.equal(selected, 'b')

    assert.equal(screen.queryByRole('listbox'), null)

    fireEvent.click(trigger)

    fireEvent.keyDown(trigger, { key: 'Escape' })

    assert.equal(screen.queryByRole('listbox'), null)
})
