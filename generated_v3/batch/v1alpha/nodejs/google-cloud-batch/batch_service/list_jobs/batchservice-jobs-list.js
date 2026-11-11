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

// [START batch_v1alpha_batchservice_jobs_list]
'use strict';

const {BatchServiceClient} = require('@google-cloud/batch');
const {status} = require('@grpc/grpc-js');

const client = new BatchServiceClient();

/**
 * Lists Batch jobs in a specified region.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region (for example, 'us-central1').
 */
async function listJobs(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;

    const [jobs] = await client.listJobs({
      parent,
    });

    for (const job of jobs) {
      console.log(`Job name: ${job.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while listing jobs: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`Failed to list jobs: ${err.message}`);
    }
  }
}

module.exports = { listJobs };
// [END batch_v1alpha_batchservice_jobs_list]
