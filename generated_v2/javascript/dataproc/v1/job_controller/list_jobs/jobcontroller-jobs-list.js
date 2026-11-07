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

// [START dataproc_v1_jobcontroller_jobs_list]
'use strict';

const {JobControllerClient} = require('@google-cloud/dataproc');
const {status} = require('@grpc/grpc-js');

/**
 * Lists Dataproc jobs in a specified project and region.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} region - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function listJobs(projectId, region) {
  const client = new JobControllerClient({
    apiEndpoint: region === 'global' ? 'dataproc.googleapis.com' : `${region}-dataproc.googleapis.com`,
  });

  try {
    const request = {
      projectId,
      region,
    };

    const [jobs] = await client.listJobs(request);

    if (jobs.length === 0) {
      console.log('No jobs found.');
      return;
    }

    for (const job of jobs) {
      console.log(`Job ID: ${job.reference?.jobId}, State: ${job.status?.state}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { listJobs };
// [END dataproc_v1_jobcontroller_jobs_list]
