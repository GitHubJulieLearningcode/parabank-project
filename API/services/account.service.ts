import { ApiClient } from '../core/ApiClient';

export class AccountService extends ApiClient {

  async getAccount(accountId: number | string) {
    return await this.request.get(
      `${this.baseUrl}/accounts/${accountId}`
    );
  }

  async getInvalidAccount() {
    return await this.request.get(
      `${this.baseUrl}/accounts/999999999`
    );
  }

  async getNonNumericAccount() {
    return await this.request.get(
      `${this.baseUrl}/accounts/ABC`
    );
  }

  async getNegativeAccount() {
    return await this.request.get(
      `${this.baseUrl}/accounts/-1`
    );
  }

  async getEmptyAccount() {
    return await this.request.get(
      `${this.baseUrl}/accounts/`
    );
  }
}