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

// [START run_v2_workerpools_workerpools_list]
'use strict';

const {WorkerPoolsClient} = require('@google-cloud/run');
const {status} = require('@grpc/grpc-js');

const client = new WorkerPoolsClient();

/**
 * Lists Cloud Run worker pools in a specified location.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region to list worker pools in (for example, 'us-central1'). Location cannot be the '-' wildcard.
 */
async function listWorkerPools(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const request = {
      parent,
    };

    const [workerPools] = await client.listWorkerPools(request);

    for (const workerPool of workerPools) {
      console.log(`Worker Pool: ${workerPool.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Location or project not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { listWorkerPools };
// [END run_v2_workerpools_workerpools_list]
