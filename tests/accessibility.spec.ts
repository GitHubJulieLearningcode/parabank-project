import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { helper } from '../utils/helper';
import { TransferFundsPage } from '../pages/TransferFundsPage';

async function logViolations(results: any) {

  console.log(
    `\nAccessibility Violations Found: ${results.violations.length}\n`
  );

  for (const violation of results.violations) {

    console.log(`Rule: ${violation.id}`);

    console.log(
      `Impact: ${violation.impact}`
    );

    console.log(
      `Description: ${violation.description}`
    );

    console.log(
      `Affected Elements: ${violation.nodes.length}`
    );

    console.log(
      '-----------------------------------'
    );
  }
}

test.describe('Accessibility Tests', () => {

  test(
    'TC_A11Y_01 - Login Page Accessibility',
    async ({ page }) => {

      await page.goto('/');

      const results =
        await new AxeBuilder({
          page
        }).analyze();

      await logViolations(results);

      expect(results.violations)
        .toBeDefined();
    }
  );

  test(
    'TC_A11Y_02 - Accounts Overview Accessibility',
    async ({ page }) => {

      await helper.createAndLoginUser(page);

      const results =
        await new AxeBuilder({
          page
        }).analyze();

      await logViolations(results);

      expect(results.violations)
        .toBeDefined();
    }
  );

  test(
    'TC_A11Y_03 - Transfer Funds Accessibility',
    async ({ page }) => {

      await helper.createAndLoginUser(page);

      const transferPage =
        new TransferFundsPage(page);

      await transferPage
        .navigateToTransferFunds();

      const results =
        await new AxeBuilder({
          page
        }).analyze();

      await logViolations(results);

      expect(results.violations)
        .toBeDefined();
    }
  );

});
