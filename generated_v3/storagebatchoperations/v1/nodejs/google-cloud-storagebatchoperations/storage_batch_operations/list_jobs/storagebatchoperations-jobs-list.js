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

// [START storagebatchoperations_v1_storagebatchoperations_jobs_list]
'use strict';

const {StorageBatchOperationsClient} = require('@google-cloud/storagebatchoperations');
const {status} = require('@grpc/grpc-js');

const client = new StorageBatchOperationsClient();

/**
 * Lists Storage Batch Operations jobs in a given location.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud location ID. The Storage Batch Operations service requires 'global'.
 */
async function listJobs(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const request = {
      parent,
    };

    const [jobs] = await client.listJobs(request);
    if (!jobs || jobs.length === 0) {
      console.log('No jobs found.');
      return;
    }

    for (const job of jobs) {
      console.log(`Job Name: ${job.name}`);
      console.log(`Job State: ${job.state}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { listJobs };
// [END storagebatchoperations_v1_storagebatchoperations_jobs_list]
