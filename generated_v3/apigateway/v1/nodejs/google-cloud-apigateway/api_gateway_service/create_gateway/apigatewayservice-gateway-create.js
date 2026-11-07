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

// [START apigateway_v1_apigatewayservice_gateway_create]
'use strict';

const {ApiGatewayServiceClient} = require('@google-cloud/api-gateway');
const {status} = require('@grpc/grpc-js');

const client = new ApiGatewayServiceClient();

/**
 * Creates a Gateway using the ApiGatewayServiceClient.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region where the Gateway is deployed (for example, 'us-central1').
 * @param {string} gatewayId - The caller-chosen identifier to assign to the Gateway (for example, 'example-gateway'). Must be unique within the parent location.
 * @param {string} apiId - The caller-chosen ID of the existing API that the Gateway serves (for example, 'example-api').
 * @param {string} apiConfigId - The caller-chosen ID of the existing API Config that the Gateway serves (for example, 'example-config'). Must be in ACTIVE state.
 */
async function createGateway(projectId, locationId, gatewayId, apiId, apiConfigId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const gateway = {
      apiConfig: `projects/${projectId}/locations/global/apis/${apiId}/configs/${apiConfigId}`,
    };

    const request = {
      parent,
      gatewayId,
      gateway,
    };

    const [operation] = await client.createGateway(request);
    const [response] = await operation.promise();

    console.log(`Gateway created: ${response.name}`);
    console.log(`Default hostname: ${response.defaultHostname}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Gateway already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`API operation failed with status code ${err.code}: ${err.message}`);
    } else {
      console.error(`Non-API error occurred: ${err.message}`);
    }
  }
}

module.exports = { createGateway };
// [END apigateway_v1_apigatewayservice_gateway_create]
