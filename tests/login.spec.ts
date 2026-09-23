import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AccountsOverviewPage } from '../pages/AccountsOverviewPage';
import { TestData } from '../utils/testData';
import { RegisterPage } from '../pages/RegistrationPage';
import { helper } from '../utils/helper';

    
test.beforeEach(async ({ page }) => {
await page.goto('/');
});

test.describe('Login Module', () => {

    test('TC009 - Login - Valid Flow @smoke @regression', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const accountsPage = new AccountsOverviewPage(page);

    // Create user and logout
    const user = await helper.createAndLogoutUser(page);

    // Login with created user
    await loginPage.login(
        user.username,
        user.password
    );

    // Verify successful login
    await accountsPage.verifyAccountsOverviewLoaded();
});

    test('TC010 - Invalid Login @smoke @regression', async ({ page }) => {

        const loginPage = new LoginPage(page);
        const invalidUser = TestData.getInvalidLoginUser();

        await loginPage.login(
            invalidUser.username,
            invalidUser.password
             );
        await loginPage.verifyLoginFailed();
    });

    test('TC011 - Blank Username @smoke @regression', async ({ page }) => {

        const loginPage = new LoginPage(page);

        const user = TestData.getRegistrationData();

       await loginPage.login(
                      '',
                     user.password
                     );

        await loginPage.verifyLoginFailed();
    });

    test('TC012 - Blank Password @smoke @regression', async ({ page }) => {

        const loginPage = new LoginPage(page);

       const user = TestData.getRegistrationData();
       await loginPage.login(
               user.username,
                   ''
                   );

        await loginPage.verifyLoginFailed();
    });

    test('TC013 - Blank Username And Password @smoke @regression', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.login('', '');

        await loginPage.verifyLoginFailed();
    });
// Boundary Value Analysis is out of scope for ParaBank login functionality.
// The application does not enforce or validate username/password length limits.
// Therefore, boundary testing does not provide meaningful validation coverage here.
    test('TC014 - Login - Boundary Value Check @regression', async ({ page }) => {
            const loginPage = new LoginPage(page);
            const boundaryData = TestData.getLoginBoundaryData();
         await loginPage.login(
                  boundaryData.exceedUsername,
                  boundaryData.minPassword
           );
          await loginPage.verifyLoginFailed();
     });
// Special character validation is covered to verify application behavior.
// ParaBank does not enforce explicit character restrictions on login fields,
// therefore validation focuses on error handling and application stability.
     test('TC015 - Login - Special Characters Validation @regression', async ({ page }) => {

    const loginPage = new LoginPage(page);

    const testData = TestData.getSpecialCharacterUsers();

    for (const user of testData) {

        await loginPage.login(
            user.username,
            user.password
        );

        await loginPage.verifyLoginFailed();

        await page.goto('/');
    }
});
    test('TC016 - Login - Duplicate Request/Data @regression', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const registrationPage = new RegisterPage(page);
    const accountsPage = new AccountsOverviewPage(page);
    const user = await helper.createAndLogoutUser(page);

    // Enter credentials
    await loginPage.username.fill(user.username);
    await loginPage.password.fill(user.password);

    // Multiple login clicks
    await Promise.all([
        loginPage.loginButton.click(),
        loginPage.loginButton.click(),
        loginPage.loginButton.click()
    ]);

    await accountsPage.verifyAccountsOverviewLoaded();
});
test('TC017 - Login - Refresh Browser @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const accountsPage = new AccountsOverviewPage(page);
    const user = await helper.createAndLogoutUser(page);
     await loginPage.login(
    user.username,
    user.password
      );
     await accountsPage.verifyAccountsOverviewLoaded();
     await page.reload();
     await accountsPage.verifyAccountsOverviewLoaded();
});


test('TC018 - Login - Multi-session Behavior @regression', async ({ browser, page }) => {

    // Create unique user and logout
    const user = await helper.createAndLogoutUser(page);

    // Session 1
    const context1 = await browser.newContext();
    const page1 = await context1.newPage();

    const loginPage1 = new LoginPage(page1);
    const accountsPage1 = new AccountsOverviewPage(page1);

    await page1.goto('/');

    await loginPage1.login(
        user.username,
        user.password
    );

    await accountsPage1.verifyAccountsOverviewLoaded();

    // Session 2
    const context2 = await browser.newContext();
    const page2 = await context2.newPage();

    const loginPage2 = new LoginPage(page2);
    const accountsPage2 = new AccountsOverviewPage(page2);

    await page2.goto('/');

    await loginPage2.login(
        user.username,
        user.password
    );

    await accountsPage2.verifyAccountsOverviewLoaded();

    await context1.close();
    await context2.close();
});

});
