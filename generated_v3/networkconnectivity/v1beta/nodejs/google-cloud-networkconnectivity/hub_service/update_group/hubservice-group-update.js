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

// [START networkconnectivity_v1beta_hubservice_group_update]
'use strict';

const {HubServiceClient} = require('@google-cloud/network-connectivity');
const {status} = require('@grpc/grpc-js');

const client = new HubServiceClient();

/**
 * Use the updateGroup method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} hubId - The ID of the Network Connectivity Center hub containing the group.
 * @param {string} groupId - The ID of the group to update.
 */
async function updateGroup(projectId, hubId, groupId) {
  try {
    const group = {
      name: `projects/${projectId}/locations/global/hubs/${hubId}/groups/${groupId}`,
      description: 'Updated group description',
    };
    const updateMask = {
      paths: ['description'],
    };

    // Initiate long-running operation to update the group
    const [operation] = await client.updateGroup({
      group,
      updateMask,
    });

    // Wait for the operation to complete
    const [response] = await operation.promise();

    console.log(`Updated group: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Group not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Error updating group: ${err.message}`);
    }
  }
}

module.exports = { updateGroup };
// [END networkconnectivity_v1beta_hubservice_group_update]
