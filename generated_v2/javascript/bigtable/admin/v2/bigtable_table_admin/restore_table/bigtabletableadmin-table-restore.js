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

// [START bigtable_v2_bigtabletableadmin_restore_table]
'use strict';

const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;
const {status} = require('@grpc/grpc-js');

const client = new BigtableTableAdminClient();

/**
 * Restores a Cloud Bigtable table from a backup.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} instanceId - The Cloud Bigtable instance ID (for example, 'example-instance-id')
 * @param {string} tableId - The Cloud Bigtable table ID (for example, 'example-table-id')
 */
async function restoreTable(projectId, instanceId, tableId) {
  try {
    const parent = `projects/${projectId}/instances/${instanceId}`;
    const backup = `projects/${projectId}/instances/${instanceId}/clusters/example-cluster-id/backups/example-backup-id`;

    const request = {
      parent,
      tableId,
      backup,
    };

    const [operation] = await client.restoreTable(request);
    console.log(`Restore table operation initiated: ${operation.name}`);

    const [table] = await operation.promise();
    console.log(`Table restored successfully: ${table.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.ALREADY_EXISTS) {
      console.error(`Target table already exists: ${err.message}`);
    } else if (err.code) {
      console.error(`API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { restoreTable };
// [END bigtable_v2_bigtabletableadmin_restore_table]
