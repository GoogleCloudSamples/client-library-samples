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

// [START monitoring_v3_groupservice_group_create]
'use strict';

const {GroupServiceClient} = require('@google-cloud/monitoring');
const {status} = require('@grpc/grpc-js');

const client = new GroupServiceClient();

/**
 * Use the createGroup method
 *
 * @param {string} projectId - The Google Cloud project ID where the group will be created.
 */
async function createGroup(projectId) {
  try {
    const group = {
      displayName: 'Example Group',
      filter: 'resource.type = "gce_instance"',
    };
    const name = `projects/${projectId}`;

    const [createdGroup] = await client.createGroup({
      name,
      group,
    });

    console.log(`Created group: ${createdGroup.name}`);
    console.log(`Display name: ${createdGroup.displayName}`);
    return createdGroup;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Group already exists in project ${projectId}: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to create group: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createGroup };
// [END monitoring_v3_groupservice_group_create]
