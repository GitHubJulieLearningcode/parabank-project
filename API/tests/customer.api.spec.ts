import { test, expect } from '@playwright/test';
import { CustomerService } from '../services/customer.service';
import { ApiTestData } from '../testData/apiData';

const CUSTOMER_ID =
  ApiTestData.customer.validCustomerId;

test.describe('Customer APIs', () => {

  let customerService: CustomerService;

  test.beforeEach(async ({ request }) => {
    customerService = new CustomerService(request);
  });

  test('TC_API_013 - Get Customer Details', async () => {

    const response =
      await customerService.getCustomer(CUSTOMER_ID);

    expect(response.status()).toBe(200);

    const responseBody = await response.text();

    console.log(responseBody);

    expect(responseBody)
      .toContain(`<id>${CUSTOMER_ID}</id>`);
  });

  test('TC_API_014 - Verify Customer ID Matches Request', async () => {

    const response =
      await customerService.getCustomer(CUSTOMER_ID);

    const responseBody = await response.text();

    expect(responseBody)
      .toContain(`<id>${CUSTOMER_ID}</id>`);
  });

  test('TC_API_015 - Verify First Name Exists', async () => {

    const response =
      await customerService.getCustomer(CUSTOMER_ID);

    const responseBody = await response.text();

    expect(responseBody)
      .toContain('<firstName>');
  });

  test('TC_API_016 - Verify Last Name Exists', async () => {

    const response =
      await customerService.getCustomer(CUSTOMER_ID);

    const responseBody = await response.text();

    expect(responseBody)
      .toContain('<lastName>');
  });

  test('TC_API_017 - Verify Customer Has Address Information', async () => {

    const response =
      await customerService.getCustomer(CUSTOMER_ID);

    const responseBody = await response.text();

    expect(responseBody)
      .toContain('<address>');
  });

  test('TC_API_018 - Verify Customer XML Structure', async () => {

    const response =
      await customerService.getCustomer(CUSTOMER_ID);

    const responseBody = await response.text();

    expect(responseBody)
      .toContain('<customer');

    expect(responseBody)
      .toContain('<id>');

    expect(responseBody)
      .toContain('<firstName>');

    expect(responseBody)
      .toContain('<lastName>');
  });

  test('TC_API_019 - Verify Customer Response Time', async () => {

    const startTime = Date.now();

    const response =
      await customerService.getCustomer(CUSTOMER_ID);

    const responseTime =
      Date.now() - startTime;

    console.log(
      `Response Time: ${responseTime} ms`
    );

    expect(response.status()).toBe(200);

    expect(responseTime)
      .toBeLessThan(3000);
  });

  test('TC_API_020 - Invalid Customer ID', async () => {

    const response =
      await customerService.getInvalidCustomer();

    expect(response.status())
      .not.toBe(200);
  });

  test('TC_API_021 - Non Numeric Customer ID', async () => {

    const response =
      await customerService.getNonNumericCustomer();

    expect(response.ok())
      .toBeFalsy();
  });

  test('TC_API_022 - Empty Customer ID', async () => {

    const response =
      await customerService.getEmptyCustomer();

    expect(response.status())
      .not.toBe(200);
  });

});
