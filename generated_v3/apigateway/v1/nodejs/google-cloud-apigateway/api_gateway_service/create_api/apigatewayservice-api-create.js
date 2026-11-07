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

// [START apigateway_v1_apigatewayservice_api_create]
'use strict';

const {ApiGatewayServiceClient} = require('@google-cloud/api-gateway');
const {status} = require('@grpc/grpc-js');

const client = new ApiGatewayServiceClient();

/**
 * Creates a new API Gateway resource.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} apiId - The ID of the API.
 */
async function createApi(projectId, apiId) {
  try {
    const parent = `projects/${projectId}/locations/global`;
    const api = {
      displayName: 'Sample API',
      labels: {
        env: 'dev',
      },
    };

    const request = {
      parent,
      apiId,
      api,
    };

    const [operation] = await client.createApi(request);
    const [response] = await operation.promise();
    console.log(`Created API: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`API ${apiId} already exists.`);
    } else if (err.code !== undefined) {
      console.error(`Google API Error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { createApi };
// [END apigateway_v1_apigatewayservice_api_create]
