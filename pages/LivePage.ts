import { Page, Locator, expect } from '@playwright/test'

export class LivePage {
  readonly page: Page
  readonly jitsiContainer: Locator
  readonly liveBadge: Locator
  readonly liveEndedMsg: Locator
  readonly pinnedSlider: Locator
  readonly buyNowBtn: Locator
  readonly cartCount: Locator

  constructor(page: Page) {
    this.page = page
    this.jitsiContainer = page.locator('[data-testid="jitsi-container"]')
    this.liveBadge = page.locator('[data-testid="live-badge"]')
    this.liveEndedMsg = page.locator('[data-testid="live-ended-msg"]')
    this.pinnedSlider = page.locator('[data-testid="pinned-slider"]')
    this.buyNowBtn = page.locator('[data-testid="buy-now-btn"]')
    this.cartCount = page.locator('[data-testid="cart-count"]')
  }

  async gotoShop(shopSlug: string) {
    await this.page.goto(`/shop/${shopSlug}`)
  }

  async gotoLiveRoom(shopSlug: string, liveId: string = '1') {
    await this.page.goto(`/shop/${shopSlug}/live/${liveId}`)
  }

  async clickLiveBadgeToJoin() {
    await this.liveBadge.click()
  }

  async expectJitsiContainerToBeVisible(timeout = 15000) {
    await expect(this.jitsiContainer).toBeVisible({ timeout })
  }

  async expectLiveEndedMessageToBeVisible(timeout = 8000) {
    await expect(this.liveEndedMsg).toBeVisible({ timeout })
  }

  async expectSliderToContainPrice(price: string, timeout = 8000) {
    await expect(this.pinnedSlider).toContainText(price, { timeout })
  }

  async buyNow() {
    await this.buyNowBtn.click()
  }

  async expectCartCount(count: string) {
    await expect(this.cartCount).toContainText(count)
  }
}
