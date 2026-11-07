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

// [START vmmigration_v1_vmmigration_group_create]
'use strict';

const {VmMigrationClient} = require('@google-cloud/vmmigration');
const {status} = require('@grpc/grpc-js');

const client = new VmMigrationClient();

/**
 * Creates a migration group in Migrate to Virtual Machines.
 *
 * @param {string} groupId - ID of the Group (for example, 'example-group-id')
 */
async function createGroup(groupId) {
  try {
    const projectId = await client.getProjectId();
    const location = 'us-central1';
    const parent = client.locationPath(projectId, location);
    const group = {
      description: 'Example migration group',
    };

    const request = {
      parent,
      groupId,
      group,
    };

    // Initiate the long-running operation to create the group
    const [operation] = await client.createGroup(request);

    // Wait for the operation to complete
    const [response] = await operation.promise();

    console.log(`Created group: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Group already exists: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to create group: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createGroup };
// [END vmmigration_v1_vmmigration_group_create]
