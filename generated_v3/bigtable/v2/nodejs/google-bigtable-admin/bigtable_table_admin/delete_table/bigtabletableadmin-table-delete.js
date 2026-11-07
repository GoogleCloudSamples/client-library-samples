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

// [START bigtable_v2_bigtabletableadmin_table_delete]
'use strict';

const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;
const {status} = require('@grpc/grpc-js');

const client = new BigtableTableAdminClient();

/**
 * Permanently deletes a Cloud Bigtable table.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} instanceId - The ID of the Bigtable instance hosting the table (for example, 'example-instance-id').
 * @param {string} tableId - The ID of the table to delete (for example, 'example-table-id').
 */
async function deleteTable(projectId, instanceId, tableId) {
  const name = `projects/${projectId}/instances/${instanceId}/tables/${tableId}`;

  try {
    const request = {
      name,
    };

    await client.deleteTable(request);
    console.log(`Table deleted successfully: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Table not found: ${name}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Operation rejected, check deletion protection status: ${err.message}`);
    } else {
      console.error(`Unexpected gRPC error occurred: ${err.message}`);
      throw err;
    }
  }
}

module.exports = {deleteTable};
// [END bigtable_v2_bigtabletableadmin_table_delete]
