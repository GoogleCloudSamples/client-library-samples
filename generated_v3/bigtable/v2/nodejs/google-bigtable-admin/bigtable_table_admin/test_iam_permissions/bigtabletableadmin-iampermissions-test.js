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

// [START bigtable_v2_bigtabletableadmin_test_iam_permissions]
'use strict';

const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;
const {status} = require('@grpc/grpc-js');

const client = new BigtableTableAdminClient();

/**
 * Tests caller IAM permissions for a Cloud Bigtable table.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} instanceId - The ID of the Bigtable instance.
 * @param {string} tableId - The ID of the Bigtable table.
 */
async function testIamPermissions(projectId, instanceId, tableId) {
  try {
    const permissions = ['bigtable.tables.get', 'bigtable.tables.readRows'];
    const resource = `projects/${projectId}/instances/${instanceId}/tables/${tableId}`;

    const request = {
      resource,
      permissions,
    };

    const [response] = await client.testIamPermissions(request);
    console.log(`Allowed permissions: ${JSON.stringify(response.permissions)}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = {testIamPermissions};
// [END bigtable_v2_bigtabletableadmin_test_iam_permissions]
