import { test, expect } from '@playwright/test';
import { AccountService } from '../services/account.service';
import { ApiTestData } from '../testData/apiData';

const ACCOUNT_ID =
  ApiTestData.account.validAccountId;

test.describe('Account APIs', () => {

  let accountService: AccountService;

  test.beforeEach(async ({ request }) => {
    accountService = new AccountService(request);
  });

  test('TC_API_001 - Get Account Details', async () => {

    const response =
      await accountService.getAccount(ACCOUNT_ID);

    expect(response.status()).toBe(200);

    const responseBody = await response.text();

    expect(responseBody)
      .toContain(`<id>${ACCOUNT_ID}</id>`);
  });

  test('TC_API_002 - Verify Account ID Matches Request', async () => {

    const response =
      await accountService.getAccount(ACCOUNT_ID);

    const responseBody = await response.text();

    expect(responseBody)
      .toContain(`<id>${ACCOUNT_ID}</id>`);
  });

  test('TC_API_003 - Verify Balance Exists', async () => {

    const response =
      await accountService.getAccount(ACCOUNT_ID);

    const responseBody = await response.text();

    expect(responseBody)
      .toContain('<balance>');
  });

  test('TC_API_004 - Verify Account Type Exists', async () => {

    const response =
      await accountService.getAccount(ACCOUNT_ID);

    const responseBody = await response.text();

    expect(responseBody)
      .toContain('<type>');
  });

  test('TC_API_005 - Verify Content Type', async () => {

    const response =
      await accountService.getAccount(ACCOUNT_ID);

    expect(
      response.headers()['content-type']
    ).toContain('application/xml');
  });

  test('TC_API_006 - Verify Response Time', async () => {

    const start = Date.now();

    const response =
      await accountService.getAccount(ACCOUNT_ID);

    const responseTime =
      Date.now() - start;

    expect(response.status()).toBe(200);

    expect(responseTime)
      .toBeLessThan(3000);
  });

  test('TC_API_007 - Verify Required Fields Present', async () => {

    const response =
      await accountService.getAccount(ACCOUNT_ID);

    const responseBody = await response.text();

    expect(responseBody).toContain('<id>');
    expect(responseBody).toContain('<type>');
    expect(responseBody).toContain('<balance>');
  });

  test('TC_API_008 - Invalid Account ID', async () => {

    const response =
      await accountService.getInvalidAccount();

    expect(response.status()).not.toBe(200);
  });

  test('TC_API_009 - Non Numeric Account ID', async () => {

    const response =
      await accountService.getNonNumericAccount();

    expect(response.ok()).toBeFalsy();
  });

  test('TC_API_010 - Negative Account ID', async () => {

    const response =
      await accountService.getNegativeAccount();

    expect(response.ok()).toBeFalsy();
  });

  test('TC_API_011 - Empty Account ID', async () => {

    const response =
      await accountService.getEmptyAccount();

    expect(response.status()).not.toBe(200);
  });

  test('TC_API_012 - Verify XML Schema Structure', async () => {

    const response =
      await accountService.getAccount(ACCOUNT_ID);

    const responseBody = await response.text();

    expect(responseBody).toContain('<account');
    expect(responseBody).toContain('<id>');
    expect(responseBody).toContain('<type>');
    expect(responseBody).toContain('<balance>');
  });

});