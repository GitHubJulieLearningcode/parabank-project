import { Page, Locator, expect } from '@playwright/test';

export class OpenNewAccountPage {

  readonly page: Page;
  readonly openAccountMenu: Locator;
  readonly accountTypeDropdown: Locator;
  readonly fromAccountDropdown: Locator;
  readonly openAccountButton: Locator;
  readonly newAccountId: Locator;

  constructor(page: Page) {
    this.page = page;

    this.openAccountMenu =
      page.getByRole('link', {
        name: 'Open New Account'
      });

    this.accountTypeDropdown =
      page.locator('#type');

    this.fromAccountDropdown =
      page.locator('#fromAccountId');

    this.openAccountButton =
      page.locator(
        'input[value="Open New Account"]'
      );

    this.newAccountId =
      page.locator('#newAccountId');
  }

  async navigateToOpenAccount() {
    await this.openAccountMenu.click();

    await expect(
      this.accountTypeDropdown
    ).toBeVisible();
  }

  async openAccount(
    accountType: 'CHECKING' | 'SAVINGS'
  ) {

    await expect(
      this.accountTypeDropdown
    ).toBeVisible();

    await expect(
      this.fromAccountDropdown
    ).toBeVisible();

    await this.accountTypeDropdown
      .selectOption({
        label: accountType
      });

    await expect(
      this.fromAccountDropdown.locator(
        'option[value\]:not([value=""])'
      )
    ).not.toHaveCount(0, {
      timeout: 15000
    });

    await this.fromAccountDropdown
      .selectOption({
        index: 0
      });

    await this.openAccountButton.click();

    await expect(
      this.page.getByRole('heading', {
        name: 'Account Opened!'
      })
    ).toBeVisible({
      timeout: 30000
    });
  }

  async getNewAccountId() {

    await expect(
      this.newAccountId
    ).toBeVisible({
      timeout: 15000
    });

    return (
      await this.newAccountId.textContent()
    )?.trim();
  }

  async verifyAccountCreated() {

    await expect(
      this.page.getByRole('heading', {
        name: 'Account Opened!'
      })
    ).toBeVisible({
      timeout: 30000
    });
  }
}