// Boundary value and special character validations are not implemented in ParaBank.
// The application accepts most input formats without validation, so these scenarios
// do not produce meaningful negative test results and are excluded from automation.
import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegistrationPage';
import { AccountsOverviewPage } from '../pages/AccountsOverviewPage';
import { TestData } from '../utils/testData';
import { helper } from '../utils/helper';
import { LoginPage } from '../pages/LoginPage';



test.describe('Registration Tests', () => {
    

test.beforeEach(async ({ page }) => {
await page.goto('/');
});

test('TC003 - Registration Mandatory Field Validation @regression', async ({ page }) => {
 
  const registrationPage = new RegisterPage(page);
  await registrationPage.navigateToRegistration();
  await registrationPage.clickRegister();
  const errors = [
  'First name is required.',
  'Last name is required.',
  'Address is required.',
  'City is required.',
  'State is required.',
  'Zip Code is required.',
  'Social Security Number is required.',
  'Username is required.',
  'Password is required.',
  'Password confirmation is required.'
];

for (const error of errors) {
  await registrationPage.verifyErrorMessage(error);
}

});
test('TC004 - Registration - Invalid data handling-Password Mismatch @regression', async ({ page }) => {
 const registrationPage = new RegisterPage(page);
        const registrationData =
                TestData.getInvalidUser();

       const invalidUser = {
                ...registrationData,
                username: helper.generateUniqueUsername(
                    registrationData.username
                ),
                password: 'Test123',
                confirmPassword: 'Test456'
            };
            await registrationPage.navigateToRegistration();

            await registrationPage.registerUser(invalidUser);
            await registrationPage.verifyErrorMessage('Passwords did not match.');

});
test('TC005 - Registration - Duplicate Username @regression', async ({
  page,
}) => {

  const registrationPage = new RegisterPage(page);
  const accountsPage = new AccountsOverviewPage(page);

  // Create user data
  const registrationData = TestData.getRegistrationData();

  const user = {
    ...registrationData,
    username: helper.generateUniqueUsername(
      registrationData.username
    ),
  };

  // First Registration
  await registrationPage.navigateToRegistration();
  await registrationPage.registerUser(user);
  await registrationPage.verifyRegistrationSuccessful();

  // Logout
  await accountsPage.logout();

  // Second Registration with same username
  await registrationPage.navigateToRegistration();
  await registrationPage.registerUser(user);

  // Verify duplicate username error
  await registrationPage.verifyErrorMessage(
    'This username already exists.'
  );
});
test('TC006 - Registration - Refresh/Back Browser @regression', async ({
  page,
}) => {

  const registrationPage = new RegisterPage(page);
  const Login=new LoginPage(page);

  await registrationPage.navigateToRegistration();

  await registrationPage.firstName.fill('Julie');

  await page.reload();

  await registrationPage.verifyRegistrationPageDisplayed();

  await page.goBack();

  await Login.verifyLoginPageLoaded();

  await registrationPage.navigateToRegistration();

  await registrationPage.verifyRegistrationPageDisplayed();
});

});