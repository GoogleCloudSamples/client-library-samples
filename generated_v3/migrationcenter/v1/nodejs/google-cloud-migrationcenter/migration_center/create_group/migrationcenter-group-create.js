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

// [START migrationcenter_v1_migrationcenter_group_create]
'use strict';

const {MigrationCenterClient} = require('@google-cloud/migrationcenter');
const {status} = require('@grpc/grpc-js');

const client = new MigrationCenterClient();

/**
 * Creates a group in Migration Center.
 *
 * @param {string} groupId - ID of the Group (for example, 'example-group-id')
 */
async function createGroup(groupId) {
  try {
    const projectId = await client.getProjectId();
    const location = 'us-central1';
    const parent = `projects/${projectId}/locations/${location}`;

    const group = {
      displayName: 'Example Group',
      description: 'Example group description',
      labels: {
        environment: 'production',
      },
    };

    const request = {
      parent,
      groupId,
      group,
    };

    // Initiates the creation of a group resource and awaits completion
    const [operation] = await client.createGroup(request);
    const [response] = await operation.promise();

    console.log(`Created group: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Group already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to create group: ${err.message}`);
    }
  }
}

module.exports = { createGroup };
// [END migrationcenter_v1_migrationcenter_group_create]
