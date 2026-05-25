import { test, expect } from '@playwright/test'
import { DashboardPage } from '../../pages/DashboardPage'

test.describe('Authentication - Vendor & Client Login', () => {
  test('Vendor can login with valid credentials', async ({ page }) => {
    const dashboard = new DashboardPage(page)
    await dashboard.gotoVendorLive('pizza-marco')
    await dashboard.login(
      process.env.TEST_VENDOR_EMAIL || 'admin@gustomenu.com',
      process.env.TEST_VENDOR_PASS || 'password123'
    )
    await expect(page).toHaveURL(/\/dashboard/)
  })

  test('Shows error message with invalid credentials', async ({ page }) => {
    const dashboard = new DashboardPage(page)
    await dashboard.gotoVendorLive('pizza-marco')
    await dashboard.login('invalid@example.com', 'wrongpassword')
    // Expect some login failure error message or prompt to remain
    await expect(dashboard.loginBtn).toBeVisible()
  })
})
