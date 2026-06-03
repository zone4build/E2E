import { test, expect } from '../../fixtures/auth.fixture';

test.describe('Signup Flow', () => {
  test('should successfully register a new user', async ({ authPage, page }) => {
    await authPage.gotoSignup();
    
    // Use a unique email for each test run
    const uniqueEmail = `testuser_${Date.now()}@example.com`;
    await authPage.signup(uniqueEmail, 'SecurePassword123!');
    
    // Expect redirection to dashboard or a success message
    await expect(page).toHaveURL(/.*dashboard|.*login/);
  });

  test('should show error for existing email', async ({ authPage }) => {
    await authPage.gotoSignup();
    
    // Assuming this email already exists in the test DB
    await authPage.signup('admin@gustomenu.com', 'password123');
    
    await expect(authPage.errorMessage).toBeVisible();
    await expect(authPage.errorMessage).toContainText(/already exists|taken/i);
  });

  test('should validate password requirements', async ({ authPage }) => {
    await authPage.gotoSignup();
    
    // Weak password
    await authPage.signup('newuser@example.com', '123');
    
    await expect(authPage.errorMessage).toBeVisible();
  });
});
