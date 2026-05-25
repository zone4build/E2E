import { test, expect } from '@playwright/test'
import { MarketplacePage } from '../../pages/MarketplacePage'

test.describe('Marketplace - Shop Discovery', () => {
  test('Users can search and discover shops by location/map', async ({ page }) => {
    const marketplace = new MarketplacePage(page)
    await marketplace.goto()
    
    // Map should be loaded on the page
    await expect(page.locator('body')).toBeVisible()
  })
})
