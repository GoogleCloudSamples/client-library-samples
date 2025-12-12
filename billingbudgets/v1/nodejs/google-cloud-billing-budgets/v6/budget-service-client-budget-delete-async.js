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

// [START billingbudgets_v1_budgetservice_delete_budget_async]
const {BudgetServiceClient} = require('@google-cloud/billing-budgets').v1;
const {status} = require('@grpc/grpc-js');

const client = new BudgetServiceClient();

/**
 * Deletes a specified budget.
 *
 * Deleting a budget removes it from the billing account and stops any associated
 * notifications from being sent. If the budget does not exist, the operation
 * will still succeed without error.
 *
 * @param {string} billingAccountId Your Google Cloud Billing Account ID (e.g., '000000-000000-000000')
 * @param {string} budgetId The ID of the budget to delete (e.g., 'example-budget-123')
 */
async function deleteBudget(
  billingAccountId = '000000-000000-000000',
  budgetId = 'example-budget-123',
) {
  const name = client.budgetPath(billingAccountId, budgetId);

  const request = {
    name: name,
  };

  try {
    await client.deleteBudget(request);
    console.log(
      `Successfully deleted budget: ${budgetId} from billing account ${billingAccountId}`,
    );
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.log(
        `Budget ${budgetId} not found under billing account ${billingAccountId}. ` +
          'It might have already been deleted or the ID is incorrect.',
      );
    } else {
      console.error(`Error deleting budget ${budgetId}:`, err);
    }
  }
}
// [END billingbudgets_v1_budgetservice_delete_budget_async]

async function main(args) {
  if (args.length !== 2) {
    throw new Error(`This script requires 2 arguments, but received ${args.length}.`);
  }
  await deleteBudget(args[0], args[1]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify two arguments:
 - Your Google Cloud Billing Account ID like '000000-000000-000000'
 - The ID of the budget to delete like 'example-budget-123'
Usage:
 node budget-service-client-budget-delete-async.js 000000-000000-000000 example-budget-123
`);

    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  deleteBudget,
};
