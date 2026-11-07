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

// [START networkservices_v1_networkservices_gateway_create]
'use strict';

const {NetworkServicesClient} = require('@google-cloud/networkservices');
const {status} = require('@grpc/grpc-js');

const client = new NetworkServicesClient();

/**
 * Use the createGateway method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud location for the Gateway (for example, 'global' or 'us-central1').
 * @param {string} gatewayId - The caller-specified identifier for the Gateway resource (for example, 'example-gateway').
 */
async function createGateway(projectId, locationId, gatewayId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const gateway = {
      type: 'OPEN_MESH',
      ports: [80],
      scope: 'example-scope',
    };

    const request = {
      parent,
      gatewayId,
      gateway,
    };

    // Initialize the creation of the gateway resource
    const [operation] = await client.createGateway(request);

    // Wait for the long-running operation to complete
    const [response] = await operation.promise();
    console.log(`Gateway created successfully: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Gateway '${gatewayId}' already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided for Gateway '${gatewayId}': ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`RPC error [code ${err.code}]: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { createGateway };
// [END networkservices_v1_networkservices_gateway_create]
