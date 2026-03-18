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

const {WorkerPoolsClient} = require('@google-cloud/run').v2;
const {status} = require('@grpc/grpc-js');

// [START cloudrun_v2_workerpools_workerpool_update_async]

const client = new WorkerPoolsClient();

/**
 * Updates an existing Cloud Run WorkerPool with a new description.
 *
 * This sample demonstrates how to update a specific field (description) of a
 * WorkerPool using an update mask. The update mask ensures that only the
 * specified fields are modified, leaving other configurations untouched.
 *
 * @param {string} projectId Your Google Cloud Project ID.
 * @param {string} location The Google Cloud region where the WorkerPool is located.
 * @param {string} workerPoolId The ID of the WorkerPool to update.
 * @param {string} newDescription The new description to set for the WorkerPool.
 */
async function updateWorkerPool(
  projectId = 'your-project-id',
  location = 'us-central1',
  workerPoolId = 'my-worker-pool',
  newDescription = 'This is an updated description for my worker pool.',
) {
  const name = client.workerPoolPath(projectId, location, workerPoolId);

  const workerPool = {
    name,
    description: newDescription,
  };

  // The update mask specifies which fields of the WorkerPool will be updated.
  // In this case, only the 'description' field will be modified.
  const request = {
    workerPool,
    updateMask: {
      paths: ['description'],
    },
  };

  try {
    // Initiate the update operation. This returns a long-running operation.
    // The operation's promise will resolve once the update is complete.
    const [operation] = await client.updateWorkerPool(request);
    console.log(`Update WorkerPool operation initiated: ${operation.name}`);

    // Wait for the operation to complete and get the updated WorkerPool.
    const [updatedWorkerPool] = await operation.promise();

    console.log(`WorkerPool ${updatedWorkerPool.name} updated successfully.`);
    console.log(`New description: ${updatedWorkerPool.description}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: WorkerPool '${workerPoolId}' not found in location '${location}' of project '${projectId}'. ` +
          'Please ensure the WorkerPool ID and location are correct. You may need to create the WorkerPool first if it does not exist.',
      );
    } else {
      // Re-throw other errors to be handled by the caller or a global error handler.
      console.error('Error updating WorkerPool:', err);
      throw err;
    }
  }
}
// [END cloudrun_v2_workerpools_workerpool_update_async]

async function main(args) {
  if (args.length !== 4) {
    throw new Error(`4 arguments required but received ${args.length}.`);
  }
  await updateWorkerPool(args[0], args[1], args[2], args[3]);
}
if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, provide the following arguments:
 - Google Cloud Project ID like 'example-project-168'
 - Google Cloud Location like 'us-central1'
 - Worker Pool ID like 'my-worker-pool'
 - New Description like 'This is an updated description.'

Usage:

 node worker-pools-client-worker-pool-update-async.js example-project-168 us-central1 my-worker-pool "This is an updated description."
`);
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}
module.exports = {updateWorkerPool};
