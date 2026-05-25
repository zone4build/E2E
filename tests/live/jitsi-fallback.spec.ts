import { test, expect } from '@playwright/test'
import { LivePage } from '../../pages/LivePage'

test.describe('Live - Jitsi Connection Fallback', () => {
  test('Slider remains functional and no fatal crash when Jitsi domain is blocked', async ({ page }) => {
    // Block the Jitsi meet domain to trigger fallback
    await page.route('**/meet.jit.si/**', route => route.abort())
    
    const livePage = new LivePage(page)
    await livePage.gotoLiveRoom('pizza-marco', '1')
    
    // Check that we don't display a fatal blocker blocking product purchases
    await expect(page.locator('[data-testid="error-fatal"]')).not.toBeVisible()
  })
})
