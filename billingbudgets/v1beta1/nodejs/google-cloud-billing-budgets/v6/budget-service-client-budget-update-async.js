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

// [START billingbudgets_v1beta1_budgetservice_budget_update_async]
const {BudgetServiceClient} = require('@google-cloud/billing-budgets').v1beta1;
const {status} = require('@grpc/grpc-js');

const client = new BudgetServiceClient();

/**
 * Updates an existing budget.
 *
 * This sample demonstrates how to update a budget's display name and amount.
 * Note that the budget name must be provided in the budget object for the update.
 *
 * @param {string} billingAccountId Your Google Cloud Billing Account ID (e.g., '000000-000000-000000')
 * @param {string} budgetId The ID of the budget to update (e.g., 'my-budget-id')
 */
async function updateBudget(
  billingAccountId = '000000-000000-000000',
  budgetId = 'my-budget-id',
) {
  const budgetName = client.budgetPath(billingAccountId, budgetId);

  const updatedBudget = {
    name: budgetName,
    displayName: 'My Updated Budget Name',
  };

  // Define the field mask to specify which fields are being updated.
  // This ensures only the specified fields are changed, leaving others as they are.
  const updateMask = {
    paths: ['display_name'],
  };

  const request = {
    budget: updatedBudget,
    updateMask: updateMask,
  };

  try {
    const [budget] = await client.updateBudget(request);
    console.log('Budget updated successfully:');
    console.log(`  Name: ${budget.name}`);
    console.log(`  Display Name: ${budget.displayName}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Budget '${budgetId}' not found under billing account '${billingAccountId}'. ` +
          'Please ensure the budget ID and billing account ID are correct.',
      );
    } else {
      console.error('Error updating budget:', err.message);
    }
  }
}

// [END billingbudgets_v1beta1_budgetservice_budget_update_async]

async function main(args) {
  if (args.length !== 2) {
    throw new Error(
      `This script requires 2 arguments, but received ${args.length}.`,
    );
  }
  await updateBudget(args[0], args[1]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify two arguments:
 - Google Cloud Billing Account ID like '000000-000000-000000'
 - Budget ID like 'example-budget-id'
Usage:
 node budget-service-client-budget-update-async.js 000000-000000-000000 example-budget-id
`);
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  updateBudget,
};
