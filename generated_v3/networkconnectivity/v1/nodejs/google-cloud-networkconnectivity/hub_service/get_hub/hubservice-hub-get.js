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

// [START networkconnectivity_v1_hubservice_hub_get]
'use strict';

const {HubServiceClient} = require('@google-cloud/network-connectivity');
const {status} = require('@grpc/grpc-js');

const client = new HubServiceClient();

/**
 * Retrieves details of a Network Connectivity Center hub.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} hubId - The ID of the Network Connectivity Center hub.
 */
async function getHub(projectId, hubId) {
  try {
    const name = client.hubPath(projectId, hubId);
    const request = {
      name,
    };

    const [hub] = await client.getHub(request);
    console.log(`Hub name: ${hub.name}`);
    console.log(`Hub state: ${hub.state}`);
    console.log(`Hub description: ${hub.description || 'None'}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Hub not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to retrieve hub: ${err.message}`);
    }
  }
}

module.exports = { getHub };
// [END networkconnectivity_v1_hubservice_hub_get]
