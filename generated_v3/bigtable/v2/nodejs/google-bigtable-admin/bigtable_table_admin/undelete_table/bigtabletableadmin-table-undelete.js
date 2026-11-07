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

// [START bigtable_v2_bigtabletableadmin_undelete_table]
'use strict';

const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;
const {status} = require('@grpc/grpc-js');

const client = new BigtableTableAdminClient();

/**
 * Restores a deleted Cloud Bigtable table within the recovery retention window.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} instanceId - The ID of the Bigtable instance hosting the deleted table.
 * @param {string} tableId - The ID of the deleted Bigtable table to restore.
 */
async function undeleteTable(projectId, instanceId, tableId) {
  try {
    const name = `projects/${projectId}/instances/${instanceId}/tables/${tableId}`;

    // Initiates the long-running operation to restore the deleted table.
    const [operation] = await client.undeleteTable({name});
    console.log(`Waiting for table restoration to complete: ${name}`);

    // Waits for the undelete long-running operation to complete.
    const [table] = await operation.promise();
    console.log(`Restored table: ${table.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Table not found or recovery window expired: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Operation precondition failed: ${err.message}`);
    } else {
      console.error(`Failed to undelete table: ${err.message}`);
    }
  }
}

module.exports = { undeleteTable };
// [END bigtable_v2_bigtabletableadmin_undelete_table]
