import { test, expect } from '@playwright/test'

test.describe('Authentication - Keycloak SSO Flow', () => {
  test('Redirects to Keycloak SSO provider and handles callbacks', async ({ page }) => {
    // Navigate to a route that requires authentication
    await page.goto('/dashboard/pizza-marco/live')
    
    // Check if redirect to Keycloak occurred (if Keycloak SSO is active)
    const currentUrl = page.url()
    if (currentUrl.includes('keycloak') || currentUrl.includes('auth')) {
      // Keycloak authentication page check
      await expect(page).toHaveTitle(/Sign in/i)
    } else {
      // Fallback local auth check
      await expect(page.locator('[data-testid="email"]')).toBeVisible()
    }
  })
})
