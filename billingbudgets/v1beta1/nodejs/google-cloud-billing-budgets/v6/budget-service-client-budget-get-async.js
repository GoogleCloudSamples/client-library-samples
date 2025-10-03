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

// [START billingbudgets_v1beta1_budgetservice_budget_get_async]
const {BudgetServiceClient} = require('@google-cloud/billing-budgets').v1beta1;
const {status} = require('@grpc/grpc-js');

const client = new BudgetServiceClient();

/**
 * Gets a budget by its ID for a given billing account.
 *
 * @param {string} billingAccountId Your Google Cloud Billing Account ID (e.g., '000000-000000-000000')
 * @param {string} budgetId The ID of the budget to retrieve (e.g., '1234567890123')
 */
async function getBudget(
  billingAccountId = '000000-000000-000000',
  budgetId = '1234567890123',
) {
  const name = client.budgetPath(billingAccountId, budgetId);

  const request = {
    name: name,
  };

  try {
    const [budget] = await client.getBudget(request);

    console.log(`Successfully retrieved budget: ${budget.name}`);
    console.log(`Display Name: ${budget.displayName}`);
    console.log(
      `Amount: ${budget.amount.specifiedAmount.units} ${budget.amount.specifiedAmount.currencyCode}`,
    );
    if (
      budget.budgetFilter &&
      budget.budgetFilter.projects &&
      budget.budgetFilter.projects.length > 0
    ) {
      console.log(
        `Filtered projects: ${budget.budgetFilter.projects.join(', ')}`,
      );
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Budget '${budgetId}' not found under billing account '${billingAccountId}'. ` +
          'Please ensure the budget ID and billing account ID are correct and the budget exists.',
      );
    } else {
      console.error(
        `Error getting budget '${budgetId}' for billing account '${billingAccountId}':`,
        err,
      );
    }
    throw err;
  }
}
// [END billingbudgets_v1beta1_budgetservice_budget_get_async]

async function main(args) {
  if (args.length !== 2) {
    throw new Error(
      `This script requires 2 arguments, but received ${args.length}.`,
    );
  }
  await getBudget(args[0], args[1]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify two arguments:
 - Google Cloud Billing Account ID like 'example-billing-account-id'
 - Budget ID like 'example-budget-id'
Usage:
 node budget-service-client-budget-get-async.js example-billing-account-id example-budget-id
`);
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  getBudget,
};
