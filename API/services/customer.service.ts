import { ApiClient } from '../core/ApiClient';

export class CustomerService extends ApiClient {

  async getCustomer(customerId: number | string) {
    return await this.request.get(
      `${this.baseUrl}/customers/${customerId}`
    );
  }

  async getInvalidCustomer() {
    return await this.request.get(
      `${this.baseUrl}/customers/999999999`
    );
  }

  async getNonNumericCustomer() {
    return await this.request.get(
      `${this.baseUrl}/customers/ABC`
    );
  }

  async getEmptyCustomer() {
    return await this.request.get(
      `${this.baseUrl}/customers/`
    );
  }
}