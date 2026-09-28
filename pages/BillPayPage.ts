import { Page, Locator, expect } from '@playwright/test';

export class BillPayPage {

    readonly page: Page;

    readonly payeeName: Locator;
    readonly address: Locator;
    readonly city: Locator;
    readonly state: Locator;
    readonly zipCode: Locator;
    readonly phone: Locator;
    readonly accountNumber: Locator;
    readonly verifyAccount: Locator;
    readonly amount: Locator;
    readonly sendPaymentBtn: Locator;

    readonly payeeNameError: Locator;
    readonly verifyAccountError: Locator;
    readonly amountError: Locator;

    constructor(page: Page) {

        this.page = page;

        this.payeeName = page.locator('[name="payee.name"]');
        this.address = page.locator('[name="payee.address.street"]');
        this.city = page.locator('[name="payee.address.city"]');
        this.state = page.locator('[name="payee.address.state"]');
        this.zipCode = page.locator('[name="payee.address.zipCode"]');
        this.phone = page.locator('[name="payee.phoneNumber"]');
        this.accountNumber = page.locator('[name="payee.accountNumber"]');
        this.verifyAccount = page.locator('[name="verifyAccount"]');
        this.amount = page.locator('[name="amount"]');

        this.sendPaymentBtn = page.locator(
            'input[value="Send Payment"]'
        );

        this.payeeNameError = page.locator('#validationModel-name');
        this.verifyAccountError = page.getByText('The account numbers do not match.');
        this.amountError = page.getByText('The amount cannot be empty.');
    }

    async open() {
        await this.page.goto(
            'https://parabank.parasoft.com/parabank/billpay.htm'
        );
    }

    async fillBill(
        payee: string,
        accNo: string,
        amt: string
    ) {

        await this.payeeName.fill(payee);
        await this.address.fill('Street 1');
        await this.city.fill('Bangalore');
        await this.state.fill('KA');
        await this.zipCode.fill('560001');
        await this.phone.fill('9999999999');

        await this.accountNumber.fill(accNo);
        await this.verifyAccount.fill(accNo);

        if (amt !== '') {
            await this.amount.fill(amt);
        }
    }

    async fillAccountMismatch() {

        await this.payeeName.fill('Internet');
        await this.address.fill('Street');
        await this.city.fill('Bangalore');
        await this.state.fill('KA');
        await this.zipCode.fill('560001');
        await this.phone.fill('9999999999');

        await this.accountNumber.fill('11111');
        await this.verifyAccount.fill('22222');

        await this.amount.fill('20');
    }

    async submit() {
        await this.sendPaymentBtn.click();
    }

    async verifySuccess() {
        await expect(
            this.page.getByRole('heading', {
                name: 'Bill Payment Complete'
            })
        ).toBeVisible();
    }

    async verifyPayeeNameMandatory() {
        await expect(this.payeeNameError).toBeVisible();
    }

    async verifyAccountMismatchError() {
        await expect(this.verifyAccountError).toBeVisible();
    }

    async verifyAmountMandatory() {
        await expect(this.amountError).toBeVisible();
    }
    async payBill(
    payee: string,
    accountNo: string,
    amount: string
) {
    await this.fillBill(
        payee,
        accountNo,
        amount
    );

    await this.submit();
}
async fillAmountZero() {
    await this.fillBill(
        'Electricity Board',
        '90003',
        '0'
    );
}

async fillNegativeAmount() {
    await this.fillBill(
        'Electricity Board',
        '90004',
        '-10'
    );
}

async fillLargeAmount() {
    await this.fillBill(
        'Electricity Board',
        '90005',
        '99999999'
    );
}

async verifyAmountValue(expectedAmount: string) {
    await expect(this.amount).toHaveValue(expectedAmount);
}

async paySameBillerTwice() {

    await this.fillBill(
        'Mobile Recharge',
        '55555',
        '5'
    );

    await this.submit();
    await this.verifySuccess();

    await this.open();

    await this.fillBill(
        'Mobile Recharge',
        '55555',
        '5'
    );

    await this.submit();
    await this.verifySuccess();
}

async payMultipleBills() {

    const billers = [
        {
            payee: 'Electricity',
            account: '10001',
            amount: '10'
        },
        {
            payee: 'Internet',
            account: '10002',
            amount: '15'
        },
        {
            payee: 'Water',
            account: '10003',
            amount: '20'
        }
    ];

    for (const biller of billers) {

        await this.open();

        await this.fillBill(
            biller.payee,
            biller.account,
            biller.amount
        );

        await this.submit();

        await this.verifySuccess();
    }
}
}