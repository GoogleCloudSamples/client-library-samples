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

// [START networkconnectivity_v1beta_hubservice_group_get]
'use strict';

const {HubServiceClient} = require('@google-cloud/network-connectivity');
const {status} = require('@grpc/grpc-js');

const client = new HubServiceClient();

/**
 * Retrieves a Network Connectivity Center group.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} hubId - The ID of the Network Connectivity Center hub.
 * @param {string} groupId - The ID of the group to retrieve.
 */
async function getGroup(projectId, hubId, groupId) {
  try {
    const name = `projects/${projectId}/locations/global/hubs/${hubId}/groups/${groupId}`;
    const [group] = await client.getGroup({name});

    console.log(`Group retrieved: ${group.name}`);
    console.log(`State: ${group.state}`);
    return group;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Group not found: ${err.message}`);
      return;
    }
    if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
      return;
    }
    console.error(`Request failed: ${err.message}`);
  }
}

module.exports = { getGroup };
// [END networkconnectivity_v1beta_hubservice_group_get]
