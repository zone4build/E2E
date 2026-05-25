import { test, expect } from '@playwright/test'

test.describe('Live Commerce — parcours complet', () => {

  test('vendeur démarre live → client voit badge LIVE → rejoint', async ({
    browser
  }) => {
    // ── 2 contextes = 2 utilisateurs simultanés ──────────────
    const vendorCtx = await browser.newContext()
    const clientCtx = await browser.newContext()
    const vendor    = await vendorCtx.newPage()
    const client    = await clientCtx.newPage()

    // ── 1. Vendeur se connecte ───────────────────────────────
    await vendor.goto('/dashboard/pizza-marco/live')
    await vendor.fill('[data-testid="email"]', process.env.TEST_VENDOR_EMAIL || 'admin@gustomenu.com')
    await vendor.fill('[data-testid="password"]', process.env.TEST_VENDOR_PASS || 'password123')
    await vendor.click('[data-testid="login-btn"]')
    await vendor.waitForURL('**/dashboard/**')

    // ── 2. Vendeur démarre le live ───────────────────────────
    await vendor.click('[data-testid="start-live-btn"]')
    await expect(vendor.locator('[data-testid="live-active"]'))
      .toBeVisible({ timeout: 10_000 })

    // ── 3. Client voit le badge LIVE sur la marketplace ──────
    await client.goto('/shop/pizza-marco')
    await expect(client.locator('[data-testid="live-badge"]'))
      .toBeVisible({ timeout: 15_000 })  // polling SSE 10s max

    // ── 4. Client rejoint le live ────────────────────────────
    await client.click('[data-testid="live-badge"]')
    await expect(client).toHaveURL(/\/live/)
    await expect(client.locator('[data-testid="jitsi-container"]'))
      .toBeVisible({ timeout: 15_000 })

    // ── 5. Viewer count mis à jour ───────────────────────────
    await expect(vendor.locator('[data-testid="viewer-count"]'))
      .toContainText('1', { timeout: 5_000 })

    // ── 6. Vendeur uploade une photo avec prix ───────────────
    await vendor.setInputFiles('[data-testid="media-upload"]',
      'fixtures/test-product.jpg')
    await vendor.fill('[data-testid="media-price"]', '12.50')
    await vendor.click('[data-testid="publish-media"]')

    // ── 7. Client voit le slider mis à jour ─────────────────
    await expect(client.locator('[data-testid="pinned-slider"]'))
      .toContainText('12.50', { timeout: 8_000 })

    // ── 8. Client achète ─────────────────────────────────────
    await client.click('[data-testid="buy-now-btn"]')
    await expect(client.locator('[data-testid="cart-count"]'))
      .toContainText('1')

    // ── 9. Vendeur termine le live ───────────────────────────
    await vendor.click('[data-testid="end-live-btn"]')
    await expect(client.locator('[data-testid="live-ended-msg"]'))
      .toBeVisible({ timeout: 8_000 })

    await vendorCtx.close()
    await clientCtx.close()
  })

  test('mobile — badge LIVE visible sur 375px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/shop/pizza-marco')
    await expect(page.locator('[data-testid="live-badge"]'))
      .toBeVisible()
    // Badge pas tronqué
    const badge = page.locator('[data-testid="live-badge"]')
    const box   = await badge.boundingBox()
    expect(box!.width).toBeGreaterThan(40)
  })

  test('Jitsi déconnecté → slider reste fonctionnel', async ({ page }) => {
    // Bloquer le domaine Jitsi
    await page.route('**/meet.jit.si/**', route => route.abort())
    await page.goto('/shop/pizza-marco/live/1')
    // Le slider doit quand même s'afficher
    await expect(page.locator('[data-testid="pinned-slider"]'))
      .toBeVisible({ timeout: 5_000 })
    // Pas d'erreur bloquante
    await expect(page.locator('[data-testid="error-fatal"]'))
      .not.toBeVisible()
  })
})
