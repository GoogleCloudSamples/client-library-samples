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

// [START cloudscheduler_v1_cloudscheduler_jobs_list]
'use strict';

const {CloudSchedulerClient} = require('@google-cloud/scheduler');
const {status} = require('@grpc/grpc-js');

const client = new CloudSchedulerClient();

/**
 * Use the listJobs method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function listJobs(projectId, locationId) {
  try {
    const parent = client.locationPath(projectId, locationId);
    const [jobs] = await client.listJobs({parent});

    for (const job of jobs) {
      console.log(`Job Name: ${job.name}`);
      console.log(`Schedule: ${job.schedule}`);
      console.log(`State: ${job.state}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Specified location not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`RPC error [${err.code}]: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { listJobs };
// [END cloudscheduler_v1_cloudscheduler_jobs_list]
