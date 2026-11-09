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

// [START networkconnectivity_v1_hubservice_spoke_delete]
'use strict';

const {HubServiceClient} = require('@google-cloud/network-connectivity');
const {status} = require('@grpc/grpc-js');

const client = new HubServiceClient();

/**
 * Deletes a Network Connectivity Center spoke.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The location of the spoke (for example, 'global' or a Google Cloud region like 'us-central1').
 * @param {string} spokeId - The caller-specified identifier of the spoke to delete.
 */
async function deleteSpoke(projectId, locationId, spokeId) {
  const name = `projects/${projectId}/locations/${locationId}/spokes/${spokeId}`;

  try {
    const [operation] = await client.deleteSpoke({name});
    await operation.promise();
    console.log(`Deleted spoke: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Spoke not found: ${name}`);
    } else {
      console.error(`Failed to delete spoke: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteSpoke };
// [END networkconnectivity_v1_hubservice_spoke_delete]
