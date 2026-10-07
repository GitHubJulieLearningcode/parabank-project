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
  test('TC_API_030 - Verify Response Is Not Empty', async () => {

  const response =
    await transactionService.getAccountTransactions(
      ACCOUNT_ID
    );

  const responseBody =
    await response.text();

  expect(responseBody.length)
    .toBeGreaterThan(0);
});
test('TC_API_031 - Verify Transaction ID Present', async () => {

  const response =
    await transactionService.getAccountTransactions(
      ACCOUNT_ID
    );

  const responseBody =
    await response.text();

  expect(responseBody)
    .toContain('<id>');
});
test('TC_API_032 - Verify Transaction Date Present', async () => {

  const response =
    await transactionService.getAccountTransactions(
      ACCOUNT_ID
    );

  const responseBody =
    await response.text();

  expect(responseBody)
    .toContain('<date>');
});
test('TC_API_033 - Verify Description Present', async () => {

  const response =
    await transactionService.getAccountTransactions(
      ACCOUNT_ID
    );

  const responseBody =
    await response.text();

  expect(responseBody)
    .toContain('<description>');
});
test('TC_API_034 - Verify Content Type Header', async () => {

  const response =
    await transactionService.getAccountTransactions(
      ACCOUNT_ID
    );

  expect(
    response.headers()['content-type']
  ).toContain('xml');
});
test('TC_API_035 - Verify Transactions Root Tag Exists', async () => {

  const response =
    await transactionService.getAccountTransactions(
      ACCOUNT_ID
    );

  const responseBody =
    await response.text();

  expect(responseBody)
    .toContain('<transactions');
});
test('TC_API_036 - Verify Transaction Count Greater Than Zero', async () => {

  const response =
    await transactionService.getAccountTransactions(
      ACCOUNT_ID
    );

  const responseBody =
    await response.text();

  const count =
    (responseBody.match(/<transaction>/g) || []).length;

  expect(count)
    .toBeGreaterThan(0);
});
test('TC_API_037 - Verify Valid Account Returns Success', async () => {

  const response =
    await transactionService.getAccountTransactions(
      ACCOUNT_ID
    );

  expect(response.ok())
    .toBeTruthy();
});
test('TC_API_038 - Verify Status Code Is 200', async () => {

  const response =
    await transactionService.getAccountTransactions(
      ACCOUNT_ID
    );

  expect(response.status())
    .toBe(200);
});
test('TC_API_039 - Verify Response Header Exists', async () => {

  const response =
    await transactionService.getAccountTransactions(
      ACCOUNT_ID
    );

  expect(response.headers())
    .toBeTruthy();
});
test('TC_API_040 - Verify Response Contains Account ID', async () => {

  const response =
    await transactionService.getAccountTransactions(
      ACCOUNT_ID
    );

  const body =
    await response.text();

  expect(body)
    .toContain(ACCOUNT_ID.toString());
});
test('TC_API_041 - Verify Transaction Tag Count', async () => {

  const response =
    await transactionService.getAccountTransactions(
      ACCOUNT_ID
    );

  const body =
    await response.text();

  const count =
    (body.match(/<transaction>/g) || []).length;

  expect(count)
    .toBeGreaterThan(0);
});
test('TC_API_042 - Verify Balance Information Exists', async () => {

  const response =
    await transactionService.getAccountTransactions(
      ACCOUNT_ID
    );

  const body =
    await response.text();

  expect(body)
    .toContain('<amount>');
});
test('TC_API_043 - Verify Empty Account ID Returns Error', async ({ request }) => {

  const response = await request.get(
    '/services/bank/accounts//transactions'
  );

  expect(response.status())
    .not.toBe(200);
});

});