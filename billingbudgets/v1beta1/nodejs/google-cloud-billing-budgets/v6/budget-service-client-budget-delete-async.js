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

// [START billingbudgets_v1beta1_budgetservice_delete_budget_async]
const {BudgetServiceClient} = require('@google-cloud/billing-budgets').v1beta1;
const {status} = require('@grpc/grpc-js');

const client = new BudgetServiceClient();

/**
 * Deletes a specified budget.
 *
 * @param {string} billingAccountId Your Google Cloud Billing Account ID (e.g., '012345-567890-ABCDEF')
 * @param {string} budgetId The ID of the budget to delete (e.g., 'custom-budget-123')
 */
async function deleteBudget(
  billingAccountId = '012345-567890-ABCDEF',
  budgetId = 'custom-budget-123',
) {
  const name = client.budgetPath(billingAccountId, budgetId);

  const request = {
    name: name,
  };

  try {
    await client.deleteBudget(request);
    console.log(
      `Budget ${budgetId} for billing account ${billingAccountId} deleted successfully.`,
    );
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.log(
        `Budget ${budgetId} not found under billing account ${billingAccountId}. It may have already been deleted.`,
      );
    } else {
      console.error('Error deleting budget:', err.message);
    }
  }
}
// [END billingbudgets_v1beta1_budgetservice_delete_budget_async]

async function main(args) {
  if (args.length !== 2) {
    throw new Error(
      `This script requires 2 arguments, but received ${args.length}.`,
    );
  }
  await deleteBudget(args[0], args[1]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify two arguments:
 - Google Cloud Billing Account ID like '000000-000000-000000'
 - Budget ID like 'example-budget-id'
Usage:
 node budget-service-client-budget-delete-async.js 000000-000000-000000 example-budget-id
`);

    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  deleteBudget,
};
