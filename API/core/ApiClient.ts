import { APIRequestContext } from '@playwright/test';

export class ApiClient {
  protected baseUrl =
    'https://parabank.parasoft.com/parabank/services/bank';

  constructor(
    protected request: APIRequestContext
  ) {}
}