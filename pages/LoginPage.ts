import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage
{
readonly username: Locator;
readonly password: Locator;
readonly loginButton: Locator;
readonly errorMessage: Locator;
constructor(page:Page)
{
    super(page);
    this.username=page.locator('input[name="username"]');
    this.password=page.locator('input[name="password"]');
    this.loginButton=page.getByRole('button', { name: 'Log In' });
    this.errorMessage=page.getByRole('heading', { name: 'Error!' });

}

    async login(userName: string, pwd: string): Promise<void> {

        await this.fill(this.username, userName);
        await this.fill(this.password, pwd);
        await this.click(this.loginButton);
    }

    async verifyLoginFailed(): Promise<void> {

        await expect(this.errorMessage).toBeVisible();
    }

    async verifyLoginPageLoaded(): Promise<void> {

        await this.verifyVisible(this.username);
        await this.verifyVisible(this.password);
        await this.verifyVisible(this.loginButton);
    }


}




