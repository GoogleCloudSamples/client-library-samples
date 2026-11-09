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

// [START networkconnectivity_v1_hubservice_hub_delete]
'use strict';

const {HubServiceClient} = require('@google-cloud/network-connectivity');
const {status} = require('@grpc/grpc-js');

const client = new HubServiceClient();

/**
 * Use the deleteHub method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} hubId - The ID of the Network Connectivity Center hub to delete.
 */
async function deleteHub(projectId, hubId) {
  try {
    const name = `projects/${projectId}/locations/global/hubs/${hubId}`;
    const request = {
      name,
    };

    // DeleteHub initiates a long-running operation.
    const [operation] = await client.deleteHub(request);
    console.log(`Deletion initiated for hub: ${name}`);

    // Wait for the long-running operation to complete.
    await operation.promise();
    console.log(`Deleted hub: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Hub not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed when deleting hub: ${err.message}`);
    } else {
      console.error(`Failed to delete hub: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteHub };
// [END networkconnectivity_v1_hubservice_hub_delete]
