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

// [START networkconnectivity_v1alpha1_hubservice_hub_update]
'use strict';

const {HubServiceClient} = require('@google-cloud/network-connectivity');
const {status} = require('@grpc/grpc-js');

const client = new HubServiceClient();

/**
 * Use the updateHub method
 *
 * @param {string} projectId - The ID of the Google Cloud project hosting the hub.
 * @param {string} hubId - The ID of the Hub to update.
 */
async function updateHub(projectId, hubId) {
  try {
    const hub = {
      name: `projects/${projectId}/locations/global/hubs/${hubId}`,
      description: 'Updated hub description',
    };
    const updateMask = {
      paths: ['description'],
    };

    const [operation] = await client.updateHub({
      hub,
      updateMask,
    });
    const [response] = await operation.promise();

    console.log(`Updated hub: ${response.name}`);
    console.log(`Updated description: ${response.description}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Hub resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error updating hub: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { updateHub };
// [END networkconnectivity_v1alpha1_hubservice_hub_update]
