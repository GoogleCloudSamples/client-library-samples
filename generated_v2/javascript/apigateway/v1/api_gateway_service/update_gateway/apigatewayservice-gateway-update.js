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

// [START apigateway_v1_apigatewayservice_gateway_update]
'use strict';

const {ApiGatewayServiceClient} = require('@google-cloud/api-gateway');
const {status} = require('@grpc/grpc-js');

const client = new ApiGatewayServiceClient();

/**
 * Use the updateGateway method
 *
 * @param {string} projectId - Google Cloud project ID.
 * @param {string} locationId - Google Cloud region where the API Gateway is deployed.
 * @param {string} gatewayId - The user-defined identifier of the Gateway to update.
 */
async function updateGateway(projectId, locationId, gatewayId) {
  try {
    const gateway = {
      name: `projects/${projectId}/locations/${locationId}/gateways/${gatewayId}`,
      displayName: 'Updated Example Gateway',
    };
    const updateMask = {
      paths: ['display_name'],
    };

    const [operation] = await client.updateGateway({
      gateway,
      updateMask,
    });
    const [response] = await operation.promise();

    console.log(`Updated gateway name: ${response.name}`);
    console.log(`Updated display name: ${response.displayName}`);
    console.log(`Gateway state: ${response.state}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Gateway not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error occurred: ${err.message}`);
    }
  }
}

module.exports = { updateGateway };
// [END apigateway_v1_apigatewayservice_gateway_update]
