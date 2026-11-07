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

// [START gdchardwaremanagement_v1alpha_gdchardwaremanagement_orders_list]
'use strict';

const {GDCHardwareManagementClient} = require('@google-cloud/gdchardwaremanagement');
const {status} = require('@grpc/grpc-js');

const client = new GDCHardwareManagementClient();

/**
 * Use the listOrders method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function listOrders(projectId, locationId) {
  try {
    const parent = client.locationPath(projectId, locationId);
    const request = {
      parent,
    };

    const [orders] = await client.listOrders(request);
    for (const order of orders) {
      console.log(`Order name: ${order.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Specified location or resource was not found:', err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied while attempting to list orders:', err.message);
    } else {
      console.error('Failed to list orders:', err.message || err);
    }
  }
}

module.exports = { listOrders };
// [END gdchardwaremanagement_v1alpha_gdchardwaremanagement_orders_list]
