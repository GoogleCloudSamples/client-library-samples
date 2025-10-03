// Copyright 2025 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const process = require('process');

// [START billingbudgets_v1beta1_budgetservice_budget_create_async]
const {BudgetServiceClient} = require('@google-cloud/billing-budgets').v1beta1;
const {status} = require('@grpc/grpc-js');

const client = new BudgetServiceClient();

/**
 * Creates a new budget for a given billing account and project.
 *
 * A budget defines a plan for your Cloud Billing account, including a target
 * spend amount and rules for notifications when spend approaches or exceeds
 * that amount.
 *
 * @param {string} billingAccountId The ID of the billing account (e.g., '012345-678901-ABCDEF').
 */
async function createBudget(billingAccountId) {
  const parent = `billingAccounts/${billingAccountId}`;

  const request = {
    parent: parent,
    budget: {
      displayName: 'My Billing Budget',
      amount: {
        specifiedAmount: {
          currencyCode: 'USD',
          units: 55, // Example: 55.00 USD
        },
      },
      thresholdRules: [
        {
          thresholdPercent: 0.5, // 50% of budget
          spendBasis: 'CURRENT_SPEND',
        },
        {
          thresholdPercent: 0.9, // 90% of budget
          spendBasis: 'CURRENT_SPEND',
        },
      ],
    },
  };

  try {
    const [budget] = await client.createBudget(request);
    console.log(`Successfully created budget: ${budget.name}`);
    console.log(`  Display Name: ${budget.displayName}`);
    console.log(
      `  Amount: ${budget.amount.specifiedAmount.units} ${budget.amount.specifiedAmount.currencyCode}`,
    );
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.error(
        `Permission denied. Ensure the service account has the 'Budget User' (roles/billing.budgetUser) role on billing account ${billingAccountId}.`,
      );
      console.error(`Error details: ${err.message}`);
    } else {
      console.error('Error creating budget:', err);
    }
  }
}
// [END billingbudgets_v1beta1_budgetservice_budget_create_async]

async function main(args) {
  if (args.length !== 1) {
    throw new Error(
      `This script requires 1 argument, but received ${args.length}.`,
    );
  }
  await createBudget(args[0]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify three arguments:
 - Google Cloud Billing Account ID like '000000-000000-000000'
Usage:
 node budget-service-client-budget-create-async.js 000000-000000-000000
`);
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  createBudget,
};
