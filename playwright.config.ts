import { defineConfig, devices } from '@playwright/test'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables from .env.test
dotenv.config({ path: path.resolve(__dirname, '.env.test') })

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  retries: process.env.CI ? 2 : 0, // retry 2x in CI
  workers: process.env.CI ? 2 : 4,

  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
    ['github'], // GitHub Actions annotations
  ],

  use: {
    baseURL: process.env.BASE_URL ?? 'http://localhost:3003', // Default to Shop UI port (3003)
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  projects: [
    // Desktop
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'safari', use: { ...devices['Desktop Safari'] } },

    // Mobile
    { name: 'mobile-chrome', use: { ...devices['Pixel 5'] } },
    { name: 'mobile-safari', use: { ...devices['iPhone 13'] } },
  ],

  // Optional: runs Next.js server in the root workspace during local execution if not already running
  webServer: process.env.CI ? undefined : {
    command: 'cd .. && npm run dev',
    url: 'http://localhost:3003',
    reuseExistingServer: true,
    timeout: 120_000,
  },
})
