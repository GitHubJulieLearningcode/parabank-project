import { test } from '@playwright/test';
import { RegisterPage } from '../../pages/RegistrationPage';
import { LoginPage } from '../../pages/LoginPage';
import { AccountsOverviewPage } from '../../pages/AccountsOverviewPage';
import { TestData } from '../../utils/testData';
import { helper } from '../../utils/helper';

let registeredUser: any;

test.describe('ParaBank Smoke Suite', () => {

    test.describe.configure({
        mode: 'serial'
    });

    test('TC001 - Valid Registration + Auto Login + Logout @smoke',
        async ({ page }) => {

            const registrationPage = new RegisterPage(page);
            const accountsPage = new AccountsOverviewPage(page);

            const registrationData =
                TestData.getRegistrationData();

            registeredUser = {
                ...registrationData,
                username: helper.generateUniqueUsername(
                    registrationData.username
                )
            };

            await page.goto(
                'https://parabank.parasoft.com/parabank'
            );

            await registrationPage.navigateToRegistration();

            await registrationPage.registerUser(
                registeredUser
            );

            await registrationPage.verifyRegistrationSuccessful();


            await accountsPage.logout();
        }
    );

    test('TC002 - Valid Login + Logout @smoke',
        async ({ page }) => {

            const loginPage = new LoginPage(page);
            const accountsPage =
                new AccountsOverviewPage(page);

            await page.goto(
                'https://parabank.parasoft.com/parabank'
            );

            await loginPage.login(
                registeredUser.username,
                registeredUser.password
            );

            await accountsPage.verifyAccountsOverviewLoaded();

            await accountsPage.logout();
        }
    );

});