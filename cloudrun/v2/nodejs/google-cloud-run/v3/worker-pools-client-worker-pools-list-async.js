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

// [START cloudrun_v2_workerpools_workerpools_list_async]
const {WorkerPoolsClient} = require('@google-cloud/run').v2;
const {status} = require('@grpc/grpc-js');

// The client object should be instantiated as a global variable to avoid
// repeated initialization and connection overhead.
const client = new WorkerPoolsClient();

/**
 * Lists all WorkerPools in a given project and location.
 *
 * WorkerPools are top-level containers that manage configurations and revision templates
 * for pull-based workloads. This sample demonstrates how to retrieve a list of them.
 *
 * @param {string} projectId The Google Cloud Project ID. Example: 'cloud-run-project'
 * @param {string} location The Google Cloud location (e.g., 'us-central1'). Example: 'us-central1'
 */
async function listWorkerPools(
  projectId = 'cloud-run-project',
  location = 'us-central1',
) {
  const parent = `projects/${projectId}/locations/${location}`;

  const request = {
    parent,
    // Optional: Set a page size to limit the number of worker pools returned per API call.
    // pageSize: 10,
    // Optional: Set to true to include deleted (but unexpired) worker pools in the list.
    showDeleted: false,
  };

  try {
    // The client library will automatically handle pagination.
    // `listWorkerPoolsAsync` returns an iterable object that allows async iteration.
    console.log(`Listing WorkerPools in ${parent}...`);
    let workerPoolCount = 0;
    for await (const workerPool of client.listWorkerPoolsAsync(request)) {
      workerPoolCount++;
      console.log(`WorkerPool found: ${workerPool.name}`);
      if (workerPool.description) {
        console.log(`  Description: ${workerPool.description}`);
      }
    }
    if (workerPoolCount === 0) {
      console.log(`No WorkerPools found in ${parent}.`);
    } else {
      console.log(`Successfully listed ${workerPoolCount} WorkerPool(s).`);
    }
  } catch (err) {
    // Check for a specific error type, such as NOT_FOUND, which might occur if the
    // project or location does not exist or is inaccessible.
    if (err && err.code === status.NOT_FOUND) {
      console.error(
        `Error: The specified project or location was not found: ${parent}.`,
      );
      console.error(
        'Please ensure the project ID and location are correct and the service account has the necessary permissions (e.g., roles/run.viewer).',
      );
    } else {
      // Handle other unexpected errors from the API or network.
      console.error(
        `An unexpected error occurred while listing WorkerPools: ${err.message}`,
      );
      // For debugging, you might log the full error object:
      // console.error(err);
    }
  }
}
// [END cloudrun_v2_workerpools_workerpools_list_async]

module.exports = {
  listWorkerPools,
};
