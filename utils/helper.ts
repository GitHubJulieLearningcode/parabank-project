import { Page } from '@playwright/test';
import { RegisterPage } from '../pages/RegistrationPage';
import { LoginPage } from '../pages/LoginPage';
import { AccountsOverviewPage } from '../pages/AccountsOverviewPage';
import { TestData } from '../utils/testData';

export class helper {

 static generateUniqueUsername(prefix: string): string {
return `${prefix}${Math.random().toString(36).slice(2, 5)}`;
}

  static async createAndLogoutUser(page: Page) {
    await page.goto('/');
    const registrationPage = new RegisterPage(page);
    const accountsPage = new AccountsOverviewPage(page);

    const registrationData = TestData.getRegistrationData();

    const user = {
      ...registrationData,
      username: helper.generateUniqueUsername(
        registrationData.username,
        
      ),
      ssn: Date.now().toString(),
      phone: `9${Date.now().toString().slice(-9)}`
    };
     console.log('Generated Username:', user.username);

    await registrationPage.navigateToRegistration();
    await registrationPage.registerUser(user);
    await registrationPage.verifyRegistrationSuccessful();

    await accountsPage.logout();

    return user;
  }

  static async createAndLoginUser(page: Page) {
    await page.goto('/');
    const registrationPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);
    const accountsPage = new AccountsOverviewPage(page);
     console.log('Starting registration');
    const registrationData = TestData.getRegistrationData();
 
    const user = {
      ...registrationData,
      username: helper.generateUniqueUsername(
        registrationData.username
      ),
      ssn: Date.now().toString(),
      phone: `9${Date.now().toString().slice(-9)}`
    };
    console.log('Generated Username:', user.username);
    await registrationPage.navigateToRegistration();
    await registrationPage.registerUser(user);
    await registrationPage.verifyRegistrationSuccessful();
    console.log('Registration completed');

    await accountsPage.logout();

    await loginPage.login(
      user.username,
      user.password
    );
    console.log('Login completed');
    return user;
  }

  static async logout(page: Page) {
    const accountsPage = new AccountsOverviewPage(page);
    await accountsPage.logout();
  }
//because server issue
  static async loginExistingUser(page: Page) {
  const loginPage = new LoginPage(page);
 
await page.goto(
'https://parabank.parasoft.com/parabank'
);
 
await loginPage.login(
'julie',
'123'
);
}

}