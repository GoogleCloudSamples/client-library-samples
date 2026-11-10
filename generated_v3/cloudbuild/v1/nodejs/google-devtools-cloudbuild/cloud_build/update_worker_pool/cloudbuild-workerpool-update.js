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

// [START cloudbuild_v1_cloudbuild_workerpool_update]
'use strict';

const {CloudBuildClient} = require('@google-cloud/cloudbuild');
const {status} = require('@grpc/grpc-js');

const client = new CloudBuildClient();

/**
 * Use the updateWorkerPool method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} workerPoolId - ID of the WorkerPool (for example, 'example-workerpool-id')
 */
async function updateWorkerPool(projectId, locationId, workerPoolId) {
  try {
    const workerPool = {
      name: client.workerPoolPath(projectId, locationId, workerPoolId),
      displayName: 'Updated Worker Pool',
    };

    const request = {
      workerPool,
      updateMask: {
        paths: ['display_name'],
      },
    };

    const [operation] = await client.updateWorkerPool(request);
    const [response] = await operation.promise();

    console.log(`Updated worker pool name: ${response.name}`);
    console.log(`Updated worker pool display name: ${response.displayName}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Worker pool resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument supplied: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`Google API Error [Code ${err.code}]: ${err.message}`);
    } else {
      console.error('An unexpected error occurred:', err);
    }
  }
}

module.exports = { updateWorkerPool };
// [END cloudbuild_v1_cloudbuild_workerpool_update]
