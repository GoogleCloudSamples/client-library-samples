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

// [START cloudrun_v2_workerpools_workerpool_get_async]
const {WorkerPoolsClient} = require('@google-cloud/run').v2;
const {status} = require('@grpc/grpc-js');

const client = new WorkerPoolsClient();

/**
 * Retrieves details of a specific WorkerPool.
 *
 * @param {string} projectId The Google Cloud project ID.
 * @param {string} location The Google Cloud region where the WorkerPool is located.
 * @param {string} workerPoolId The ID of the WorkerPool to retrieve.
 */
async function getWorkerPool(
  projectId = 'your-project-id',
  location = 'us-central1',
  workerPoolId = 'my-worker-pool',
) {
  const name = `projects/${projectId}/locations/${location}/workerPools/${workerPoolId}`;

  const request = {
    name,
  };

  try {
    const [workerPool] = await client.getWorkerPool(request);
    console.log(`Successfully retrieved WorkerPool: ${workerPool.name}`);
    console.log(`  Description: ${workerPool.description || 'N/A'}`);
    console.log(`  UID: ${workerPool.uid}`);
    console.log(
      `  Latest Ready Revision: ${workerPool.latestReadyRevision || 'N/A'}`,
    );
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `WorkerPool ${workerPoolId} not found in location ${location} of project ${projectId}.`,
      );
      console.error(
        'Please ensure the WorkerPool ID and location are correct.',
      );
    } else {
      console.error('Error getting WorkerPool:', err.message);
      // For other errors, re-throw or log more details if necessary.
      // In a real application, you might log the full error stack for debugging.
    }
  }
}
// [END cloudrun_v2_workerpools_workerpool_get_async]

async function main(args) {
  if (args.length !== 3) {
    throw new Error(`3 arguments required but received ${args.length}.`);
  }
  await getWorkerPool(args[0], args[1], args[2]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, provide the following arguments:
 - Google Cloud Project like 'example-project-168'
 - Google Cloud Location like 'us-central1'
 - Worker Pool ID like 'my-worker-pool'

Usage:

 node worker-pools-client-worker-pool-get-async.js example-project-168 us-central1 my-worker-pool
`);
    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}

module.exports = {
  getWorkerPool,
};
