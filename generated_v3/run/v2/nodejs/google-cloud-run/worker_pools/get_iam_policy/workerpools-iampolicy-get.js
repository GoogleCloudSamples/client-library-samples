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

// [START run_v2_workerpools_iampolicy_get]
'use strict';

const {WorkerPoolsClient} = require('@google-cloud/run');
const {status} = require('@grpc/grpc-js');

const client = new WorkerPoolsClient();

/**
 * Use the getIamPolicy method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the WorkerPool is located (e.g., 'us-central1').
 * @param {string} workerPoolId - The identifier of the WorkerPool. Must begin with a letter, cannot end with a hyphen, and must contain fewer than 50 characters.
 */
async function getIamPolicy(projectId, locationId, workerPoolId) {
  try {
    const resource = `projects/${projectId}/locations/${locationId}/workerPools/${workerPoolId}`;

    const [policy] = await client.getIamPolicy({resource});

    console.log(`Retrieved IAM policy for: ${resource}`);
    console.log('Policy version:', policy.version);
    console.log('Policy bindings:', JSON.stringify(policy.bindings, null, 2));

    return policy;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`WorkerPool resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing IAM policy: ${err.message}`);
    } else {
      console.error(`Failed to get IAM policy: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getIamPolicy };
// [END run_v2_workerpools_iampolicy_get]
