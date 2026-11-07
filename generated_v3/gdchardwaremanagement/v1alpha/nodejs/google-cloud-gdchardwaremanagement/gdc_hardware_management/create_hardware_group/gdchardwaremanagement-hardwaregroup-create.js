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

// [START gdchardwaremanagement_v1alpha_gdchardwaremanagement_hardwaregroup_create]
'use strict';

const {GDCHardwareManagementClient} = require('@google-cloud/gdchardwaremanagement');
const {status} = require('@grpc/grpc-js');

const client = new GDCHardwareManagementClient();

/**
 * Creates a HardwareGroup in an existing Order.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1').
 * @param {string} orderId - The ID of an existing Order (for example, 'example-order-id').
 * @param {string} hardwareGroupId - Optional identifier for the HardwareGroup.
 * @param {string} siteId - The ID of an existing Site where hardware is installed.
 * @param {string} skuId - The ID of an existing Sku for the hardware group.
 */
async function createHardwareGroup(projectId, locationId, orderId, hardwareGroupId, siteId, skuId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/orders/${orderId}`;
    const hardwareGroup = {
      hardwareCount: 1,
      site: `projects/${projectId}/locations/${locationId}/sites/${siteId}`,
      config: {
        sku: `projects/${projectId}/locations/${locationId}/skus/${skuId}`,
        powerSupply: 1,
        subscriptionDurationMonths: 36,
        subscriptionMonths: 36,
      },
    };

    const request = {
      parent,
      hardwareGroupId,
      hardwareGroup,
    };

    const [operation] = await client.createHardwareGroup(request);
    const [response] = await operation.promise();

    console.log(`Hardware group created: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Hardware group already exists: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code) {
      console.error(`API error (${err.code}): ${err.details || err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { createHardwareGroup };
// [END gdchardwaremanagement_v1alpha_gdchardwaremanagement_hardwaregroup_create]
