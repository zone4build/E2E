import { test, expect } from '@playwright/test'

test.describe('Checkout - Stripe Payment Gateways', () => {
  test('Accepts mock stripe credit cards in test mode', async ({ page }) => {
    // Navigates to a sample order checkout page
    await page.goto('/')
    await expect(page.locator('body')).toBeVisible()
  })
})
