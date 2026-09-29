import { Page, Locator, expect } from '@playwright/test';

export class FindTransactionsPage {

  readonly page: Page;

  readonly findTransactionsLink: Locator;

  readonly transactionId: Locator;
  readonly findByIdButton: Locator;

  readonly transactionDate: Locator;
  readonly findByDateButton: Locator;

  readonly fromDate: Locator;
  readonly toDate: Locator;
  readonly findByDateRangeButton: Locator;

  readonly amount: Locator;
  readonly findByAmountButton: Locator;

  readonly resultTable: Locator;

  constructor(page: Page) {

    this.page = page;

    this.findTransactionsLink =
      page.getByRole('link', {
        name: 'Find Transactions'
      });

    this.transactionId =
      page.locator('#transactionId');

    this.findByIdButton =
      page.locator('#findById');

    this.transactionDate =
      page.locator('#transactionDate');

    this.findByDateButton =
      page.locator('#findByDate');

    this.fromDate =
      page.locator('#fromDate');

    this.toDate =
      page.locator('#toDate');

    this.findByDateRangeButton =
      page.locator('#findByDateRange');

    this.amount =
      page.locator('#amount');

    this.findByAmountButton =
      page.locator('#findByAmount');

    this.resultTable =
      page.locator('#transactionTable');
  }

  async navigate() {

    await this.findTransactionsLink.click();

    await expect(
      this.transactionId
    ).toBeVisible({
      timeout: 15000
    });
  }

  async searchById(id: string) {

    await this.transactionId.fill(id);

    await this.findByIdButton.click();
  }

  async searchByDate(date: string) {

    await this.transactionDate.fill(date);

    await this.findByDateButton.click();
  }

  async searchByDateRange(
    fromDate: string,
    toDate: string
  ) {

    await this.fromDate.fill(fromDate);

    await this.toDate.fill(toDate);

    await this.findByDateRangeButton.click();
  }

  async searchByAmount(amount: string) {

    await this.amount.fill(amount);

    await this.findByAmountButton.click();
  }

  async verifyResultsDisplayed() {

    await expect(
      this.page.locator('table')
    ).toBeVisible();
  }

  async verifyNoResults() {

  const rows = await this.page
    .locator('#transactionTable tbody tr')
    .count();

  expect(rows).toBe(0);
}

  async getResultRowsCount() {

    return await this.page
      .locator('table tbody tr')
      .count();
  }
  async verifyTransactionResultsDisplayed() {

  await expect(
    this.page.getByRole('heading', {
      name: 'Transaction Results'
    })
  ).toBeVisible();
}
}