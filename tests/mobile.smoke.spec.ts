import { test, expect } from '@playwright/test';
import { helper } from '../utils/helper';
import { OpenNewAccountPage } from '../pages/OpenNewAccountPage';
import { AccountsOverviewPage } from '../pages/AccountsOverviewPage';

test('TC_MV_01 - Mobile Login', async ({ page }) => {

  await page.setViewportSize({
    width: 390,
    height: 844
  });

  await helper.createAndLoginUser(page);

  await expect(page).toHaveURL(/overview/);
});
test('TC_MV_02 - Mobile Accounts Overview',
async ({ page }) => {

  await page.setViewportSize({
    width: 390,
    height: 844
  });
 const accountsPage = new AccountsOverviewPage(page);
  await helper.createAndLoginUser(page);

  await accountsPage.verifyAccountsOverviewLoaded();
});
test('TC_MV_03 - Mobile Open New Account', async ({ page }) => {
 
await page.setViewportSize({
width: 390,
height: 844
});
await helper.createAndLoginUser(page);
const openAccountPage =
new OpenNewAccountPage(page);
await openAccountPage.navigateToOpenAccount();
await openAccountPage.openAccount('SAVINGS');
await expect(
page.getByText('Account Opened!')
).toBeVisible({
timeout: 30000
});
});
test('TC_MV_04 - Mobile Bill Pay',
async ({ page }) => {

  await page.setViewportSize({
    width: 390,
    height: 844
  });

  await helper.createAndLoginUser(page);

  // Reuse existing BillPay page methods
});
test('TC_MV_05 - Mobile Logout',
async ({ page }) => {

  await page.setViewportSize({
    width: 390,
    height: 844
  });

  await helper.createAndLoginUser(page);

  await helper.logout(page);
});