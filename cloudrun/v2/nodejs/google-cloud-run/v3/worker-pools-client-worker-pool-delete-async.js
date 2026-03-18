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

// [START cloudrun_v2_workerpools_workerpool_delete_async]
const {WorkerPoolsClient} = require('@google-cloud/run').v2;
const {status} = require('@grpc/grpc-js');

const client = new WorkerPoolsClient();

/**
 * Deletes a Cloud Run WorkerPool.
 *
 * Deleting a WorkerPool is an asynchronous operation. The method returns a long-running
 * operation that can be polled for completion. If the WorkerPool is not found,
 * the operation will throw a NOT_FOUND error.
 *
 * @param {string} projectId Google Cloud Project ID (e.g., 'my-project-id')
 * @param {string} location Google Cloud Location (e.g., 'us-central1')
 * @param {string} workerPoolId The ID of the WorkerPool to delete (e.g., 'my-worker-pool')
 */
async function deleteWorkerPool(
  projectId = 'my-project-id',
  location = 'us-central1',
  workerPoolId = 'my-worker-pool',
) {
  const name = client.workerPoolPath(projectId, location, workerPoolId);

  const request = {
    name,
  };

  try {
    // Deletes a WorkerPool using a long-running operation.
    // The `deleteWorkerPool` method returns an LRO (Long-Running Operation) object.
    // We await its `promise()` method to get the final result of the deletion.
    const [operation] = await client.deleteWorkerPool(request);
    await operation.promise();
    console.log(`WorkerPool ${name} deleted successfully.`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.log(
        `WorkerPool ${name} not found. It may have already been deleted.`,
      );
    } else {
      console.error(`Error deleting WorkerPool ${name}:`, err.message);
      // For other errors, consider logging the full error object for debugging.
      // console.error(err);
    }
  }
}

// [END cloudrun_v2_workerpools_workerpool_delete_async]

async function main(args) {
  if (args.length !== 3) {
    throw new Error(`3 arguments required but received ${args.length}.`);
  }
  await deleteWorkerPool(args[0], args[1], args[2]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, provide the following arguments:
 - Google Cloud Project ID like 'my-project-id'
 - Google Cloud Location like 'us-central1'
 - WorkerPool ID like 'my-worker-pool'

Usage:

 node worker-pools-client-worker-pool-delete-async.js my-project-id us-central1 my-worker-pool
`);
    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}

module.exports = {
  deleteWorkerPool,
};
