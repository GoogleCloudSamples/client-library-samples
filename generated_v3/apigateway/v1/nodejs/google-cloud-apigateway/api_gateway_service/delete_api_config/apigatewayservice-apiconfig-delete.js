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

// [START apigateway_v1_apigatewayservice_apiconfig_delete]
'use strict';

const {ApiGatewayServiceClient} = require('@google-cloud/api-gateway');
const {status} = require('@grpc/grpc-js');

const client = new ApiGatewayServiceClient();

/**
 * Deletes an API config.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} apiId - Identifier of the parent API (for example, 'example-api').
 * @param {string} apiConfigId - Identifier of the API Config to delete (for example, 'example-config').
 */
async function deleteApiConfig(projectId, apiId, apiConfigId) {
  try {
    const name = `projects/${projectId}/locations/global/apis/${apiId}/configs/${apiConfigId}`;

    const [operation] = await client.deleteApiConfig({name});
    await operation.promise();

    console.log(`Deleted API config: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`API config not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`API config is in use or cannot be deleted: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { deleteApiConfig };
// [END apigateway_v1_apigatewayservice_apiconfig_delete]
