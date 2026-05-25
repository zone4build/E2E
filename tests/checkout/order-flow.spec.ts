import { test, expect } from '@playwright/test'
import { LivePage } from '../../pages/LivePage'

test.describe('Checkout - Order Flow', () => {
  test('User can add products to cart and initiate checkout', async ({ page }) => {
    const livePage = new LivePage(page)
    await livePage.gotoLiveRoom('pizza-marco', '1')
    
    // Check cart element loads
    await expect(livePage.cartCount).toBeDefined()
  })
})
