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

// [START dataproc_v1_batchcontroller_batch_get]
'use strict';

const {BatchControllerClient} = require('@google-cloud/dataproc');
const {status} = require('@grpc/grpc-js');

/**
 * Retrieves a Dataproc batch workload.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} dataprocRegionId - ID of the Dataproc region (for example, 'us-central1')
 * @param {string} batchId - ID of the Batch (for example, 'example-batch-id')
 */
async function getBatch(projectId, dataprocRegionId, batchId) {
  const client = new BatchControllerClient({
    apiEndpoint: `${dataprocRegionId}-dataproc.googleapis.com`,
  });

  const name = client.batchPath(projectId, dataprocRegionId, batchId);

  try {
    const request = {
      name,
    };

    const [response] = await client.getBatch(request);
    console.log(`Batch name: ${response.name}`);
    console.log(`Batch state: ${response.state}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Batch resource not found.');
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied accessing batch resource.');
    } else {
      console.error(`Error retrieving batch: ${err.message}`);
    }
  }
}

module.exports = {getBatch};
// [END dataproc_v1_batchcontroller_batch_get]
