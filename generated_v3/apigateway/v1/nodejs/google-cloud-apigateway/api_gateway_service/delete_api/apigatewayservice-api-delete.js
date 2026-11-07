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

// [START apigateway_v1_apigatewayservice_api_delete]
'use strict';

const {ApiGatewayServiceClient} = require('@google-cloud/api-gateway');
const {status} = require('@grpc/grpc-js');

const client = new ApiGatewayServiceClient();

/**
 * Deletes an API.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} apiId - ID of the Api (for example, 'example-api-id')
 */
async function deleteApi(projectId, apiId) {
  try {
    const name = client.apiPath(projectId, apiId);

    // Initiates the long-running operation to delete the API
    const [operation] = await client.deleteApi({name});
    await operation.promise();

    console.log(`Deleted API: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Specified API does not exist.');
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`API deletion failed precondition: ${err.message}`);
    } else {
      console.error(`Failed to delete API: ${err.message}`);
    }
  }
}

module.exports = { deleteApi };
// [END apigateway_v1_apigatewayservice_api_delete]
