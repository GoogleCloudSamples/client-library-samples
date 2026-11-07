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

// [START cloudbilling_v1_cloudbilling_projectbillinginfo_get]
'use strict';

const {CloudBillingClient} = require('@google-cloud/billing');
const {status} = require('@grpc/grpc-js');

const client = new CloudBillingClient();

/**
 * Retrieves the billing information for a specified project.
 *
 * @param {string} projectId - The Google Cloud project ID to retrieve billing information for.
 */
async function getProjectBillingInfo(projectId) {
  try {
    const name = `projects/${projectId}`;
    const [billingInfo] = await client.getProjectBillingInfo({name});

    console.log(`Project ID: ${billingInfo.projectId}`);
    console.log(`Billing Account Name: ${billingInfo.billingAccountName}`);
    console.log(`Billing Enabled: ${billingInfo.billingEnabled}`);

    return billingInfo;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Project or billing info not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied for project billing info: ${err.message}`);
    } else {
      console.error(`Failed to retrieve billing information: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getProjectBillingInfo };
// [END cloudbilling_v1_cloudbilling_projectbillinginfo_get]
