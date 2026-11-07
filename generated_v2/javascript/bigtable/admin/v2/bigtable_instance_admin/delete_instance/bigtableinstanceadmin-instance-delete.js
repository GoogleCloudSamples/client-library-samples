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

// [START bigtable_v2_bigtableinstanceadmin_instance_delete]
'use strict';

const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
const {status} = require('@grpc/grpc-js');

const client = new BigtableInstanceAdminClient();

/**
 * Deletes a Cloud Bigtable instance.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} instanceId - ID of the Instance (for example, 'example-instance-id')
 */
async function deleteInstance(projectId, instanceId) {
  try {
    const name = `projects/${projectId}/instances/${instanceId}`;
    const request = {
      name,
    };

    await client.deleteInstance(request);
    console.log(`Deleted instance: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Instance not found: projects/${projectId}/instances/${instanceId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: projects/${projectId}/instances/${instanceId}`);
    } else {
      console.error(`RPC error: ${err.message}`);
    }
  }
}

module.exports = {deleteInstance};
// [END bigtable_v2_bigtableinstanceadmin_instance_delete]
