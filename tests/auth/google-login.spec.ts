import { test, expect } from '../../fixtures/auth.fixture';

test.describe('Google SSO Flow', () => {
  test('should redirect to Google login', async ({ authPage, page }) => {
    await authPage.gotoLogin();
    
    // Wait for the popup or redirect after clicking Google login
    const [popup] = await Promise.all([
      page.waitForEvent('popup').catch(() => null), // Catch timeout if it's a direct redirect instead of a popup
      authPage.loginWithGoogle()
    ]);
    
    if (popup) {
      await expect(popup).toHaveURL(/.*accounts\.google\.com/);
      await popup.close();
    } else {
      await expect(page).toHaveURL(/.*accounts\.google\.com/);
    }
  });
});
