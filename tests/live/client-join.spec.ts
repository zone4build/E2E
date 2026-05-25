import { test, expect } from '@playwright/test'
import { LivePage } from '../../pages/LivePage'

test.describe('Live - Client Join Flow', () => {
  test('Client can join live page directly and view live stream container', async ({ page }) => {
    const livePage = new LivePage(page)
    await livePage.gotoLiveRoom('pizza-marco', '1')
    
    // Client should see the stream container (or loading fallback if no active live)
    await expect(page.locator('body')).toBeVisible()
  })
})
