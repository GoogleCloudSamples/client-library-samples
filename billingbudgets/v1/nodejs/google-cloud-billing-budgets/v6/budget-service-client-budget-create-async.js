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
const { status } = require('@grpc/grpc-js');

// [START billingbudgets_v1_budgetservice_create_budget_async]
const { BudgetServiceClient } = require('@google-cloud/billing-budgets').v1;

const client = new BudgetServiceClient();

/**
 * Creates a new budget for a billing account.
 *
 * @param {string} billingAccountId The ID of the billing account (e.g., '000000-000000-000000').
 */
async function createBudget(
  billingAccountId = '000000-000000-000000',
) {
  const parent = `billingAccounts/${billingAccountId}`;

  const displayName = `My Example Budget`

  const budget = {
    displayName: displayName,
    amount: {
      specifiedAmount: {
        currencyCode: 'USD',
        units: 1000, // Represents $1,000.00
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
  };

  const request = { parent, budget };

  try {
    const [response] = await client.createBudget(request);

    console.log(response.name);
    console.log(`  Display Name: ${response.displayName}`);
    const amountUnits = response.amount.specifiedAmount.units || 0;
    const amountNanos = response.amount.specifiedAmount.nanos || 0;
    const totalAmount = amountUnits + amountNanos / 1_000_000_000;
    console.log(`  Budget Amount: ${totalAmount} ${response.amount.specifiedAmount.currencyCode}`);
    console.log(`  Threshold Rules: ${response.thresholdRules.length}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.log(`Budget '${displayName}' already exists for billing account '${billingAccountId}'.`);
      console.log('Consider updating the existing budget instead or using a different budget ID.');
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied when creating budget for billing account '${billingAccountId}'.`);
      console.error('Ensure the service account has the "billing.budgets.create" permission on the billing account.');
      console.error('Also, if a Pub/Sub topic is specified, ensure the service account has "pubsub.topics.setIamPolicy" permission on the topic.');
    } else {
      console.error(`Error creating budget '${displayName}':`, err);
    }
  }
}
// [END billingbudgets_v1_budgetservice_create_budget_async]

async function main(args) {
  if (args.length !== 1) {
    throw new Error(`This script requires 1 argument, but received ${args.length}.`);
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
