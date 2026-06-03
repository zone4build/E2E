import { Page, Locator } from '@playwright/test';

export class AuthPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly loginButton: Locator;
  readonly signupButton: Locator;
  readonly forgotPasswordLink: Locator;
  readonly resetPasswordButton: Locator;
  readonly googleLoginButton: Locator;
  readonly errorMessage: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('input[type="email"]');
    this.passwordInput = page.locator('input[type="password"]').first();
    this.confirmPasswordInput = page.locator('input[name="confirmPassword"]');
    this.loginButton = page.locator('button:has-text("Sign In"), button[type="submit"]');
    this.signupButton = page.locator('button:has-text("Sign Up")');
    this.forgotPasswordLink = page.locator('a:has-text("Forgot Password")');
    this.resetPasswordButton = page.locator('button:has-text("Reset Password")');
    this.googleLoginButton = page.locator('button:has-text("Continue with Google")');
    this.errorMessage = page.locator('.text-red-500, [role="alert"]');
    this.successMessage = page.locator('.text-green-500, .toast-success');
  }

  async gotoLogin() {
    await this.page.goto('/login');
  }

  async gotoSignup() {
    await this.page.goto('/signup');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async signup(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    if (await this.confirmPasswordInput.isVisible()) {
      await this.confirmPasswordInput.fill(password);
    }
    await this.signupButton.click();
  }

  async requestPasswordReset(email: string) {
    await this.forgotPasswordLink.click();
    await this.emailInput.fill(email);
    await this.resetPasswordButton.click();
  }

  async loginWithGoogle() {
    await this.googleLoginButton.click();
  }
}
