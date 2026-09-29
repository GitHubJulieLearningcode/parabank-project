import { Page, Locator, expect } from '@playwright/test';

export class LoanRequestPage {

  readonly page: Page;

  readonly requestLoanLink: Locator;

  readonly loanAmount: Locator;
  readonly downPayment: Locator;
  readonly fromAccount: Locator;

  readonly applyNowButton: Locator;

  readonly loanStatus: Locator;
  readonly loanAccountId: Locator;

  constructor(page: Page) {

    this.page = page;

    this.requestLoanLink =
      page.getByRole('link', {
        name: 'Request Loan'
      });

    this.loanAmount =
      page.locator('#amount');

    this.downPayment =
      page.locator('#downPayment');

    this.fromAccount =
      page.locator('#fromAccountId');

    this.applyNowButton =
      page.getByRole('button', {
        name: 'Apply Now'
      });

    this.loanStatus =
      page.locator('#loanStatus');

    this.loanAccountId =
      page.locator('#newAccountId');
  }

  async navigateToLoanPage() {

    await this.requestLoanLink.click();

    await expect(
      this.loanAmount
    ).toBeVisible();
  }

  async applyLoan(
    amount: string,
    downPayment: string
  ) {

    await this.loanAmount.fill(amount);

    await this.downPayment.fill(
      downPayment
    );

    await this.fromAccount.selectOption({
      index: 0
    });

    await this.applyNowButton.click();
  }

  async verifyLoanApproved() {

    await expect(
      this.page.getByText('Congratulations, your loan')
    ).toBeVisible();
  }

  async verifyLoanDenied() {

    await expect(
      this.page.getByText('Denied')
    ).toBeVisible();
  }

  async getLoanAccountId() {

    return (
      await this.loanAccountId.textContent()
    )?.trim();
  }

  async verifyLoanAccountGenerated() {

    await expect(
this.page.getByText(
'Your new account number:'
)
).toBeVisible();
  }

  async createApprovedLoan() {

    await this.applyLoan(
      '1000',
      '100'
    );

    await this.verifyLoanApproved();

    return await this.getLoanAccountId();
  }
  
}