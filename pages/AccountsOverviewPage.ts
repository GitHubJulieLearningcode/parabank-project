import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage'
export class AccountsOverviewPage extends BasePage
{
    private readonly accountOverviewHeader: Locator;
    private readonly logoutLink:Locator;
    constructor(page:Page)
{
    super(page);
    this.accountOverviewHeader=page.getByRole('heading', { name: 'Accounts Overview' });
    this.logoutLink =page.getByRole('link', { name: 'Log Out' });

}
async verifyAccountsOverviewLoaded(): Promise<void> {
await expect(this.accountOverviewHeader).toBeVisible();
}
async logout(): Promise<void> {
await this.click(this.logoutLink);

}

}

