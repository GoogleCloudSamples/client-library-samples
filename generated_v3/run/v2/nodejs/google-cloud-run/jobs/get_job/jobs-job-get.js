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

// [START run_v2_jobs_job_get]
'use strict';

const {JobsClient} = require('@google-cloud/run');
const {status} = require('@grpc/grpc-js');

const client = new JobsClient();

/**
 * Use the getJob method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} jobId - ID of the Job (for example, 'example-job-id')
 */
async function getJob(projectId, locationId, jobId) {
  try {
    const name = client.jobPath(projectId, locationId, jobId);
    const [response] = await client.getJob({name});

    console.log(`Job name: ${response.name}`);
    console.log(`Job UID: ${response.uid}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Job not found: ${projectId}/${locationId}/${jobId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied for job: ${projectId}/${locationId}/${jobId}`);
    } else {
      console.error(`Failed to retrieve job: ${err.message}`);
    }
  }
}

module.exports = { getJob };
// [END run_v2_jobs_job_get]
