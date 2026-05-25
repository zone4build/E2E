import { Page, Locator, expect } from '@playwright/test'

export class DashboardPage {
  readonly page: Page
  readonly emailInput: Locator
  readonly passwordInput: Locator
  readonly loginBtn: Locator
  readonly startLiveBtn: Locator
  readonly endLiveBtn: Locator
  readonly liveActiveIndicator: Locator
  readonly viewerCount: Locator
  readonly mediaUploadInput: Locator
  readonly mediaPriceInput: Locator
  readonly publishMediaBtn: Locator

  constructor(page: Page) {
    this.page = page
    this.emailInput = page.locator('[data-testid="email"]')
    this.passwordInput = page.locator('[data-testid="password"]')
    this.loginBtn = page.locator('[data-testid="login-btn"]')
    this.startLiveBtn = page.locator('[data-testid="start-live-btn"]')
    this.endLiveBtn = page.locator('[data-testid="end-live-btn"]')
    this.liveActiveIndicator = page.locator('[data-testid="live-active"]')
    this.viewerCount = page.locator('[data-testid="viewer-count"]')
    this.mediaUploadInput = page.locator('[data-testid="media-upload"]')
    this.mediaPriceInput = page.locator('[data-testid="media-price"]')
    this.publishMediaBtn = page.locator('[data-testid="publish-media"]')
  }

  async gotoVendorLive(shopSlug: string) {
    await this.page.goto(`/dashboard/${shopSlug}/live`)
  }

  async login(email: string, pass: string) {
    await this.emailInput.fill(email)
    await this.passwordInput.fill(pass)
    await this.loginBtn.click()
  }

  async startLive() {
    await this.startLiveBtn.click()
  }

  async endLive() {
    await this.endLiveBtn.click()
  }

  async expectLiveActive(timeout = 10000) {
    await expect(this.liveActiveIndicator).toBeVisible({ timeout })
  }

  async expectViewerCount(count: string, timeout = 5000) {
    await expect(this.viewerCount).toContainText(count, { timeout })
  }

  async uploadProductMedia(filePath: string, price: string) {
    await this.mediaUploadInput.setInputFiles(filePath)
    await this.mediaPriceInput.fill(price)
    await this.publishMediaBtn.click()
  }
}
