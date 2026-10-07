import { test, expect, Page } from '@playwright/test';
import { helper } from '../utils/helper';
import { OpenNewAccountPage } from '../pages/OpenNewAccountPage';
import { AccountsOverviewPage } from '../pages/AccountsOverviewPage';

test.describe('Accounts & Balances', () => {
  test.describe.configure({ mode: 'serial' });

  let page: Page;
  let openAccountPage: OpenNewAccountPage;
  let accountsPage: AccountsOverviewPage;

  test.beforeEach(async ({ browser }) => {
  
    page = await browser.newPage();

    await helper.createAndLoginUser(page);
    //await helper.loginExistingUser(page);

    openAccountPage = new OpenNewAccountPage(page);
    accountsPage = new AccountsOverviewPage(page);

    await accountsPage.verifyAccountsOverviewLoaded();
  });

  test.afterEach(async () => {
    try {
      await helper.logout(page);
    } catch (error) {
      console.log('Logout skipped:', error);
    }

    await page.close();
  });

  test('TC-OAC-001- Open CHECKING Account @smoke', async () => {
    await accountsPage.navigateToAccountsOverview();

    const balancesBefore =
      await accountsPage.getAllBalances();

    const totalBefore = balancesBefore.reduce(
      (sum, balance) => sum + balance,
      0
    );

    await openAccountPage.navigateToOpenAccount();
    await openAccountPage.openAccount('CHECKING');
    await openAccountPage.verifyAccountCreated();

    const newAccountId =
      await openAccountPage.getNewAccountId();

    expect(newAccountId).toBeTruthy();

    await accountsPage.navigateToAccountsOverview();
    await accountsPage.verifyAccountPresent(
      newAccountId!
    );

  });

  test('TC-OAC-002 - Open SAVINGS Account @regression', async () => {
    await openAccountPage.navigateToOpenAccount();
    await openAccountPage.openAccount('SAVINGS');
    await openAccountPage.verifyAccountCreated();

    const accountId =
      await openAccountPage.getNewAccountId();

    expect(accountId).toBeTruthy();

    await accountsPage.navigateToAccountsOverview();
    await accountsPage.verifyAccountPresent(
      accountId!
    );
  });

  test('TC-OAC-003 - Verify New Account ID Generated @regression', async () => {
    await openAccountPage.navigateToOpenAccount();
    await openAccountPage.openAccount('CHECKING');

    const accountId =
      await openAccountPage.getNewAccountId();

    expect(accountId).toBeTruthy();
    expect(accountId).toMatch(/^\d+$/);
  });

  test('TC-OAC-004 - Verify Account Appears In Overview @regression', async () => {
    await openAccountPage.navigateToOpenAccount();
    await openAccountPage.openAccount('CHECKING');

    const accountId =
      await openAccountPage.getNewAccountId();

    await accountsPage.navigateToAccountsOverview();

    await accountsPage.verifyAccountPresent(
      accountId!
    );
  });

  test('TC-OAC-005 - Verify Source Account Balance Reduced @regression', async () => {
    await accountsPage.navigateToAccountsOverview();

    const sourceAccount =
      await accountsPage.getFirstAccountId();

    const balanceBefore =
      await accountsPage.getAccountBalance(
        sourceAccount
      );

    await openAccountPage.navigateToOpenAccount();
    await openAccountPage.openAccount('CHECKING');

    await accountsPage.navigateToAccountsOverview();

    const balanceAfter =
      await accountsPage.getAccountBalance(
        sourceAccount
      );

    expect(balanceAfter).toBeLessThan(balanceBefore);
  });

  test('TC-OAC-006 - Open Two CHECKING Accounts @regression', async () => {
    const accountIds: string[] = [];

    for (let i = 0; i < 2; i++) {
      await openAccountPage.navigateToOpenAccount();

      await openAccountPage.openAccount(
        'CHECKING'
      );

      accountIds.push(
        (await openAccountPage.getNewAccountId()) ??
          ''
      );
    }

    expect(accountIds).toHaveLength(2);
    expect(accountIds[0]).not.toBe(
      accountIds[1]
    );
  });

  test('TC-OAC-007 - Open Two SAVINGS Accounts @regression', async () => {
const accountIds: string[] = [];
for (let i = 0; i < 2; i++) {
await openAccountPage.navigateToOpenAccount();
await openAccountPage.openAccount(
'SAVINGS'
);
accountIds.push(
(await openAccountPage.getNewAccountId()) ??
''
);
}
expect(accountIds).toHaveLength(2);
expect(accountIds[0]).not.toBe(
accountIds[1]
);
});
test('TC-OAC-008 - Verify Multiple Accounts Visible @regression', async () => {
const createdAccounts: string[] = [];
for (let i = 0; i < 3; i++) {
await openAccountPage.navigateToOpenAccount();
await openAccountPage.openAccount(
'CHECKING'
);
createdAccounts.push(
(await openAccountPage.getNewAccountId()) ??
''
);
}
await accountsPage.navigateToAccountsOverview();
for (const account of createdAccounts) {
await accountsPage.verifyAccountPresent(
account
);
}
});
test('TC-OAC-009 - Verify Account ID Uniqueness @regression', async () => {
await openAccountPage.navigateToOpenAccount();
await openAccountPage.openAccount('CHECKING');
const accountId1 =
await openAccountPage.getNewAccountId();
await openAccountPage.navigateToOpenAccount();
await openAccountPage.openAccount('CHECKING');
const accountId2 =
await openAccountPage.getNewAccountId();
expect(accountId1).toBeTruthy();
expect(accountId2).toBeTruthy();
expect(accountId1).not.toBe(accountId2);
});
test('TC-OAC-010 - Open New Savings Account', async () => {

  await openAccountPage.navigateToOpenAccount();

  await openAccountPage.openAccount('SAVINGS');

  await openAccountPage.verifyAccountCreated();
});

test('TC-OAC-011 - Open New Checking Account', async () => {

  await openAccountPage.navigateToOpenAccount();

  await openAccountPage.openAccount('CHECKING');

  await openAccountPage.verifyAccountCreated();
});

test('TC-OAC-012 - Verify New Account ID Is Generated', async () => {

  await openAccountPage.navigateToOpenAccount();

  await openAccountPage.openAccount('SAVINGS');

  const accountId =
    await openAccountPage.getNewAccountId();

  expect(accountId).toBeTruthy();
  expect(accountId).toMatch(/^\d+$/);
});

test('TC-OAC-013 - Verify Account Type Dropdown Values', async () => {

  await openAccountPage.navigateToOpenAccount();

  const options =
    await openAccountPage.accountTypeDropdown
      .locator('option')
      .allTextContents();

  expect(options).toContain('CHECKING');
  expect(options).toContain('SAVINGS');
});



test('TC-OAC-014 - Create Two Savings Accounts Sequentially', async () => {

  await openAccountPage.navigateToOpenAccount();

  await openAccountPage.openAccount('SAVINGS');

  const firstAccount =
    await openAccountPage.getNewAccountId();

  await openAccountPage.navigateToOpenAccount();

  await openAccountPage.openAccount('SAVINGS');

  const secondAccount =
    await openAccountPage.getNewAccountId();

  expect(firstAccount).not.toBe(secondAccount);
});

test('TC-OAC-015 - Verify Account Numbers Are Unique', async () => {

  await openAccountPage.navigateToOpenAccount();

  await openAccountPage.openAccount('CHECKING');

  const account1 =
    await openAccountPage.getNewAccountId();

  await openAccountPage.navigateToOpenAccount();

  await openAccountPage.openAccount('CHECKING');

  const account2 =
    await openAccountPage.getNewAccountId();

  expect(account1).not.toBe(account2);
});

test('TC-OAC-016 - Open Savings Then Checking Account', async () => {

  await openAccountPage.navigateToOpenAccount();

  await openAccountPage.openAccount('SAVINGS');

  const savingsAccount =
    await openAccountPage.getNewAccountId();

  await openAccountPage.navigateToOpenAccount();

  await openAccountPage.openAccount('CHECKING');

  const checkingAccount =
    await openAccountPage.getNewAccountId();

  expect(savingsAccount).not.toBe(checkingAccount);
});

test('TC-OAC-017 - Verify Newly Created Account Appears In Accounts Overview', async () => {

  await openAccountPage.navigateToOpenAccount();

  await openAccountPage.openAccount('SAVINGS');

  const accountId =
    await openAccountPage.getNewAccountId();

  await accountsPage.navigateToAccountsOverview();

  await accountsPage.verifyAccountPresent(
    accountId!
  );
});

test('TC-OAC-018 - Create Three Accounts In One Session', async () => {

  const accountIds: string[] = [];

  await openAccountPage.navigateToOpenAccount();

  await openAccountPage.openAccount('SAVINGS');

  accountIds.push(
    (await openAccountPage.getNewAccountId()) || ''
  );

  await openAccountPage.navigateToOpenAccount();

  await openAccountPage.openAccount('CHECKING');

  accountIds.push(
    (await openAccountPage.getNewAccountId()) || ''
  );

  await openAccountPage.navigateToOpenAccount();

  await openAccountPage.openAccount('SAVINGS');

  accountIds.push(
    (await openAccountPage.getNewAccountId()) || ''
  );

  expect(new Set(accountIds).size).toBe(3);
});
});