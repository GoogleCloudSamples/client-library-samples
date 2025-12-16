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

// [START billingbudgets_v1beta1_budgetservice_budgets_list_async]
const {BudgetServiceClient} = require('@google-cloud/billing-budgets').v1beta1;
const {status} = require('@grpc/grpc-js');

const client = new BudgetServiceClient();

/**
 * Lists all budgets associated with a specified billing account.
 * This function demonstrates how to retrieve a paginated list of budgets.
 *
 * @param {string} billingAccountId The ID of the billing account (e.g., '012345-678901-234567').
 */
async function listBudgets(billingAccountId) {
  const formattedParent = client.billingAccountPath(billingAccountId);

  const request = {
    parent: formattedParent,
  };

  try {
    const [budgets] = await client.listBudgets(request);

    if (budgets.length === 0) {
      console.log(`No budgets found for billing account: ${billingAccountId}`);
      return;
    }

    console.log(`Budgets for billing account ${billingAccountId}:`);
    for (const budget of budgets) {
      console.log(`  Budget Name: ${budget.name}`);
      console.log(`  Display Name: ${budget.displayName}`);
      console.log(
        `  Amount: ${budget.amount.specifiedAmount.units}.${budget.amount.specifiedAmount.nanos}`,
      );
      console.log('  Thresholds:');
      for (const threshold of budget.thresholdRules) {
        console.log(
          `    - Threshold: ${threshold.thresholdPercent * 100}% of budget`,
        );
        console.log(`      Spend Basis: ${threshold.spendBasis}`);
      }
      console.log('---');
    }
  } catch (err) {
    // Check if the error is due to the billing account not being found.
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Billing account '${billingAccountId}' not found. ` +
          'Please ensure the billing account ID is correct and you have ' +
          'the necessary permissions (e.g., Billing Account User, Billing Account Viewer).' +
          `Details: ${err.message}`,
      );
    } else {
      console.error('Error listing budgets:', err.message);
    }
  }
}
// [END billingbudgets_v1beta1_budgetservice_budgets_list_async]

async function main(args) {
  if (args.length !== 1) {
    throw new Error(
      `This script requires 1 argument, but received ${args.length}.`,
    );
  }
  await listBudgets(args[0]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify one argument:
 - Google Cloud Billing Account ID like '000000-000000-000000'
Usage:
 node budget-service-client-budgets-list-async.js 000000-000000-000000
`);

    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  listBudgets,
};
