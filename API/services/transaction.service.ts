import { ApiClient } from '../core/ApiClient';

export class TransactionService extends ApiClient {

  async getAccountTransactions(
    accountId: number | string
  ) {
    return await this.request.get(
      `${this.baseUrl}/accounts/${accountId}/transactions`
    );
  }

  async getTransaction(
    transactionId: number | string
  ) {
    return await this.request.get(
      `${this.baseUrl}/transactions/${transactionId}`
    );
  }

  async getInvalidTransaction() {
    return await this.request.get(
      `${this.baseUrl}/transactions/999999999`
    );
  }

  async getNonNumericTransaction() {
    return await this.request.get(
      `${this.baseUrl}/transactions/ABC`
    );
  }
}