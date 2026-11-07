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

// [START apihub_v1_provisioning_lookup_api_hub_instance]
'use strict';

const {ProvisioningClient} = require('@google-cloud/apihub');
const {status} = require('@grpc/grpc-js');

const client = new ProvisioningClient();

/**
 * Looks up an API Hub instance in the specified project and location.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function lookupApiHubInstance(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;

    const request = {
      parent,
    };

    const [response] = await client.lookupApiHubInstance(request);
    if (response.apiHubInstance) {
      console.log(`API Hub instance found: ${response.apiHubInstance.name}`);
    } else {
      console.log('No API Hub instance found in the specified location.');
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`API Hub instance not found in location: ${locationId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while looking up API Hub instance: ${err.message}`);
    } else {
      console.error(`API Hub lookup failed with error code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { lookupApiHubInstance };
// [END apihub_v1_provisioning_lookup_api_hub_instance]
