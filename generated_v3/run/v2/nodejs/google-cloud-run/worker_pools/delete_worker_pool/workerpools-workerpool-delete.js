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

// [START run_v2_workerpools_workerpool_delete]
'use strict';

const {WorkerPoolsClient} = require('@google-cloud/run');
const {status} = require('@grpc/grpc-js');

const client = new WorkerPoolsClient();

/**
 * Deletes a WorkerPool.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region where the WorkerPool is located (for example, 'us-central1').
 * @param {string} workerPoolId - The unique identifier of the WorkerPool to delete (for example, 'example-worker-pool').
 */
async function deleteWorkerPool(projectId, locationId, workerPoolId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/workerPools/${workerPoolId}`;

    const [operation] = await client.deleteWorkerPool({name});
    await operation.promise();

    console.log(`Deleted worker pool: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`WorkerPool not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
    } else {
      console.error(`Failed to delete worker pool: ${err.message}`);
    }
  }
}

module.exports = { deleteWorkerPool };
// [END run_v2_workerpools_workerpool_delete]
