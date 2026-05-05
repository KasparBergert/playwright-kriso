import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  protected readonly logo: Locator;
  protected readonly consentButton: Locator;
  protected readonly searchInput: Locator;
  protected readonly searchButton: Locator;

  constructor(protected page: Page) {
    this.logo = this.page.locator('.logo-icon');
    this.consentButton = this.page.getByRole('button', { name: /N.ustun|I agree|Accept/i });
    this.searchInput = this.page.locator('#top-search-text');
    this.searchButton = this.page.getByRole('button', { name: 'Search' });
  }

  async acceptCookies() {
    if (await this.consentButton.isVisible({ timeout: 5000 }).catch(() => false)) {
      await this.consentButton.click();
    }
  }

  async verifyLogo() {
    await expect(this.logo).toBeVisible();
  }

  async searchByKeyword(keyword: string) {
    await this.searchInput.click();
    await this.searchInput.fill(keyword);
    await this.searchButton.click();
  }
}
