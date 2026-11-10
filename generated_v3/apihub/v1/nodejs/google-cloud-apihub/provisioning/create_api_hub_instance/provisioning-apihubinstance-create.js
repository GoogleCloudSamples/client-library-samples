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

// [START apihub_v1_provisioning_apihubinstance_create]
'use strict';

const {ProvisioningClient} = require('@google-cloud/apihub');
const {status} = require('@grpc/grpc-js');

const client = new ProvisioningClient();

/**
 * Creates an API Hub instance in a specified project and location.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function createApiHubInstance(projectId, locationId) {
  try {
    const parent = client.locationPath(projectId, locationId);
    const apiHubInstance = {
      description: 'Example API Hub instance',
      config: {
        disableSearch: false,
      },
    };

    const request = {
      parent,
      apiHubInstance,
    };

    // Wait for the long-running operation to complete.
    const [operation] = await client.createApiHubInstance(request);
    const [response] = await operation.promise();

    console.log(`API Hub instance created: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`API Hub instance already exists in location ${locationId}.`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      console.error(`Unexpected error: ${err.message}`);
    }
  }
}

module.exports = { createApiHubInstance };
// [END apihub_v1_provisioning_apihubinstance_create]
