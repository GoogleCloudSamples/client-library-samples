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

// [START cloudscheduler_v1_cloudscheduler_pause_job]
'use strict';

const {CloudSchedulerClient} = require('@google-cloud/scheduler');
const {status} = require('@grpc/grpc-js');

const client = new CloudSchedulerClient();

/**
 * Use the pauseJob method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} jobId - ID of the Job (for example, 'example-job-id')
 */
async function pauseJob(projectId, locationId, jobId) {
  try {
    // Construct the fully qualified job resource identifier
    const name = client.jobPath(projectId, locationId, jobId);

    const [response] = await client.pauseJob({name});

    console.log(`Job paused: ${response.name}`);
    console.log(`Current state: ${response.state}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Job not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Job precondition failed: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to pause job: ${err.message}`);
    }
  }
}

module.exports = { pauseJob };
// [END cloudscheduler_v1_cloudscheduler_pause_job]
