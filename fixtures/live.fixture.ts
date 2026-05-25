import { Page } from '@playwright/test'
import { DashboardPage } from '../pages/DashboardPage'

export async function startLiveSession(page: Page, shopSlug: string): Promise<DashboardPage> {
  const dashboard = new DashboardPage(page)
  await dashboard.gotoVendorLive(shopSlug)
  await dashboard.login(
    process.env.TEST_VENDOR_EMAIL || 'admin@gustomenu.com',
    process.env.TEST_VENDOR_PASS || 'password123'
  )
  await page.waitForURL('**/dashboard/**')
  await dashboard.startLive()
  await dashboard.expectLiveActive()
  return dashboard
}

export async function endLiveSession(dashboard: DashboardPage) {
  await dashboard.endLive()
}
