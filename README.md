# ParaBank Playwright Automation Framework

## Overview

This project contains Playwright automation for the ParaBank application using TypeScript and Page Object Model (POM).

## Coverage

### UI Automation
Registration, Login, Accounts Overview, Open New Account, Transfer Funds, Bill Pay, Request Loan, Find Transactions

### API Automation
Account APIs, Customer APIs, Transaction APIs

### Additional Coverage
Mobile Testing, Accessibility Testing (Axe), Mock Server Testing, End-to-End Workflows

## Framework Features

- Page Object Model (POM)
- Reusable Helper Functions
- Shared Utilities
- Data-Driven Approach
- HTML Reporting
- Allure Reporting
- Cross Browser Execution

## Setup

### Install Dependencies

```bash
npm install
```

### Install Browsers

```bash
npx playwright install
```

## Execute Tests

### Run Full Suite

```bash
npx playwright test
```

### Run Chromium Only

```bash
npx playwright test --project=chromium
```

### Run with One Worker

```bash
npx playwright test --workers=1
```

## Reports

### Playwright Report

```bash
npx playwright show-report
```

### Allure Report

```bash
allure serve allure-results
```

## Mock Server

Start mock server:

```bash
node mock-server.js
```

## Repository Structure

```text
pages/      - Page Objects
tests/      - UI Test Cases
API/        - API Test Cases
utils/      - Common Utilities
testData/   - Test Data
reports/    - Execution Reports
```

## Known Limitations

- ParaBank demo environment can be unstable.
- Parallel execution may introduce intermittent failures.
- Some transaction data is environment dependent.

## Author

Julie 