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

// [START billingbudgets_v1_budgetservice_budget_get_async]
const {BudgetServiceClient} = require('@google-cloud/billing-budgets').v1;
const {status} = require('@grpc/grpc-js');

const client = new BudgetServiceClient();

/**
 * Retrieves a specific budget by its ID.
 *
 * This sample demonstrates how to fetch the details of an existing budget
 * using its billing account ID and budget ID. It also shows proper error
 * handling for cases where the budget might not be found.
 *
 * @param {string} [billingAccountId='012345-567890-ABCDEF'] The ID of the billing account (e.g., '012345-567890-ABCDEF')
 * @param {string} [budgetId='example-budget-123'] The ID of the budget to retrieve (e.g., 'example-budget-123')
 */
async function getBudget(
  billingAccountId = '012345-567890-ABCDEF',
  budgetId = 'example-budget-123',
) {
  const name = client.budgetPath(billingAccountId, budgetId);

  const request = {
    name,
  };

  try {
    const [budget] = await client.getBudget(request);
    console.log(`Successfully retrieved budget: ${budget.name}`);
    console.log(`Display Name: ${budget.displayName}`);
    if (budget.amount?.specifiedAmount) {
      console.log(
        `Budget Amount: ${budget.amount.specifiedAmount.currencyCode} ${budget.amount.specifiedAmount.units}.${budget.amount.specifiedAmount.nanos}`,
      );
    }
    if (
      budget.budgetFilter?.projects &&
      budget.budgetFilter.projects.length > 0
    ) {
      console.log(
        `Filtered Projects: ${budget.budgetFilter.projects.join(', ')}`,
      );
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Budget '${budgetId}' not found under billing account '${billingAccountId}'.`,
      );
      console.error(
        'Please ensure the billing account ID and budget ID are correct and the budget exists.',
      );
    } else {
      console.error(`Error retrieving budget '${budgetId}':`, err.message);
    }
  }
}
// [END billingbudgets_v1_budgetservice_budget_get_async]

module.exports = {
  getBudget,
};
