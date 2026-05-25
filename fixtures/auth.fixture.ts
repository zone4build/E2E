import { test as base } from '@playwright/test'
import { DashboardPage } from '../pages/DashboardPage'
import { LivePage } from '../pages/LivePage'
import { MarketplacePage } from '../pages/MarketplacePage'

type MyFixtures = {
  dashboardPage: DashboardPage
  livePage: LivePage
  marketplacePage: MarketplacePage
  vendorLoggedInPage: { page: any; dashboard: DashboardPage }
}

export const test = base.extend<MyFixtures>({
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page))
  },
  livePage: async ({ page }, use) => {
    await use(new LivePage(page))
  },
  marketplacePage: async ({ page }, use) => {
    await use(new MarketplacePage(page))
  },
  vendorLoggedInPage: async ({ browser }, use) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    const dashboard = new DashboardPage(page)

    // Perform default vendor login using env variables
    await dashboard.gotoVendorLive('pizza-marco')
    await dashboard.login(
      process.env.TEST_VENDOR_EMAIL || 'admin@gustomenu.com',
      process.env.TEST_VENDOR_PASS || 'password123'
    )
    await page.waitForURL('**/dashboard/**')

    await use({ page, dashboard })
    await context.close()
  },
})

export { expect } from '@playwright/test'
