# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/login.spec.ts >> Login Module >> TC-LGN-008 - Login - Duplicate Request/Data @regression
- Location: tests/login.spec.ts:113:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'Accounts Overview' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByRole('heading', { name: 'Accounts Overview' }) with timeout 5000ms
  - waiting for getByRole('heading', { name: 'Accounts Overview' })

```

```yaml
- link:
  - /url: admin.htm
  - img
- link "ParaBank":
  - /url: index.htm
  - img "ParaBank"
- paragraph: Experience the difference
- list:
  - listitem: Solutions
  - listitem:
    - link "About Us":
      - /url: about.htm
  - listitem:
    - link "Services":
      - /url: services.htm
  - listitem:
    - link "Products":
      - /url: http://www.parasoft.com/jsp/products.jsp
  - listitem:
    - link "Locations":
      - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
  - listitem:
    - link "Admin Page":
      - /url: admin.htm
- list:
  - listitem:
    - link "home":
      - /url: index.htm
  - listitem:
    - link "about":
      - /url: about.htm
  - listitem:
    - link "contact":
      - /url: contact.htm
- paragraph: Welcome Julie TV
- heading "Account Services" [level=2]
- list:
  - listitem:
    - link "Open New Account":
      - /url: openaccount.htm
  - listitem:
    - link "Accounts Overview":
      - /url: overview.htm
  - listitem:
    - link "Transfer Funds":
      - /url: transfer.htm
  - listitem:
    - link "Bill Pay":
      - /url: billpay.htm
  - listitem:
    - link "Find Transactions":
      - /url: findtrans.htm
  - listitem:
    - link "Update Contact Info":
      - /url: updateprofile.htm
  - listitem:
    - link "Request Loan":
      - /url: requestloan.htm
  - listitem:
    - link "Log Out":
      - /url: logout.htm
- heading "Bill Payment Service" [level=1]
- paragraph: Enter payee information
- table:
  - rowgroup:
    - row "Payee Name:":
      - cell "Payee Name:"
      - cell:
        - textbox
      - cell
    - row "Address:":
      - cell "Address:"
      - cell:
        - textbox
      - cell
    - row "City:":
      - cell "City:"
      - cell:
        - textbox
      - cell
    - row "State:":
      - cell "State:"
      - cell:
        - textbox
      - cell
    - row "Zip Code:":
      - cell "Zip Code:"
      - cell:
        - textbox
      - cell
    - 'row "Phone #:"':
      - 'cell "Phone #:"'
      - cell:
        - textbox
      - cell
    - row:
      - cell
    - 'row "Account #:"':
      - 'cell "Account #:"'
      - cell:
        - textbox
      - cell
    - 'row "Verify Account #:"':
      - 'cell "Verify Account #:"'
      - cell:
        - textbox
      - cell
    - row:
      - cell
    - 'row "Amount: $"':
      - 'cell "Amount: $"'
      - cell:
        - textbox
      - cell
    - row:
      - cell
    - 'row "From account #: 93375"':
      - 'cell "From account #:"'
      - cell "93375":
        - combobox:
          - option "93375" [selected]
    - row "Send Payment":
      - cell
      - cell "Send Payment":
        - button "Send Payment"
- list:
  - listitem:
    - link "Home":
      - /url: index.htm
    - text: "|"
  - listitem:
    - link "About Us":
      - /url: about.htm
    - text: "|"
  - listitem:
    - link "Services":
      - /url: services.htm
    - text: "|"
  - listitem:
    - link "Products":
      - /url: http://www.parasoft.com/jsp/products.jsp
    - text: "|"
  - listitem:
    - link "Locations":
      - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
    - text: "|"
  - listitem:
    - link "Site Map":
      - /url: sitemap.htm
    - text: "|"
  - listitem:
    - link "Contact Us":
      - /url: contact.htm
- paragraph: © Parasoft. All rights reserved.
- list:
  - listitem: "Visit us at:"
  - listitem:
    - link "www.parasoft.com":
      - /url: http://www.parasoft.com/
```

# Test source

```ts
  1  | import { Page, Locator, expect } from '@playwright/test';
  2  | import { BasePage } from './BasePage'
  3  | export class AccountsOverviewPage extends BasePage
  4  | {
  5  |     private readonly accountOverviewHeader: Locator;
  6  |     private readonly logoutLink:Locator;
  7  |    private readonly accountsOverviewMenu: Locator;
  8  |     private readonly accountRows: Locator;
  9  |     constructor(page:Page)
  10 | {
  11 |     super(page);
  12 |     this.accountOverviewHeader=page.getByRole('heading', { name: 'Accounts Overview' });
  13 |     this.logoutLink =page.getByRole('link', { name: 'Log Out' });
  14 |     this.page = page;  
  15 |     this.accountsOverviewMenu =page.locator('a[href*="overview"]');
  16 |     this.accountRows =page.locator('#accountTable tbody tr');
  17 | 
  18 | }
  19 | async verifyAccountsOverviewLoaded(): Promise<void> {
> 20 | await expect(this.accountOverviewHeader).toBeVisible();
     |                                          ^ Error: expect(locator).toBeVisible() failed
  21 | }
  22 | async logout(): Promise<void> {
  23 | await this.click(this.logoutLink);
  24 | 
  25 | }
  26 | async verifyAccountsOverviewVisible(): Promise<void> {
  27 |   await expect(
  28 |     this.page.getByRole('heading', { name: 'Accounts Overview' })
  29 |   ).toBeVisible();
  30 | }
  31 | async navigateToAccountsOverview() {
  32 | await this.accountsOverviewMenu.click();
  33 | }
  34 | async verifyAccountPresent(accountId: string) {
  35 | await expect(
  36 | this.page.getByRole('link', { name: accountId })
  37 | ).toBeVisible();
  38 | }
  39 | async getAccountBalance(accountId: string) {
  40 | const row = this.page
  41 | .locator('#accountTable tbody tr')
  42 | .filter({ has: this.page.getByText(accountId) });
  43 | const balance =
  44 | await row.locator('td').nth(1).textContent();
  45 | return parseFloat(
  46 | balance?.replace('$', '').replace(',', '') || '0'
  47 | );
  48 | }
  49 | async getAllBalances(): Promise<number[]> {
  50 | const rows = await this.accountRows.all();
  51 | const balances = [];
  52 | for (const row of rows) {
  53 | const balanceText =
  54 | await row.locator('td').nth(1).textContent();
  55 | balances.push(
  56 | parseFloat(
  57 | balanceText?.replace('$', '').replace(',', '') || '0'
  58 | )
  59 | );
  60 | }
  61 | return balances;
  62 | }
  63 | async getTotalBalance() {
  64 | const balances = await this.getAllBalances();
  65 | return balances.reduce((sum, value) => sum + value, 0);
  66 | }
  67 | async getFirstAccountId(): Promise<string> {
  68 | const accountId = await this.page
  69 | .locator('#accountTable tbody tr')
  70 | .first()
  71 | .locator('td')
  72 | .first()
  73 | .textContent();
  74 | return accountId?.trim() || '';
  75 | 
  76 | }
  77 | 
  78 | 
  79 | }
  80 | 
  81 | 
```