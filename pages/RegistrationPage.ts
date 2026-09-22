/** Page object for creating a new ParaBank customer account. */
import { Locator, Page ,expect} from '@playwright/test';

import { BasePage } from './BasePage';
import{ helper } from '../utils/helper'
//import { TestUtils } from '../support/webTestutils';

export class RegisterPage extends BasePage {
  readonly registrationLink:Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly address: Locator;
  readonly city: Locator;
  readonly state: Locator;
  readonly zipCode: Locator;
  readonly phone: Locator;
  readonly ssn: Locator;
  readonly username: Locator;
  readonly password: Locator;
  readonly confirmPassword: Locator;
  readonly registerButton: Locator;
  readonly registrationSuccessMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.registrationLink=page.getByRole('link', { name: 'Register' });
    this.firstName = page.locator('input[name="customer.firstName"]');
    this.lastName = page.locator('input[name="customer.lastName"]');
    this.address = page.locator('input[name="customer.address.street"]');
    this.city = page.locator('input[name="customer.address.city"]');
    this.state = page.locator('input[name="customer.address.state"]');
    this.zipCode = page.locator('input[name="customer.address.zipCode"]');
    this.phone = page.locator('input[name="customer.phoneNumber"]');
    this.ssn = page.locator('input[name="customer.ssn"]');
    this.username = page.locator('input[name="customer.username"]');
    this.password = page.locator('input[name="customer.password"]');
    this.confirmPassword = page.locator('input[name="repeatedPassword"]');
    this.registerButton = page.locator('input[value="Register"]');
    this.registrationSuccessMessage =page.getByText('Your account was created');
    
  }
async registerUser(user: any): Promise<void> {
await this.fill(this.firstName, user.firstName);
await this.fill(this.lastName, user.lastName);
await this.fill(this.address, user.address);
await this.fill(this.city, user.city);
await this.fill(this.state, user.state);
await this.fill(this.zipCode, user.zipCode);
await this.fill(this.phone, user.phone);
await this.fill(this.ssn, user.ssn);
await this.fill(this.username, user.username);
await this.fill(this.password, user.password);
await this.fill(this.confirmPassword, user.password);
await this.click(this.registerButton);
}
async navigateToRegistration(): Promise<void> {
await this.click(this.registrationLink);
}
async verifyRegistrationSuccessful(): Promise<void> {

    await expect(
        this.registrationSuccessMessage
    ).toBeVisible();

}

}