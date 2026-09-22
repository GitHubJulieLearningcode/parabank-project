import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AccountsOverviewPage } from '../pages/AccountsOverviewPage';
import { TestData } from '../utils/testData'

test.describe('Login Module', () => {

    test('TC003 - Invalid Login @smoke', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await page.goto('https://parabank.parasoft.com/parabank');

        await loginPage.login('invalidUser', 'invalidPwd');

        await loginPage.verifyLoginFailed();
    });

    test('TC004 - Blank Username @smoke', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await page.goto('https://parabank.parasoft.com/parabank');

        await loginPage.login('', 'demo');

        await loginPage.verifyLoginFailed();
    });

    test('TC005 - Blank Password @smoke', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await page.goto('https://parabank.parasoft.com/parabank');

        await loginPage.login('john', '');

        await loginPage.verifyLoginFailed();
    });

    test('TC006 - Blank Username And Password @smoke', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await page.goto('https://parabank.parasoft.com/parabank');

        await loginPage.login('', '');

        await loginPage.verifyLoginFailed();
    });

});