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

// [START migrationcenter_v1_migrationcenter_group_update]
'use strict';

const {MigrationCenterClient} = require('@google-cloud/migrationcenter');
const {status} = require('@grpc/grpc-js');

const client = new MigrationCenterClient();

/**
 * Updates a Migration Center group.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region (for example, 'us-central1').
 * @param {string} groupId - The caller-specified ID of the group to update.
 */
async function updateGroup(projectId, locationId, groupId) {
  try {
    const updateMask = {
      paths: ['display_name'],
    };

    const group = {
      name: `projects/${projectId}/locations/${locationId}/groups/${groupId}`,
      displayName: 'example-updated-display-name',
    };

    const request = {
      group,
      updateMask,
    };

    // UpdateGroup is a long-running operation; await completion of the operation.
    const [operation] = await client.updateGroup(request);
    const [response] = await operation.promise();

    console.log(`Updated group: ${response.name}`);
    console.log(`Display name: ${response.displayName}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Group not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { updateGroup };
// [END migrationcenter_v1_migrationcenter_group_update]
