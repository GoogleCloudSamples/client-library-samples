// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

// [START cloudrun_v2_workerpools_workerpool_create_async]
const {WorkerPoolsClient} = require('@google-cloud/run').v2;
const {status} = require('@grpc/grpc-js');

// Instantiate the client. This is a global variable to be reused across calls.
const client = new WorkerPoolsClient();

/**
 * Creates a new WorkerPool in a given project and location.
 *
 * A WorkerPool is a top-level container that manages a set of configurations
 * and revision templates which implement a pull-based workload. It helps to
 * encapsulate software lifecycle decisions such as rollout policy and team
 * resource ownership for pull-based workloads.
 *
 * @param {string} projectId The Google Cloud Project ID (e.g., 'my-project-id').
 * @param {string} location The Google Cloud region where the WorkerPool will be created (e.g., 'us-central1').
 * @param {string} workerPoolId The unique identifier for the WorkerPool within the project and location (e.g., 'my-worker-pool').
 */
async function createWorkerPool(
  projectId = 'my-project-id',
  location = 'us-central1',
  workerPoolId = 'my-worker-pool',
) {
  const parent = `projects/${projectId}/locations/${location}`;

  // Construct the request for the CreateWorkerPool API call.
  // The workerPoolId is provided separately from the workerPool object,
  // and the workerPool's name will be derived from the parent and workerPoolId.
  const request = {
    parent,
    workerPoolId,
    workerPool: {
      // The name field here is ignored by the API during creation,
      // as it's derived from `parent` and `workerPoolId`.
      description: 'My example worker pool for Node.js sample',
      launchStage: 'BETA', // required since this method is still in beta
      // The template specifies the configuration for the workload.
      template: {
        // Define the containers that will run in this worker pool.
        containers: [
          {
            image: 'us-docker.pkg.dev/cloudrun/container/hello', // A public sample container image.
            // You can add more container configurations here, such as resources, environment variables, etc.
          },
        ],
        // You can also define scaling settings, service account, network settings, etc. here.
      },
      // Other optional fields can be set here, e.g., labels, annotations, scaling.
      // For simplicity, we're using minimal configuration.
    },
  };

  try {
    // Act: Execute the API call to create the WorkerPool.
    // This returns a long-running operation, as WorkerPool creation can take time.
    const [operation] = await client.createWorkerPool(request);
    console.log(`WorkerPool creation operation initiated: ${operation.name}`);

    // Wait for the operation to complete and get the final WorkerPool resource.
    const [workerPool] = await operation.promise();

    // Assert: Print the details of the created WorkerPool.
    console.log(`WorkerPool '${workerPool.name}' created successfully.`);
    console.log(`  Description: ${workerPool.description}`);
    console.log(
      `  Latest created revision: ${workerPool.latestCreatedRevision || 'N/A'}`,
    );
    console.log(
      `  Status: ${workerPool.terminalCondition?.state || 'UNKNOWN'}`,
    );
  } catch (err) {
    // Error Handling: Catch and differentiate common API errors.
    // Check if the error is an 'ALREADY_EXISTS' error.
    if (err.code === status.ALREADY_EXISTS) {
      console.log(
        `WorkerPool '${workerPoolId}' already exists in location '${location}' of project '${projectId}'. ` +
          'Please choose a unique workerPoolId or use the update method if you intend to modify an existing worker pool.',
      );
    } else {
      // For any other unexpected errors, log the full error.
      console.error(`Error creating WorkerPool '${workerPoolId}':`, err);
      // In a production application, you might want to re-throw or handle more gracefully.
    }
  }
}
// [END cloudrun_v2_workerpools_workerpool_create_async]

module.exports = {
  createWorkerPool,
};
