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

// [START run_v2_workerpools_workerpool_update]
'use strict';

const {WorkerPoolsClient} = require('@google-cloud/run');
const {status} = require('@grpc/grpc-js');

const client = new WorkerPoolsClient();

/**
 * Use the updateWorkerPool method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Cloud Run location or region (e.g., us-central1).
 * @param {string} workerPoolId - The identifier of the WorkerPool to update.
 */
async function updateWorkerPool(projectId, locationId, workerPoolId) {
  try {
    const workerPool = {
      name: `projects/${projectId}/locations/${locationId}/workerPools/${workerPoolId}`,
      description: 'Updated worker pool description',
    };
    const updateMask = {
      paths: ['description'],
    };

    const [operation] = await client.updateWorkerPool({
      workerPool,
      updateMask,
    });
    const [response] = await operation.promise();

    console.log(`Updated worker pool: ${response.name}`);
    console.log(`Description: ${response.description}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Worker pool not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
    } else {
      console.error(`RPC failed with status ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { updateWorkerPool };
// [END run_v2_workerpools_workerpool_update]
