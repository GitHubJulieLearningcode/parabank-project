import { test, expect } from '@playwright/test';
import { helper } from '../utils/helper';

import { LoanRequestPage }
from '../pages/LoanRequestPage ';

import { AccountsOverviewPage }
from '../pages/AccountsOverviewPage';

import { TransferFundsPage }
from '../pages/TransferFundsPage';

import { loanMatrix }
from '../testData/loanRequestData';
test.describe('Loan Request Tests', () => {

  let loanPage: LoanRequestPage;
  let accountsPage: AccountsOverviewPage;

  test.beforeEach(async ({ page }) => {

    await helper.createAndLoginUser(page);

    loanPage =
      new LoanRequestPage(page);

    accountsPage =
      new AccountsOverviewPage(page);

    await loanPage.navigateToLoanPage();
  });

  test.afterEach(async ({ page }) => {

    try {
      await helper.logout(page);
    } catch (error) {
      console.log(
        'Logout skipped:',
        error
      );
    }

});
test('TC-RLN-001 - Request Loan With Valid Details @smoke',
async () => {

  await loanPage.applyLoan(
    '1000',
    '100'
  );

  await loanPage.verifyLoanApproved();
});
test('TC-RLN-002 - Verify Loan Account Visible In Overview',
async () => {

  await loanPage.applyLoan(
    '1000',
    '100'
  );

  await loanPage.verifyLoanApproved();
  await accountsPage.navigateToAccountsOverview();
  await accountsPage.verifyAccountsOverviewLoaded();
});
test('TC-RLN-003 - Verify Loan Account Generated',
async () => {

  await loanPage.applyLoan(
    '1000',
    '100'
  );

  await loanPage
    .verifyLoanAccountGenerated();
});
test('TC-RLN-004 - Apply Multiple Loans',
async () => {

  await loanPage.applyLoan(
    '1000',
    '100'
  );


    await loanPage.verifyLoanAccountGenerated();

  await loanPage.navigateToLoanPage();

  await loanPage.applyLoan(
    '2000',
    '200'
  );

    await loanPage.verifyLoanAccountGenerated();

 
});
test('TC-RLN-005 - Down Payment Exceeds Balance',
async () => {

  await loanPage.applyLoan(
    '1000',
    '999999'
  );

  await loanPage.verifyLoanDenied();
});
test('TC-RLN-006 - Blank Loan Amount',
async () => {

  await loanPage.applyLoan(
    '',
    '100'
  );
});
test('TC-RLN-007- Blank Down Payment',
async () => {

  await loanPage.applyLoan(
    '1000',
    ''
  );
});
test('TC-RLN-008 - Loan Amount Zero',
async () => {

  await loanPage.applyLoan(
    '0',
    '100'
  );
});
test('TC-RLN-009 - Down Payment Zero',
async () => {

  await loanPage.applyLoan(
    '1000',
    '0'
  );
});
test('TC-RLN-010 - Negative Loan Amount',
async () => {

  await loanPage.applyLoan(
    '-1000',
    '100'
  );
});
test('TC-RLN-011 - Negative Down Payment',
async () => {

  await loanPage.applyLoan(
    '1000',
    '-100'
  );
});
test('TC-RLN-012 - Non Numeric Loan Amount',
async () => {

  await loanPage.applyLoan(
    'ABC',
    '100'
  );
});
test('TC-RLN-013 - Non Numeric Down Payment',
async () => {

  await loanPage.applyLoan(
    '1000',
    'XYZ'
  );
});
test('TC-RLN-014 - Down Payment Equals Loan Amount',
async () => {

  await loanPage.applyLoan(
    '500',
    '500'
  );
});
});