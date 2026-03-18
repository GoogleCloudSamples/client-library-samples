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

// [START cloudrun_v2_workerpools_iampolicy_get_async]
const {WorkerPoolsClient} = require('@google-cloud/run').v2;
const {status} = require('@grpc/grpc-js');

const client = new WorkerPoolsClient();

/**
 * Get the IAM policy for a Cloud Run WorkerPool.
 *
 * This sample demonstrates how to retrieve the Identity and Access Management (IAM)
 * policy associated with a specific Cloud Run WorkerPool. The IAM policy defines
 * who has what permissions for the WorkerPool resource.
 *
 * @param {string} projectId Your Google Cloud Project ID.
 * @param {string} location The Google Cloud region of the WorkerPool (e.g., 'us-central1').
 * @param {string} workerPoolId The ID of the WorkerPool to get the IAM policy for (e.g., 'my-worker-pool').
 */
async function getWorkerPoolIamPolicy(
  projectId = 'your-project-id',
  location = 'us-central1',
  workerPoolId = 'my-worker-pool',
) {
  // Construct the full resource name for the WorkerPool.
  // Example: projects/your-project-id/locations/us-central1/workerPools/my-worker-pool
  const resourceName = client.workerPoolPath(projectId, location, workerPoolId);

  const request = {
    resource: resourceName,
  };

  try {
    // Retrieve the IAM policy for the WorkerPool.
    const [policy] = await client.getIamPolicy(request);

    console.log(`IAM policy for WorkerPool ${workerPoolId}:`);
    console.log(JSON.stringify(policy, null, 2));

    if (policy.bindings && policy.bindings.length > 0) {
      console.log('Bindings:');
      policy.bindings.forEach(binding => {
        console.log(`  Role: ${binding.role}`);
        console.log(`  Members: ${binding.members.join(', ')}`);
      });
    } else {
      console.log('No IAM policy bindings found for this WorkerPool.');
    }
  } catch (err) {
    // Handle specific API errors.
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: WorkerPool '${workerPoolId}' not found in location '${location}' of project '${projectId}'.`,
      );
      console.error(
        'Please ensure the WorkerPool ID and location are correct and the WorkerPool exists.',
      );
    } else {
      // Log other unexpected errors.
      console.error('Error getting IAM policy:', err.message);
    }
  }
}
// [END cloudrun_v2_workerpools_iampolicy_get_async]

async function main(args) {
  if (args.length !== 3) {
    throw new Error(`3 arguments required but received ${args.length}.`);
  }
  await getWorkerPoolIamPolicy(args[0], args[1], args[2]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, provide the following arguments:
 - Google Cloud Project ID like 'your-project-id'
 - Google Cloud Location like 'us-central1'
 - WorkerPool ID like 'my-worker-pool'

Usage:

 node worker-pools-client-iam-policy-get-async.js your-project-id us-central1 my-worker-pool
`);
    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}

module.exports = {
  getWorkerPoolIamPolicy,
};
