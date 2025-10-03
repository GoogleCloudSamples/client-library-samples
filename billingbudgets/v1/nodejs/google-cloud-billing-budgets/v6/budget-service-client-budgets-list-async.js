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

// [START billingbudgets_v1_budgetservice_list_budgets_async]
const {BudgetServiceClient} = require('@google-cloud/billing-budgets').v1;
const {status} = require('@grpc/grpc-js');

const client = new BudgetServiceClient();

/**
 * Lists all budgets for a given billing account.
 *
 * @param {string} billingAccountId The ID of the billing account (e.g., '012345-567890-ABCDEF')
 */
async function listBudgets(billingAccountId = '012345-567890-ABCDEF') {
  const request = {
    parent: `billingAccounts/${billingAccountId}`,
  };

  try {
    const [budgets] = await client.listBudgets(request);

    if (budgets.length === 0) {
      console.log(`No budgets found for billing account ${billingAccountId}.`);
      return;
    }

    console.log(`Budgets for billing account ${billingAccountId}:`);
    for (const budget of budgets) {
      console.log(`- Budget Name: ${budget.name}`);
      console.log(`  Display Name: ${budget.displayName}`);
      if (budget.amount && budget.amount.specifiedAmount) {
        const currencyCode =
          budget.amount.specifiedAmount.currencyCode || 'USD';
        const units = budget.amount.specifiedAmount.units || '0';
        const nanos = budget.amount.specifiedAmount.nanos || 0;
        console.log(
          `  Amount: ${units}.${String(nanos).padStart(9, '0')} ${currencyCode}`
        );
      }
      if (budget.budgetFilter && budget.budgetFilter.projects) {
        console.log(`  Projects: ${budget.budgetFilter.projects.join(', ')}`);
      }
      if (budget.thresholdRules) {
        console.log('  Threshold Rules:');
        for (const rule of budget.thresholdRules) {
          console.log(`    - Threshold: ${rule.thresholdPercent * 100}%`);
          console.log(`      Spend Basis: ${rule.spendBasis}`);
        }
      }
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Billing Account '${billingAccountId}' not found. ` +
          'Please ensure the billing account ID is correct and you have the necessary permissions.'
      );
    } else {
      console.error('Error listing budgets:', err.message);
    }
  }
}
// [END billingbudgets_v1_budgetservice_list_budgets_async]

async function main(args) {
  if (args.length !== 1) {
    throw new Error(`This script requires 1 arguments, but received ${args.length}.`);
  }
  await listBudgets(args[0]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify one argument:
 - Billing Account ID like '012345-567890-ABCDEF'
Usage:
 node budget-service-client-budgets-list-async.js 012345-567890-ABCDEF
`);

    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  listBudgets,
};

