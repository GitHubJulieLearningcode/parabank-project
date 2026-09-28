import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage'
export class AccountsOverviewPage extends BasePage
{
    private readonly accountOverviewHeader: Locator;
    private readonly logoutLink:Locator;
   private readonly accountsOverviewMenu: Locator;
    private readonly accountRows: Locator;
    constructor(page:Page)
{
    super(page);
    this.accountOverviewHeader=page.getByRole('heading', { name: 'Accounts Overview' });
    this.logoutLink =page.getByRole('link', { name: 'Log Out' });
    this.page = page;  
    this.accountsOverviewMenu =page.locator('a[href*="overview"]');
    this.accountRows =page.locator('#accountTable tbody tr');

}
async verifyAccountsOverviewLoaded(): Promise<void> {
await expect(this.accountOverviewHeader).toBeVisible();
}
async logout(): Promise<void> {
await this.click(this.logoutLink);

}
async verifyAccountsOverviewVisible(): Promise<void> {
  await expect(
    this.page.getByRole('heading', { name: 'Accounts Overview' })
  ).toBeVisible();
}
async navigateToAccountsOverview() {
await this.accountsOverviewMenu.click();
}
async verifyAccountPresent(accountId: string) {
await expect(
this.page.getByRole('link', { name: accountId })
).toBeVisible();
}
async getAccountBalance(accountId: string) {
const row = this.page
.locator('#accountTable tbody tr')
.filter({ has: this.page.getByText(accountId) });
const balance =
await row.locator('td').nth(1).textContent();
return parseFloat(
balance?.replace('$', '').replace(',', '') || '0'
);
}
async getAllBalances(): Promise<number[]> {
const rows = await this.accountRows.all();
const balances = [];
for (const row of rows) {
const balanceText =
await row.locator('td').nth(1).textContent();
balances.push(
parseFloat(
balanceText?.replace('$', '').replace(',', '') || '0'
)
);
}
return balances;
}
async getTotalBalance() {
const balances = await this.getAllBalances();
return balances.reduce((sum, value) => sum + value, 0);
}
async getFirstAccountId(): Promise<string> {
const accountId = await this.page
.locator('#accountTable tbody tr')
.first()
.locator('td')
.first()
.textContent();
return accountId?.trim() || '';

}


}

