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

// [START cloudbuild_v1_cloudbuild_workerpool_get]
'use strict';

const {CloudBuildClient} = require('@google-cloud/cloudbuild');
const {status} = require('@grpc/grpc-js');

/**
 * Retrieves an existing worker pool in Google Cloud Build.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1').
 * @param {string} workerPoolId - ID of the worker pool (for example, 'example-workerpool-id').
 */
async function getWorkerPool(projectId, locationId, workerPoolId) {
  // Cloud Build worker pools are regional resources. Initialize the client with the regional endpoint.
  const client = new CloudBuildClient({
    apiEndpoint: `${locationId}-cloudbuild.googleapis.com`,
  });

  try {
    const name = client.workerPoolPath(projectId, locationId, workerPoolId);

    const [workerPool] = await client.getWorkerPool({name});

    console.log(`Retrieved worker pool: ${workerPool.name}`);
    console.log(`State: ${workerPool.state}`);
    return workerPool;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Worker pool not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API request failed: ${err.message}`);
    }
  }
}

module.exports = {getWorkerPool};
// [END cloudbuild_v1_cloudbuild_workerpool_get]
