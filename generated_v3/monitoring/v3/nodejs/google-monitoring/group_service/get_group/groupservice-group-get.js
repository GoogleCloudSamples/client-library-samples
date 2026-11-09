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

// [START monitoring_v3_groupservice_group_get]
'use strict';

const {GroupServiceClient} = require('@google-cloud/monitoring');
const {status} = require('@grpc/grpc-js');

const client = new GroupServiceClient();

/**
 * Use the getGroup method
 *
 * @param {string} groupId - The server-generated ID of the group.
 * @param {string} projectId - The Google Cloud project ID.
 */
async function getGroup(groupId, projectId) {
  try {
    const name = `projects/${projectId}/groups/${groupId}`;
    const request = {
      name,
    };

    const [group] = await client.getGroup(request);

    console.log(`Group retrieved: ${group.name}`);
    console.log(`Display name: ${group.displayName}`);
    console.log(`Filter: ${group.filter}`);
    return group;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Group not found: projects/${projectId}/groups/${groupId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied for resource: projects/${projectId}/groups/${groupId}`);
    } else {
      console.error(`Failed to retrieve group: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getGroup };
// [END monitoring_v3_groupservice_group_get]
