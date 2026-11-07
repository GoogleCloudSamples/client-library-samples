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

// [START bigtable_v2_bigtabletableadmin_iampolicy_get]
'use strict';

const {v2} = require('@google-cloud/bigtable');
const {BigtableTableAdminClient} = v2;
const {status} = require('@grpc/grpc-js');

const client = new BigtableTableAdminClient();

/**
 * Retrieves the IAM policy for a Cloud Bigtable table.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} instanceId - The ID of the Bigtable instance.
 * @param {string} tableId - The ID of the Bigtable table.
 */
async function getIamPolicy(projectId, instanceId, tableId) {
  try {
    const resource = `projects/${projectId}/instances/${instanceId}/tables/${tableId}`;

    const request = {
      resource,
    };

    const [policy] = await client.getIamPolicy(request);

    console.log(`Retrieved IAM policy for ${resource}`);
    console.log(`Policy version: ${policy.version}`);
    if (policy.bindings && policy.bindings.length > 0) {
      for (const binding of policy.bindings) {
        console.log(`Role: ${binding.role}`);
        if (binding.members) {
          console.log(`Members: ${binding.members.join(', ')}`);
        }
      }
    } else {
      console.log('No IAM bindings found on the resource.');
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API operation failed with status code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = {getIamPolicy};
// [END bigtable_v2_bigtabletableadmin_iampolicy_get]
