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

// [START billingbudgets_v1beta1_budgetservice_budget_delete_async]
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
    name,
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
// [END billingbudgets_v1beta1_budgetservice_budget_delete_async]

module.exports = {
  deleteBudget,
};
