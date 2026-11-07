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

// [START apigateway_v1_apigatewayservice_apis_list]
'use strict';

const {ApiGatewayServiceClient} = require('@google-cloud/api-gateway');
const {status} = require('@grpc/grpc-js');

const client = new ApiGatewayServiceClient();

/**
 * Lists API Gateway APIs in a given project.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 */
async function listApis(projectId) {
  try {
    const parent = `projects/${projectId}/locations/global`;
    const request = {
      parent,
    };

    const [apis] = await client.listApis(request);
    for (const api of apis) {
      console.log(`API Name: ${api.name}`);
      console.log(`Display Name: ${api.displayName}`);
      console.log(`State: ${api.state}`);
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid parent resource path:', err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied for project:', err.message);
    } else if (err.code === status.NOT_FOUND) {
      console.error('Resource not found:', err.message);
    } else {
      console.error('Error listing APIs:', err.message || err);
    }
  }
}

module.exports = { listApis };
// [END apigateway_v1_apigatewayservice_apis_list]
