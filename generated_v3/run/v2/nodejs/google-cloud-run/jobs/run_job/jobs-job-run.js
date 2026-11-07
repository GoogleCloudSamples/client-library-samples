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

// [START run_v2_jobs_run_job]
'use strict';

const {JobsClient} = require('@google-cloud/run');
const {status} = require('@grpc/grpc-js');

const client = new JobsClient();

/**
 * Use the runJob method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} jobId - ID of the Job (for example, 'example-job-id')
 */
async function runJob(projectId, locationId, jobId) {
  try {
    const name = client.jobPath(projectId, locationId, jobId);

    const request = {
      name,
    };

    // Initiates the job execution and waits for completion
    const [operation] = await client.runJob(request);
    const [response] = await operation.promise();

    console.log(`Execution completed: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Job resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while accessing job: ${err.message}`);
    } else {
      console.error(`Failed to run job: ${err.message}`);
    }
  }
}

module.exports = { runJob };
// [END run_v2_jobs_run_job]
