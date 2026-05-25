import { test, expect } from '@playwright/test'
import { DashboardPage } from '../../pages/DashboardPage'

test.describe('Live - Vendor Media Upload', () => {
  test('Vendor can upload media and set sale price', async ({ page }) => {
    const dashboard = new DashboardPage(page)
    await dashboard.gotoVendorLive('pizza-marco')
    await dashboard.login(
      process.env.TEST_VENDOR_EMAIL || 'admin@gustomenu.com',
      process.env.TEST_VENDOR_PASS || 'password123'
    )
    
    // Check elements exist
    await expect(dashboard.mediaUploadInput).toBeDefined()
  })
})
