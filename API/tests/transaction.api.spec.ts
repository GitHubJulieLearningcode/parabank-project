import { test, expect } from '@playwright/test';
import { TransactionService } from '../services/transaction.service';

import { ApiTestData } from '../testData/apiData';
const ACCOUNT_ID =
ApiTestData.account.validAccountId;

test.describe('Transaction APIs', () => {

  let transactionService: TransactionService;

  test.beforeEach(async ({ request }) => {
    transactionService =
      new TransactionService(request);
  });

  test('TC_API_023 - Get Account Transactions', async () => {

    const response =
      await transactionService.getAccountTransactions(
        ACCOUNT_ID
      );

    expect(response.status()).toBe(200);

    const responseBody =
      await response.text();

    console.log(responseBody);

    expect(responseBody)
      .toContain('<transactions');
  });

  test('TC_API_024 - Verify Transaction Exists', async () => {

    const response =
      await transactionService.getAccountTransactions(
        ACCOUNT_ID
      );

    const responseBody =
      await response.text();

    expect(responseBody)
      .toContain('<transaction>');
  });

  test('TC_API_025 - Verify Transaction Amount Present', async () => {

    const response =
      await transactionService.getAccountTransactions(
        ACCOUNT_ID
      );

    const responseBody =
      await response.text();

    expect(responseBody)
      .toContain('<amount>');
  });

  test('TC_API_026 - Verify Transaction Type Present', async () => {

    const response =
      await transactionService.getAccountTransactions(
        ACCOUNT_ID
      );

    const responseBody =
      await response.text();

    expect(responseBody)
      .toContain('<type>');
  });

  test('TC_API_027 - Verify Transaction Response Time', async () => {

    const startTime = Date.now();

    const response =
      await transactionService.getAccountTransactions(
        ACCOUNT_ID
      );

    const responseTime =
      Date.now() - startTime;

    console.log(
      `Response Time: ${responseTime} ms`
    );

    expect(response.status()).toBe(200);

    expect(responseTime)
      .toBeLessThan(3000);
  });

  test('TC_API_028 - Invalid Transaction ID', async () => {

    const response =
      await transactionService.getInvalidTransaction();

    expect(response.status())
      .not.toBe(200);
  });

  test('TC_API_029 - Non Numeric Transaction ID', async () => {

    const response =
      await transactionService.getNonNumericTransaction();

    expect(response.ok())
      .toBeFalsy();
  });

});