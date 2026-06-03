import { test, expect } from '../../fixtures/auth.fixture';

test.describe('Password Reset Flow', () => {
  test('should request a password reset email successfully', async ({ authPage }) => {
    await authPage.gotoLogin();
    await authPage.requestPasswordReset('admin@gustomenu.com');
    
    // Expect a success confirmation message
    await expect(authPage.successMessage).toBeVisible();
    await expect(authPage.successMessage).toContainText(/sent|check your email/i);
  });

  test('should show error for non-existent email', async ({ authPage }) => {
    await authPage.gotoLogin();
    await authPage.requestPasswordReset('doesnotexist12345@example.com');
    
    // Depending on security practices, it might show an error or a generic success message
    // Assuming it shows an error for this test
    await expect(authPage.errorMessage).toBeVisible();
  });
});
