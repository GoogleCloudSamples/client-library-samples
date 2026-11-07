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

// [START bigtable_v2_bigtableinstanceadmin_instance_get]
'use strict';

const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
const {status} = require('@grpc/grpc-js');

const client = new BigtableInstanceAdminClient();

/**
 * Retrieves details for a Cloud Bigtable instance.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} instanceId - The ID of the existing Bigtable instance (for example, 'example-instance'). Must conform to '[a-z][a-z0-9\\-]+[a-z0-9]'.
 */
async function getInstance(projectId, instanceId) {
  try {
    const name = `projects/${projectId}/instances/${instanceId}`;
    const [instance] = await client.getInstance({name});

    console.log(`Instance name: ${instance.name}`);
    console.log(`Display name: ${instance.displayName}`);
    console.log(`State: ${instance.state}`);
    console.log(`Type: ${instance.type}`);
    return instance;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Instance ${instanceId} not found in project ${projectId}.`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while accessing instance ${instanceId}.`);
    } else {
      console.error(`Failed to retrieve instance: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getInstance };
// [END bigtable_v2_bigtableinstanceadmin_instance_get]
