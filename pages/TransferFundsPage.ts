import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class TransferFundsPage extends BasePage {

  readonly transferFundsLink: Locator;
  readonly amount: Locator;
  readonly fromAccount: Locator;
  readonly toAccount: Locator;
  readonly transferButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.transferFundsLink =
      page.getByRole('link', { name: 'Transfer Funds' });

    this.amount =
      page.locator('#amount');

    this.fromAccount =
      page.locator('#fromAccountId');

    this.toAccount =
      page.locator('#toAccountId');

    this.transferButton =
      page.getByRole('button', { name: 'Transfer' });

    this.successMessage =
      page.getByRole('heading', {
        name: 'Transfer Complete!'
      });
  }

//   async navigateToTransferFunds() {
//     await this.click(this.transferFundsLink);

//     await expect(this.amount).toBeVisible({
//       timeout: 15000
//     });
//   }
  async navigateToTransferFunds() {

  await this.click(this.transferFundsLink);

  await expect(
    this.fromAccount
  ).toBeVisible({
    timeout: 15000
  });

  await expect(
    this.toAccount
  ).toBeVisible({
    timeout: 15000
  });
}
  async transfer(
    amount: string,
    fromAccount: string,
    toAccount: string
  ) {
    await expect(this.fromAccount).toBeVisible();
    await expect(this.toAccount).toBeVisible();

    await this.fill(this.amount, amount);

    await this.fromAccount.selectOption(fromAccount);

    await this.toAccount.selectOption(toAccount);

    await this.transferButton.click();

    await expect(this.successMessage)
      .toBeVisible({
        timeout: 30000
      });
  }

  async verifyTransferSuccessful() {
    await expect(this.successMessage)
      .toBeVisible({
        timeout: 30000
      });
  }

  async performValidTransfer(
    amount = '100'
  ) {

    const fromAccount =
      await this.fromAccount
        .locator('option')
        .first()
        .getAttribute('value');

    const toAccount =
      await this.toAccount
        .locator('option')
        .nth(1)
        .getAttribute('value');

    if (!fromAccount || !toAccount) {
      throw new Error(
        'Source or destination account not found'
      );
    }

    await this.transfer(
      amount,
      fromAccount,
      toAccount
    );

    return {
      fromAccount,
      toAccount,
      transferAmount: Number(amount)
    };
  }
}