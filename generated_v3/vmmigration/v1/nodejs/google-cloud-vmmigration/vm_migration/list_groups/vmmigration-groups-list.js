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

// [START vmmigration_v1_vmmigration_groups_list]
'use strict';

const {VmMigrationClient} = require('@google-cloud/vmmigration');
const {status} = require('@grpc/grpc-js');

const client = new VmMigrationClient();

/**
 * Use the listGroups method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the VM Migration groups are located.
 */
async function listGroups(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;

    const [groups] = await client.listGroups({
      parent,
    });

    for (const group of groups) {
      console.log(`Group name: ${group.name}`);
      console.log(`Display name: ${group.displayName}`);
      console.log(`Description: ${group.description}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource location not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Insufficient permissions to list groups: ${err.message}`);
    } else {
      console.error(`API error occurred: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { listGroups };
// [END vmmigration_v1_vmmigration_groups_list]
