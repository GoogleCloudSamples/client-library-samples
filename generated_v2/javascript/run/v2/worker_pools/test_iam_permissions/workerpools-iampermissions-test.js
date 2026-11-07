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

// [START run_v2_workerpools_test_iam_permissions]
'use strict';

const {WorkerPoolsClient} = require('@google-cloud/run');
const {status} = require('@grpc/grpc-js');

const client = new WorkerPoolsClient();

/**
 * Use the testIamPermissions method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the worker pool is located (for example, 'us-central1').
 * @param {string} workerPoolId - The caller-specified identifier of the Cloud Run WorkerPool.
 */
async function testIamPermissions(projectId, locationId, workerPoolId) {
  try {
    const permissions = ['run.workerpools.get', 'run.workerpools.update'];
    const resource = `projects/${projectId}/locations/${locationId}/workerPools/${workerPoolId}`;

    const request = {
      resource,
      permissions,
    };

    const [response] = await client.testIamPermissions(request);
    console.log(`Granted permissions: ${response.permissions ? response.permissions.join(', ') : 'none'}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Worker pool not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { testIamPermissions };
// [END run_v2_workerpools_test_iam_permissions]
