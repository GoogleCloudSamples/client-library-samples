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

// [START migrationcenter_v1_migrationcenter_group_delete]
'use strict';

const {MigrationCenterClient} = require('@google-cloud/migrationcenter');
const {status} = require('@grpc/grpc-js');

const client = new MigrationCenterClient();

/**
 * Use the deleteGroup method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region/location ID.
 * @param {string} groupId - The caller-chosen ID of the group to delete, conforming to RFC-1034 regex `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`.
 */
async function deleteGroup(projectId, locationId, groupId) {
  try {
    const name = client.groupPath(projectId, locationId, groupId);

    // DeleteGroup initiates a long-running operation
    const [operation] = await client.deleteGroup({name});
    await operation.promise();

    console.log(`Successfully deleted group: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Group not found: ${groupId}`);
    } else {
      console.error(`Failed to delete group: ${err.message}`);
    }
  }
}

module.exports = { deleteGroup };
// [END migrationcenter_v1_migrationcenter_group_delete]
