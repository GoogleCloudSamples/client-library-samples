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

// [START bigtable_v2_bigtableinstanceadmin_instances_list]
'use strict';

const {v2} = require('@google-cloud/bigtable');
const {BigtableInstanceAdminClient} = v2;
const {status} = require('@grpc/grpc-js');

const client = new BigtableInstanceAdminClient();

/**
 * Lists Bigtable instances in a Google Cloud project.
 *
 * @param {string} projectId - The Google Cloud project ID.
 */
async function listInstances(projectId) {
  try {
    const parent = `projects/${projectId}`;
    const [instances] = await client.listInstances({
      parent,
    });

    const instanceList = Array.isArray(instances)
      ? instances
      : instances?.instances || [];

    for (const instance of instanceList) {
      console.log(`Instance: ${instance.name}`);
      console.log(`Display name: ${instance.displayName}`);
      console.log(`State: ${instance.state}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to list instances: ${err.message}`);
    }
  }
}

module.exports = {listInstances};
// [END bigtable_v2_bigtableinstanceadmin_instances_list]
