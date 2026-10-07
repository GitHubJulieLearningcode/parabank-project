import { test } from '@playwright/test';
import { BillPayPage } from '../pages/BillPayPage';
import { helper } from '../utils/helper';

test.describe('Bill Payment Tests', () => {

  test.beforeEach(async ({ page }) => {
    //await helper.loginExistingUser(page);
     await helper.createAndLoginUser(page);
  });

  test('TC-BPY-001 - Pay bill with valid details', async ({ page }) => {

    const billPay = new BillPayPage(page);

    await billPay.open();

    await billPay.fillBill(
      'Electricity Board',
      '90001',
      '25'
    );

    await billPay.submit();

    await billPay.verifySuccess();
  });

  test('TC-BPY-002 - Verify Payee Name is mandatory', async ({ page }) => {

    const billPay = new BillPayPage(page);

    await billPay.open();

    await billPay.fillBill(
      '',
      '12345',
      '10'
    );

    await billPay.submit();

    await billPay.verifyPayeeNameMandatory();
  });

  test('TC-BPY-003 - Verify Account Number mismatch validation', async ({ page }) => {

    const billPay = new BillPayPage(page);

    await billPay.open();

    await billPay.fillAccountMismatch();

    await billPay.submit();

    await billPay.verifyAccountMismatchError();
  });

  test('TC-BPY-004 - Verify amount cannot be blank', async ({ page }) => {

    const billPay = new BillPayPage(page);

    await billPay.open();

    await billPay.fillBill(
      'Water Bill',
      '12345',
      ''
    );

    await billPay.submit();

    await billPay.verifyAmountMandatory();
  });

  test('TC-BPY-005 - Pay same biller twice in one session', async ({ page }) => {

    const billPay = new BillPayPage(page);

    await billPay.open();

    await billPay.fillBill(
      'Mobile Recharge',
      '55555',
      '5'
    );

    await billPay.submit();

    await billPay.verifySuccess();

    await billPay.open();

    await billPay.fillBill(
      'Mobile Recharge',
      '55555',
      '5'
    );

    await billPay.submit();

    await billPay.verifySuccess();
  });
  test('TC-BPY-006 - Verify bill payment with minimum amount 0.01', async ({ page }) => {

  const billPay = new BillPayPage(page);

  await billPay.open();

  await billPay.payBill(
    'Electricity Board',
    '90002',
    '0.01'
  );

  await billPay.verifySuccess();
});
test('TC-BPY-007 - Verify bill payment with amount 0', async ({ page }) => {

    const billPay = new BillPayPage(page);

    await billPay.open();

    await billPay.fillAmountZero();

    await billPay.submit();

    await billPay.verifyAmountValue('0');
});

test('TC-BPY-008 - Verify bill payment with negative amount', async ({ page }) => {

    const billPay = new BillPayPage(page);

    await billPay.open();

    await billPay.fillNegativeAmount();

    await billPay.submit();

    await billPay.verifyAmountValue('-10');
});

test('TC-BPY-009 - Verify bill payment with very large amount', async ({ page }) => {

    const billPay = new BillPayPage(page);

    await billPay.open();

    await billPay.fillLargeAmount();

    await billPay.submit();

    await billPay.verifyAmountValue('99999999');
});

test('TC-BPY-010 - Pay same biller twice in one session', async ({ page }) => {

    const billPay = new BillPayPage(page);

    await billPay.open();

    await billPay.paySameBillerTwice();
});

test('TC-BPY-011 - Pay multiple billers in one session', async ({ page }) => {

    const billPay = new BillPayPage(page);

    await billPay.payMultipleBills();
});
  

});