import { Page, Locator, expect } from '@playwright/test'

export class MarketplacePage {
  readonly page: Page
  readonly searchInput: Locator
  readonly liveBadge: Locator
  readonly shopCard: Locator
  readonly interactiveMap: Locator

  constructor(page: Page) {
    this.page = page
    this.searchInput = page.locator('[data-testid="marketplace-search"]')
    this.liveBadge = page.locator('[data-testid="live-badge"]')
    this.shopCard = page.locator('[data-testid="shop-card"]')
    this.interactiveMap = page.locator('[data-testid="marketplace-map"]')
  }

  async goto() {
    await this.page.goto('/')
  }

  async searchShop(query: string) {
    await this.searchInput.fill(query)
    await this.searchInput.press('Enter')
  }

  async expectLiveBadgeVisible(timeout = 15000) {
    await expect(this.liveBadge).toBeVisible({ timeout })
  }

  async expectShopCardVisible(shopSlug: string) {
    await expect(this.page.locator(`[data-testid="shop-card-${shopSlug}"]`)).toBeVisible()
  }
}
