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

// [START apihub_v1_apihub_api_create]
'use strict';

const {ApiHubClient} = require('@google-cloud/apihub');
const {status} = require('@grpc/grpc-js');

const client = new ApiHubClient();

/**
 * Creates an API resource in API Hub.
 *
 * @param {string} projectId The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId The Google Cloud region where the service is located (for example, 'us-central1').
 * @param {string} apiId The ID to use for the API resource.
 */
async function createApi(projectId, locationId, apiId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const api = {
      displayName: 'Example API',
      description: 'An example API registered in API Hub',
    };

    const request = {
      parent,
      apiId,
      api,
    };

    const [response] = await client.createApi(request);
    console.log(`Created API: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.log(`API already exists: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.log(`API Hub instance is not active: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.log(`Invalid argument: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = {createApi};
// [END apihub_v1_apihub_api_create]
