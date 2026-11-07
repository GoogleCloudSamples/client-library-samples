// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// [START cloudbilling_v1_cloudbilling_billingaccounts_list]
'use strict';

const {CloudBillingClient} = require('@google-cloud/billing');
const {status} = require('@grpc/grpc-js');

/**
 * Lists all billing accounts accessible to the caller.
 */
async function listBillingAccounts() {
  const client = new CloudBillingClient();

  try {
    const [billingAccounts] = await client.listBillingAccounts();

    if (!billingAccounts || billingAccounts.length === 0) {
      console.log('No billing accounts found.');
    } else {
      for (const account of billingAccounts) {
        console.log(`Billing Account Name: ${account.name}`);
        console.log(`Display Name: ${account.displayName}`);
        console.log(`Open: ${account.open}`);
      }
    }

    return billingAccounts;
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied while listing billing accounts:', err.message);
    } else if (err.code === status.UNAUTHENTICATED) {
      console.error('Authentication failed while listing billing accounts:', err.message);
    } else {
      console.error('Failed to list billing accounts:', err.message || err);
    }
    throw err;
  }
}

module.exports = { listBillingAccounts };
// [END cloudbilling_v1_cloudbilling_billingaccounts_list]
