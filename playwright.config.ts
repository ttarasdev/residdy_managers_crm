import { defineConfig } from '@playwright/test'

export default defineConfig({
    testDir: './tests/browser',
    fullyParallel: false,
    workers: 1,
    timeout: 60_000,
    use: {
        baseURL: 'http://127.0.0.1:3217',
        viewport: { width: 1440, height: 960 },
        trace: 'retain-on-failure',
    },
    webServer: {
        command:
            'npm run build && npm run start -- --hostname 127.0.0.1 --port 3217',
        url: 'http://127.0.0.1:3217/auth',
        timeout: 120_000,
        reuseExistingServer: false,
        env: { NEXT_PUBLIC_API_URL: 'http://api.crm.test' },
    },
})
