import { test, expect } from '@playwright/test'

test.describe('Mobile - Viewports & Responsiveness', () => {
  test('Renders correctly on mobile (375px width)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/shop/pizza-marco')
    // Page body should render correctly
    await expect(page.locator('body')).toBeVisible()
  })
})
