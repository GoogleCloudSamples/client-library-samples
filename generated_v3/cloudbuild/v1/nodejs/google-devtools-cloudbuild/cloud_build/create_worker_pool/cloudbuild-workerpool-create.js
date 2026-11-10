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

// [START cloudbuild_v1_cloudbuild_workerpool_create]
'use strict';

const {CloudBuildClient} = require('@google-cloud/cloudbuild');
const {status} = require('@grpc/grpc-js');

const client = new CloudBuildClient();

/**
 * Creates a new Cloud Build worker pool.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} workerPoolId - ID of the WorkerPool (for example, 'example-workerpool-id')
 */
async function createWorkerPool(projectId, locationId, workerPoolId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const workerPool = {
      name: `${parent}/workerPools/${workerPoolId}`,
      privatePoolV1Config: {
        workerConfig: {
          diskSizeGb: 100,
          machineType: 'e2-standard-4',
        },
      },
    };

    const [operation] = await client.createWorkerPool({
      parent,
      workerPool,
      workerPoolId,
    });
    const [response] = await operation.promise();
    console.log(`Created worker pool: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Worker pool already exists: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Operation failed: ${err.message}`);
    }
  }
}

module.exports = { createWorkerPool };
// [END cloudbuild_v1_cloudbuild_workerpool_create]
