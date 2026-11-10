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

// [START gdchardwaremanagement_v1alpha_gdchardwaremanagement_order_create]
'use strict';

const {GDCHardwareManagementClient} = require('@google-cloud/gdchardwaremanagement');
const {status} = require('@grpc/grpc-js');

const client = new GDCHardwareManagementClient();

/**
 * Creates an order.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function createOrder(projectId, locationId) {
  try {
    const parent = client.locationPath(projectId, locationId);
    const order = {
      organizationContact: {
        email: 'contact@example.com',
        phone: '+15550100',
      },
      regionCode: 'US',
    };

    const request = {
      parent,
      order,
    };

    // Initiates the long-running operation and waits for completion
    const [operation] = await client.createOrder(request);
    const [response] = await operation.promise();

    console.log(`Order created successfully: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Order already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to create order: ${err.message}`);
    }
  }
}

module.exports = { createOrder };
// [END gdchardwaremanagement_v1alpha_gdchardwaremanagement_order_create]
