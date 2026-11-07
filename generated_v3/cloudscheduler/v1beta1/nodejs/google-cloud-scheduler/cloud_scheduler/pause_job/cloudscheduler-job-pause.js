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

// [START cloudscheduler_v1beta1_cloudscheduler_pause_job]
'use strict';

const {CloudSchedulerClient} = require('@google-cloud/scheduler');
const {status} = require('@grpc/grpc-js');

const client = new CloudSchedulerClient();

/**
 * Pauses an existing Cloud Scheduler job.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region where the job is located (for example, 'us-central1').
 * @param {string} jobId - The ID of the job to pause (for example, 'example-job'). Can contain letters, numbers, hyphens, and underscores, with a maximum length of 500 characters.
 */
async function pauseJob(projectId, locationId, jobId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/jobs/${jobId}`;
    const request = {
      name,
    };

    const [response] = await client.pauseJob(request);
    console.log(`Job paused successfully: ${response.name}`);
    console.log(`Job state: ${response.state}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Job not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Job cannot be paused in its current state: ${err.message}`);
    } else {
      console.error(`API request failed: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { pauseJob };
// [END cloudscheduler_v1beta1_cloudscheduler_pause_job]
