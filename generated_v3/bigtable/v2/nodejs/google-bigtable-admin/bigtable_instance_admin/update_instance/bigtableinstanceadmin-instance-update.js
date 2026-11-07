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

// [START bigtable_v2_bigtableinstanceadmin_instance_update]
'use strict';

const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
const {status} = require('@grpc/grpc-js');

const client = new BigtableInstanceAdminClient();

/**
 * Updates an existing Bigtable instance.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} instanceId - The caller-chosen ID of the existing Bigtable instance to update.
 */
async function updateInstance(projectId, instanceId) {
  try {
    const displayName = 'example-display-name';

    const instancePath = client.instancePath(projectId, instanceId);

    // Retrieve the existing instance to perform a full replacement update.
    const [instance] = await client.getInstance({name: instancePath});

    // Update the display name on the retrieved instance object.
    instance.displayName = displayName;

    // Output-only fields must not be set on update requests.
    delete instance.state;

    // Send the updated instance to the Bigtable Admin service.
    const [updatedInstance] = await client.updateInstance(instance);

    console.log(`Updated instance: ${updatedInstance.name}`);
    console.log(`Display name: ${updatedInstance.displayName}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Instance not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`Failed to update instance: ${err.message}`);
    }
  }
}

module.exports = {updateInstance};
// [END bigtable_v2_bigtableinstanceadmin_instance_update]
