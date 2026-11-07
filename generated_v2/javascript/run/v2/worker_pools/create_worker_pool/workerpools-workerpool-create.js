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

// [START run_v2_workerpools_workerpool_create]
'use strict';

const {WorkerPoolsClient} = require('@google-cloud/run');
const {status} = require('@grpc/grpc-js');

const client = new WorkerPoolsClient();

/**
 * Creates a Cloud Run WorkerPool.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} workerPoolId - ID of the WorkerPool (for example, 'example-workerpool-id')
 */
async function createWorkerPool(projectId, workerPoolId) {
  try {
    const parent = client.locationPath(projectId, 'us-central1');
    const container = {
      image: 'us-docker.pkg.dev/cloudrun/container/hello',
    };
    const workerPool = {
      template: {
        containers: [container],
      },
    };

    const request = {
      parent,
      workerPool,
      workerPoolId,
    };

    const [operation] = await client.createWorkerPool(request);
    const [response] = await operation.promise();

    console.log(`Created worker pool: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Worker pool already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`API error occurred: ${err.message}`);
    }
  }
}

module.exports = { createWorkerPool };
// [END run_v2_workerpools_workerpool_create]
