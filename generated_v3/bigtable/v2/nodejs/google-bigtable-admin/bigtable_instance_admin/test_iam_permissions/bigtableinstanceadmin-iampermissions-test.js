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

// [START bigtable_v2_bigtableinstanceadmin_test_iam_permissions]
'use strict';

const {v2} = require('@google-cloud/bigtable');
const {status} = require('@grpc/grpc-js');

const client = new v2.BigtableInstanceAdminClient();

/**
 * Tests IAM permissions on a Cloud Bigtable instance.
 *
 * @param {string} projectId - The ID of the Google Cloud project containing the Bigtable instance.
 * @param {string} instanceId - The ID of the Bigtable instance to test IAM permissions on.
 */
async function testIamPermissions(projectId, instanceId) {
  try {
    const resource = `projects/${projectId}/instances/${instanceId}`;
    const permissions = ['bigtable.instances.get'];

    const [response] = await client.testIamPermissions({
      resource,
      permissions,
    });

    console.log('Granted permissions:', response.permissions);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Bigtable instance not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API error testing IAM permissions: ${err.message}`);
    }
  }
}

module.exports = {testIamPermissions};
// [END bigtable_v2_bigtableinstanceadmin_test_iam_permissions]
