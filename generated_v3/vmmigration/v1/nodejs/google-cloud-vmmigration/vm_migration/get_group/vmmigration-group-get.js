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

// [START vmmigration_v1_vmmigration_group_get]
'use strict';

const {VmMigrationClient} = require('@google-cloud/vmmigration');
const {status} = require('@grpc/grpc-js');

const client = new VmMigrationClient();

/**
 * Retrieves details of an existing migration group.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the group is located.
 * @param {string} groupId - The caller-chosen identifier of the migration group.
 */
async function getGroup(projectId, locationId, groupId) {
  try {
    const name = client.groupPath(projectId, locationId, groupId);

    const request = {
      name,
    };

    const [group] = await client.getGroup(request);

    console.log(`Group Name: ${group.name}`);
    console.log(`Display Name: ${group.displayName}`);
    console.log(`Description: ${group.description}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Group not found: projects/${projectId}/locations/${locationId}/groups/${groupId}`);
    } else {
      console.error(`Error retrieving group: ${err.message}`);
    }
  }
}

module.exports = { getGroup };
// [END vmmigration_v1_vmmigration_group_get]
