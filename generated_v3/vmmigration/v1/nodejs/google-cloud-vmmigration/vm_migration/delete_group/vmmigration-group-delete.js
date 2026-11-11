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

// [START vmmigration_v1_vmmigration_group_delete]
'use strict';

const {VmMigrationClient} = require('@google-cloud/vmmigration');
const {status} = require('@grpc/grpc-js');

const client = new VmMigrationClient();

/**
 * Use the deleteGroup method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the group is located.
 * @param {string} groupId - The caller-chosen identifier of the migration group to delete.
 */
async function deleteGroup(projectId, locationId, groupId) {
  try {
    const name = client.groupPath(projectId, locationId, groupId);
    const [operation] = await client.deleteGroup({name});
    await operation.promise();
    console.log(`Deleted migration group: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Group not found: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { deleteGroup };
// [END vmmigration_v1_vmmigration_group_delete]
