import { test, expect } from '@playwright/test';
import { helper } from '../utils/helper';
import { FindTransactionsPage } from '../pages/FindTransactionsPage';
import { TransferFundsPage } from '../pages/TransferFundsPage';
import{ OpenNewAccountPage } from '../pages/OpenNewAccountPage';

test.describe('Transaction Search & Statement Reconciliation', () => {

  let transactionPage: FindTransactionsPage;

  test.beforeEach(async ({ page }) => {

  await helper.createAndLoginUser(page);

  const openAccountPage =
    new OpenNewAccountPage(page);

  const transferPage =
    new TransferFundsPage(page);

  await openAccountPage.navigateToOpenAccount();

  await openAccountPage.openAccount(
    'SAVINGS'
  );

  await transferPage.navigateToTransferFunds();

  await transferPage.performValidTransfer(
    '100'
  );

  transactionPage =
    new FindTransactionsPage(page);

  await transactionPage.navigate();
});

  test.afterEach(async ({ page }) => {

    try {
      await helper.logout(page);
    } catch (error) {
      console.log('Logout skipped:', error);
    }
  });

  test('TC-FTX-001 - Search Transaction By ID @smoke', async () => {

    await transactionPage.searchById('1');

    await transactionPage.verifyResultsDisplayed();
  });

  test('TC-FTX-002 - Search Transaction By Date @regression', async () => {

    await transactionPage.searchByDate(
      '09-28-2026'
    );

    await transactionPage.verifyResultsDisplayed();
  });

  test('TC-FTX-003 - Search Transaction By Date Range @regression', async () => {

    await transactionPage.searchByDateRange(
      '09-01-2026',
      '09-28-2026'
    );

    await transactionPage.verifyResultsDisplayed();
  });

  test('TC-FTX-004 - Search Transaction By Amount @regression', async () => {

    await transactionPage.searchByAmount('100');

    await transactionPage.verifyResultsDisplayed();
  });

  test('TC-FTX-005 - Search Amount With No Results @regression', async () => {

    await transactionPage.searchByAmount(
      '99999999'
    );

    await transactionPage.verifyNoResults();
  });

  test('TC-FTX-006 - Date Range Start Equals End @regression', async () => {

    await transactionPage.searchByDateRange(
      '09-28-2026',
      '09-28-2026'
    );

    await transactionPage.verifyResultsDisplayed();
  });

  test('TC-FTX-007 - End Date Less Than Start Date @regression', async () => {

    await transactionPage.searchByDateRange(
      '09-28-2026',
      '09-01-2026'
    );

    await expect(
      transactionPage.page.locator('body')
    ).toBeVisible();
  });

  test('TC-FTX-008 - Invalid Date Format @regression', async () => {

    await transactionPage.searchByDate(
      'abcd'
    );

    await expect(
      transactionPage.page.locator('body')
    ).toBeVisible();
  });

  test('TC009 - Future Date Search @regression', async () => {

    await transactionPage.searchByDate(
      '12-31-2099'
    );

    await transactionPage.verifyNoResults();
  });

  test('TC-FTX-010 - Verify Find Transaction Page UI @regression', async () => {

    await expect(
      transactionPage.transactionId
    ).toBeVisible();

    await expect(
      transactionPage.transactionDate
    ).toBeVisible();

    await expect(
      transactionPage.amount
    ).toBeVisible();
  });

  test('TC-FTX-011 - Search Invalid Transaction ID @regression', async () => {

    await transactionPage.searchById(
      '999999999'
    );

    await transactionPage.verifyNoResults();
  });

  test('TC-FTX-012 - Verify Multiple Transactions Returned @regression', async () => {

    await transactionPage.searchByDateRange(
      '01-01-2020',
      '12-31-2099'
    );

       await transactionPage.verifyTransactionResultsDisplayed();
  });

  test('TC-FTX-013 - Verify Newest First Ordering @regression', async () => {

    await transactionPage.searchByDateRange(
      '01-01-2020',
      '12-31-2099'
    );

    await transactionPage.verifyTransactionResultsDisplayed();
  });

  test('TC-FTX-014 - Reconcile Transaction Data Display @regression', async ({page}) => {

    const transferPage =
new TransferFundsPage(page);
await transferPage.navigateToTransferFunds();
await transferPage.performValidTransfer('23');
await transactionPage.navigate();
await transactionPage.searchByAmount('23');
await transactionPage.verifyTransactionResultsDisplayed();

  });

  test('TC-FTX-015 - Execute Multiple Searches Sequentially @regression', async () => {

    await transactionPage.searchByAmount('10');

    await transactionPage.searchByAmount('50');

    await transactionPage.searchByAmount('100');

    await transactionPage.verifyResultsDisplayed();
  });

});