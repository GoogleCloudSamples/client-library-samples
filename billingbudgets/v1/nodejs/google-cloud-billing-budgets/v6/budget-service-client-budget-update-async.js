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

// [START billingbudgets_v1_budgetservice_budget_update_async]
const {BudgetServiceClient} = require('@google-cloud/billing-budgets').v1;
const {status} = require('@grpc/grpc-js');

const client = new BudgetServiceClient();

/**
 * Updates an existing budget in a Google Cloud billing account.
 *
 * This function demonstrates how to modify an existing budget's display name
 * and budgeted amount. It constructs an updated Budget object and uses an
 * update mask to specify which fields should be changed.
 *
 * @param {string} billingAccountId The ID of the billing account where the budget resides.
 *   Example: '012345-567890-ABCDEF'
 * @param {string} budgetId The unique ID of the budget to update.
 *   Example: 'my-custom-budget-123'
 * @param {string} newDisplayName The new display name for the budget.
 *   Example: 'Updated Monthly Budget for Q3'
 * @param {number} newAmountUnits The new budget amount in units. For example, 1500 for $1500.
 *   Example: 1500
 */
async function updateBudget(
  billingAccountId,
  budgetId,
  newDisplayName,
  newAmountUnits,
) {
  const budgetName = client.budgetPath(billingAccountId, budgetId);

  // Only fields specified in the 'updateMask' will be applied.
  const updatedBudget = {
    name: budgetName,
    displayName: newDisplayName,

  };

  // Fields not in the mask will be ignored.
  const updateMask = {
    paths: ['display_name']
  };

  const request = {
    budget: updatedBudget,
    updateMask: updateMask,
  };

  try {
    const [budget] = await client.updateBudget(request);
    console.log(`Successfully updated budget: ${budget.name}`);
    console.log(`New display name: ${budget.displayName}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Budget '${budgetId}' not found for billing account '${billingAccountId}'. ` +
          'Please ensure the budget ID and billing account ID are correct and the budget exists.',
      );
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(
        `Error: Permission denied when updating budget '${budgetId}'. ` +
          "Ensure the service account has 'Billing Account User' or 'Billing Account Administrator' role " +
          'on the billing account.',
      );
    } else {
      console.error(`Error updating budget '${budgetId}':`, err);
    }
  }
}
// [END billingbudgets_v1_budgetservice_budget_update_async]

async function main(args) {
  if (args.length !== 4) {
    throw new Error(`This script requires 4 arguments, but received ${args.length}.`);
  }
  await updateBudget(args[0], args[1], args[2], parseInt(args[3], 10));
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify four arguments:
 - The billing account ID, e.g., '012345-567890-ABCDEF'
 - The budget ID to update, e.g., 'my-custom-budget-123'
 - The new display name for the budget, e.g., 'Updated Monthly Budget'
 - The new budget amount in units, e.g., 1500 for $1500
Usage:
 node budget-service-client-budget-update-async.js 012345-567890-ABCDEF my-custom-budget-123 'Updated Monthly Budget' 1500
`);

    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  updateBudget,
};
