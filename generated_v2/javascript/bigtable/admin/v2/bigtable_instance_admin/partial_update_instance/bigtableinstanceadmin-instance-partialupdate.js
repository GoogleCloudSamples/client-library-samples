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

// [START bigtable_v2_bigtableinstanceadmin_partial_update_instance]
'use strict';

const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
const {status} = require('@grpc/grpc-js');

const client = new BigtableInstanceAdminClient();

/**
 * Updates a Cloud Bigtable instance partially using an update mask.
 *
 * @param {string} projectId - The Google Cloud project ID containing the Bigtable instance.
 * @param {string} instanceId - The ID of the Bigtable instance to partially update.
 */
async function partialUpdateInstance(projectId, instanceId) {
  try {
    const updateMask = {
      paths: ['display_name'],
    };
    const instance = {
      name: `projects/${projectId}/instances/${instanceId}`,
      displayName: 'Updated Instance Display Name',
    };

    const [operation] = await client.partialUpdateInstance({
      instance,
      updateMask,
    });

    // Wait for the long-running operation to complete.
    const [response] = await operation.promise();

    console.log(`Updated instance: ${response.name}`);
    console.log(`Display name: ${response.displayName}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Instance not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`API error (${err.code}): ${err.message}`);
    } else {
      console.error(`Unexpected error: ${err.message}`);
    }
  }
}

module.exports = {partialUpdateInstance};
// [END bigtable_v2_bigtableinstanceadmin_partial_update_instance]
