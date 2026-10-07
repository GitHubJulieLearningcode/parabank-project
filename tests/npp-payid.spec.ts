import { test, expect } from '@playwright/test';

test('TC_NPD_01 - Settled Payment', async ({ request }) => {
  const response = await request.post(
    'http://localhost:3001/payment/settled'
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.status).toBe('SETTLED');
  expect(body.message).toBe('Transfer Complete');
});

test('TC_NPD_02 - Failed Payment', async ({ request }) => {
  const response = await request.post(
    'http://localhost:3001/payment/failed'
  );

  expect(response.status()).toBe(400);

  const body = await response.json();

  expect(body.status).toBe('FAILED');
  expect(body.message).toBe('Insufficient Funds');
});

test('TC_NPD_03 - Timeout Payment', async ({ request }) => {
  const response = await request.post(
    'http://localhost:3001/payment/timeout'
  );

  expect(response.status()).toBe(504);

  const body = await response.json();

  expect(body.status).toBe('TIMEOUT');
  expect(body.message).toBe('Request Timed Out');
});
