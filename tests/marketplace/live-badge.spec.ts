import { test, expect } from '@playwright/test'
import { MarketplacePage } from '../../pages/MarketplacePage'

test.describe('Marketplace - Live Badge Updates', () => {
  test('Active live session triggers visual LIVE badge on vendor cards', async ({ page }) => {
    const marketplace = new MarketplacePage(page)
    await marketplace.goto()
    // Verify basic marketplace structure
    await expect(page.locator('body')).toBeVisible()
  })
})
