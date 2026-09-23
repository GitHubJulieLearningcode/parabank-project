import { Locator, Page, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegistrationPage';
import { AccountsOverviewPage } from '../pages/AccountsOverviewPage';
import { TestData } from '../utils/testData';
export class helper
{
     static generateUniqueUsername(prefix: string) {

    return `${prefix}${Date.now()}`;
  }
static async createAndLogoutUser(page: Page) {
const registrationPage = new RegisterPage(page);
const accountsPage = new AccountsOverviewPage(page);
const registrationData = TestData.getRegistrationData();
const user = {
...registrationData,
username: helper.generateUniqueUsername(
registrationData.username
)
};
await registrationPage.navigateToRegistration();
await registrationPage.registerUser(user);
await registrationPage.verifyRegistrationSuccessful();
await accountsPage.logout();
return user;
}
  
   
}
