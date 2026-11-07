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

// [START networkconnectivity_v1beta_hubservice_hub_update]
'use strict';

const {HubServiceClient} = require('@google-cloud/network-connectivity');
const {status} = require('@grpc/grpc-js');

const client = new HubServiceClient();

/**
 * Use the updateHub method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} hubId - The ID of the Network Connectivity Center hub.
 */
async function updateHub(projectId, hubId) {
  try {
    const hub = {
      name: `projects/${projectId}/locations/global/hubs/${hubId}`,
      description: 'Updated Network Connectivity Center hub description',
    };
    const updateMask = {
      paths: ['description'],
    };

    const request = {
      hub,
      updateMask,
    };

    const [operation] = await client.updateHub(request);
    const [response] = await operation.promise();

    console.log(`Hub updated: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Hub not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Error updating hub: ${err.message}`);
    }
  }
}

module.exports = { updateHub };
// [END networkconnectivity_v1beta_hubservice_hub_update]
