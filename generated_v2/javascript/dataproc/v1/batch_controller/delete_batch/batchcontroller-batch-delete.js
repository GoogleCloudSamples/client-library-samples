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

// [START dataproc_v1_batchcontroller_batch_delete]
'use strict';

const {BatchControllerClient} = require('@google-cloud/dataproc');
const {status} = require('@grpc/grpc-js');

/**
 * Deletes a Dataproc batch workload.
 *
 * @param {string} projectId - Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - Google Cloud region where the batch workload resides (for example, 'us-central1').
 * @param {string} batchId - ID of the batch workload to delete (for example, 'example-batch-id').
 */
async function deleteBatch(projectId, locationId, batchId) {
  // Dataproc regional endpoints must match the location of the resource.
  const client = new BatchControllerClient({
    apiEndpoint: `${locationId}-dataproc.googleapis.com`,
  });

  const name = `projects/${projectId}/locations/${locationId}/batches/${batchId}`;
  const request = {
    name,
  };

  try {
    await client.deleteBatch(request);
    console.log(`Deleted batch workload: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Batch workload not found: ${batchId}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Batch workload must be in a terminal state before deletion: ${err.message}`);
    } else {
      console.error(`Failed to delete batch workload: ${err.message}`);
    }
  }
}

module.exports = { deleteBatch };
// [END dataproc_v1_batchcontroller_batch_delete]
