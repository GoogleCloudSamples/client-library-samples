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

// [START bigtable_v2_bigtabletableadmin_schemabundle_delete]
'use strict';

const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;
const {status} = require('@grpc/grpc-js');

const client = new BigtableTableAdminClient();

/**
 * Deletes a schema bundle from a Cloud Bigtable table.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} instanceId - ID of the Instance (for example, 'example-instance-id')
 * @param {string} tableId - ID of the Table (for example, 'example-table-id')
 * @param {string} schemaBundleId - ID of the SchemaBundle (for example, 'example-schemabundle-id')
 */
async function deleteSchemaBundle(projectId, instanceId, tableId, schemaBundleId) {
  try {
    const name = `projects/${projectId}/instances/${instanceId}/tables/${tableId}/schemaBundles/${schemaBundleId}`;
    const request = {
      name,
    };

    await client.deleteSchemaBundle(request);
    console.log(`Deleted schema bundle: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Schema bundle not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed when deleting schema bundle: ${err.message}`);
    } else {
      console.error(`Failed to delete schema bundle: ${err.message}`);
    }
  }
}

module.exports = {deleteSchemaBundle};
// [END bigtable_v2_bigtabletableadmin_schemabundle_delete]
