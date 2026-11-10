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

// [START cloudbilling_v1_cloudbilling_test_iam_permissions]
'use strict';

const {CloudBillingClient} = require('@google-cloud/billing');
const {status} = require('@grpc/grpc-js');

const client = new CloudBillingClient();

/**
 * Tests IAM permissions on a Google Cloud billing account.
 *
 * @param {string} billingAccountId - The server-generated ID of the billing account (for example, '012345-567890-ABCDEF').
 */
async function testIamPermissions(billingAccountId) {
  try {
    const resource = `billingAccounts/${billingAccountId}`;
    const permissions = [
      'billing.accounts.get',
      'billing.accounts.update',
    ];

    const [response] = await client.testIamPermissions({
      resource,
      permissions,
    });

    const allowedPermissions = response.permissions || [];
    console.log(`Allowed permissions: ${allowedPermissions.join(', ')}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Billing account was not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while checking IAM permissions: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Error testing IAM permissions: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { testIamPermissions };
// [END cloudbilling_v1_cloudbilling_test_iam_permissions]
