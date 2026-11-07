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

// [START gdchardwaremanagement_v1alpha_gdchardwaremanagement_sku_get]
'use strict';

const {GDCHardwareManagementClient} = require('@google-cloud/gdchardwaremanagement');
const {status} = require('@grpc/grpc-js');

const client = new GDCHardwareManagementClient();

/**
 * Use the getSku method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} skuId - The server-defined SKU identifier (for example, 'example-sku-id'). Retrieve available SKU IDs using ListSkus.
 */
async function getSku(projectId, locationId, skuId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/skus/${skuId}`;
    const request = {
      name,
    };

    const [response] = await client.getSku(request);
    console.log(`Retrieved SKU: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`SKU not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing SKU: ${err.message}`);
    } else {
      console.error(`API error retrieving SKU: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getSku };
// [END gdchardwaremanagement_v1alpha_gdchardwaremanagement_sku_get]
