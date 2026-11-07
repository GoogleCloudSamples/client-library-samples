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

// [START gdchardwaremanagement_v1alpha_gdchardwaremanagement_hardware_create]
'use strict';

const {GDCHardwareManagementClient} = require('@google-cloud/gdchardwaremanagement');
const {status} = require('@grpc/grpc-js');

const client = new GDCHardwareManagementClient();

/**
 * Creates a hardware resource in Google Distributed Cloud.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} hardwareId - The identifier for the Hardware resource to create.
 * @param {string} orderId - The ID of the existing Order that this hardware belongs to.
 * @param {string} siteId - The ID of the existing Site where this hardware is installed.
 * @param {string} zoneId - The ID of the existing Zone that this hardware belongs to.
 * @param {string} skuId - The ID of the existing Sku for this hardware configuration.
 */
async function createHardware(projectId, locationId, hardwareId, orderId, siteId, zoneId, skuId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const hardware = {
      order: `projects/${projectId}/locations/${locationId}/orders/${orderId}`,
      site: `projects/${projectId}/locations/${locationId}/sites/${siteId}`,
      zone: `projects/${projectId}/locations/${locationId}/zones/${zoneId}`,
      config: {
        sku: `projects/${projectId}/locations/${locationId}/skus/${skuId}`,
        powerSupply: 'POWER_SUPPLY_AC',
        subscriptionDurationMonths: 36,
      },
    };

    const [operation] = await client.createHardware({
      parent,
      hardwareId,
      hardware,
    });

    const [response] = await operation.promise();
    console.log(`Created hardware: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Hardware already exists: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code) {
      console.error(`RPC failed with code ${err.code}: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { createHardware };
// [END gdchardwaremanagement_v1alpha_gdchardwaremanagement_hardware_create]
