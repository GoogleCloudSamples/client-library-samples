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

// [START apigateway_v1_apigatewayservice_apiconfig_get]
'use strict';

const {ApiGatewayServiceClient} = require('@google-cloud/api-gateway');
const {status} = require('@grpc/grpc-js');

const client = new ApiGatewayServiceClient();

/**
 * Use the getApiConfig method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} apiId - The caller-specified ID of the parent API resource (for example, 'example-api').
 * @param {string} apiConfigId - The caller-specified ID of the API Config resource (for example, 'example-config').
 */
async function getApiConfig(projectId, apiId, apiConfigId) {
  try {
    const name = `projects/${projectId}/locations/global/apis/${apiId}/configs/${apiConfigId}`;

    const request = {
      name,
    };

    const [response] = await client.getApiConfig(request);

    console.log(`API Config Name: ${response.name}`);
    console.log(`Display Name: ${response.displayName}`);
    console.log(`State: ${response.state}`);

    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`API Config not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Service error: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getApiConfig };
// [END apigateway_v1_apigatewayservice_apiconfig_get]
