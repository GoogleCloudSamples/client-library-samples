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

// [START bigtable_v2_bigtabletableadmin_backups_list]
'use strict';

const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;
const {status} = require('@grpc/grpc-js');

const client = new BigtableTableAdminClient();

/**
 * Lists Bigtable backups in a specified cluster or across all clusters in an instance.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} instanceId - The ID of the Bigtable instance hosting the cluster.
 * @param {string} clusterId - The ID of the Bigtable cluster, or '-' to list backups across all clusters in the instance.
 */
async function listBackups(projectId, instanceId, clusterId) {
  try {
    const parent = `projects/${projectId}/instances/${instanceId}/clusters/${clusterId}`;
    const request = {
      parent,
    };

    const [backups] = await client.listBackups(request);
    console.log(`Listing backups in ${parent}:`);
    for (const backup of backups) {
      console.log(`- Backup name: ${backup.name}`);
      console.log(`  Source table: ${backup.sourceTable}`);
      console.log(`  State: ${backup.state}`);
      console.log(`  Size in bytes: ${backup.sizeBytes}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`API error code ${err.code}: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = {listBackups};
// [END bigtable_v2_bigtabletableadmin_backups_list]
