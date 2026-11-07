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

// [START dataproc_v1_batchcontroller_batches_list]
'use strict';

const {BatchControllerClient} = require('@google-cloud/dataproc');
const {status} = require('@grpc/grpc-js');

/**
 * Lists Dataproc batches in a specified project and location.
 *
 * @param {string} projectId - Google Cloud project ID.
 * @param {string} locationId - Dataproc region or location ID (for example, "us-central1").
 */
async function listBatches(projectId, locationId) {
  try {
    const client = new BatchControllerClient({
      apiEndpoint: `${locationId}-dataproc.googleapis.com`,
    });

    const parent = `projects/${projectId}/locations/${locationId}`;

    const [batches] = await client.listBatches({parent});

    for (const batch of batches) {
      console.log(`Batch name: ${batch.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Parent collection not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while accessing batches: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to list batches: ${err.message}`);
    }
  }
}

module.exports = {listBatches};
// [END dataproc_v1_batchcontroller_batches_list]
