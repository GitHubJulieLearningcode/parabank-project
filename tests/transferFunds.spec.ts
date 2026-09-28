import { test, expect } from '@playwright/test';
import { helper } from '../utils/helper';
import { TransferFundsPage } from '../pages/TransferFundsPage';
import { AccountsOverviewPage } from '../pages/AccountsOverviewPage';
import { OpenNewAccountPage } from '../pages/OpenNewAccountPage';

test.describe('Fund Transfers', () => {

  let transferPage: TransferFundsPage;
  let accountsPage: AccountsOverviewPage;
  let openAccountPage: OpenNewAccountPage;

  test.beforeEach(async ({ page }) => {

    //await helper.loginExistingUser(page);
    await helper.createAndLoginUser(page);

    transferPage =
      new TransferFundsPage(page);

    accountsPage =
      new AccountsOverviewPage(page);

    openAccountPage =
      new OpenNewAccountPage(page);

    await openAccountPage.navigateToOpenAccount();

    await openAccountPage.openAccount('SAVINGS');
  });

  // test.afterEach(async ({ page }) => {

  //   if (!page.isClosed()) {
  //     await helper.logout(page);
  //   }
  // });

  test(
    'TC031 - Transfer Funds Between Own Accounts @smoke',
    async () => {

      await transferPage.navigateToTransferFunds();

      await transferPage.performValidTransfer();

      await transferPage.verifyTransferSuccessful();
    }
  );

  test(
    'TC032 - Verify Transfer Success Message',
    async () => {

      await transferPage.navigateToTransferFunds();

      await transferPage.performValidTransfer();

      await transferPage.verifyTransferSuccessful();

      await expect(
        transferPage.successMessage
      ).toBeVisible();
    }
  );

  test(
    'TC033 - Verify Source Account Balance Debited',
    async () => {

      await transferPage.navigateToTransferFunds();

      const transferDetails =
        await transferPage.performValidTransfer(
          '100'
        );

      await accountsPage
        .navigateToAccountsOverview();

      const sourceAccount =
        transferDetails.fromAccount;

      const balanceAfter =
        await accountsPage
          .getAccountBalance(sourceAccount);

      await transferPage
        .navigateToTransferFunds();

      const secondTransfer =
        await transferPage.performValidTransfer(
          '100'
        );

      await accountsPage
        .navigateToAccountsOverview();

      const balanceAfterSecondTransfer =
        await accountsPage
          .getAccountBalance(
            secondTransfer.fromAccount
          );

      expect(
        balanceAfterSecondTransfer
      ).toBe(
        balanceAfter -
        secondTransfer.transferAmount
      );
    }
    
  );
  test('TC034 - Transfer Minimum Amount @regression', async () => {

  await transferPage.navigateToTransferFunds();

  const transferDetails =
    await transferPage.performValidTransfer('1');

  await transferPage.verifyTransferSuccessful();

  expect(transferDetails.transferAmount)
    .toBe(1);
});
test('TC035 - Verify Amount Field Accepts Numbers @regression', async () => {

  await transferPage.navigateToTransferFunds();

  await transferPage.amount.fill('500');

  await expect(
    transferPage.amount
  ).toHaveValue('500');
});
test('TC036 - Verify Amount Field Mandatory @regression', async () => {

  await transferPage.navigateToTransferFunds();

  const fromAccount =
    await transferPage.fromAccount
      .locator('option')
      .first()
      .getAttribute('value');

  const toAccount =
    await transferPage.toAccount
      .locator('option')
      .nth(1)
      .getAttribute('value');

  await transferPage.fromAccount.selectOption(
    fromAccount!
  );

  await transferPage.toAccount.selectOption(
    toAccount!
  );

  await transferPage.transferButton.click();

  await expect(
    transferPage.successMessage
  ).not.toBeVisible();
});
test('TC037 - Verify Transfer Page UI @regression', async () => {

  await transferPage.navigateToTransferFunds();

  await expect(
    transferPage.amount
  ).toBeVisible();

  await expect(
    transferPage.fromAccount
  ).toBeVisible();

  await expect(
    transferPage.toAccount
  ).toBeVisible();

  await expect(
    transferPage.transferButton
  ).toBeVisible();
});
test('TC038 - Transfer Between Different Accounts @regression', async () => {

  await transferPage.navigateToTransferFunds();

  const transfer =
    await transferPage.performValidTransfer(
      '100'
    );

  expect(
    transfer.fromAccount
  ).not.toBe(
    transfer.toAccount
  );

  await transferPage.verifyTransferSuccessful();
});
test('TC039 - Verify Transfer Success Message @regression', async () => {

  await transferPage.navigateToTransferFunds();

  await transferPage.performValidTransfer(
    '200'
  );

  await expect(
    transferPage.successMessage
  ).toBeVisible({
    timeout: 30000
  });
});
  
});