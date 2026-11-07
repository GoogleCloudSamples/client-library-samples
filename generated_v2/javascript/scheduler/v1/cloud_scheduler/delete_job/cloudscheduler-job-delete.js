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

// [START cloudscheduler_v1_cloudscheduler_job_delete]
'use strict';

const {CloudSchedulerClient} = require('@google-cloud/scheduler');
const {status} = require('@grpc/grpc-js');

const client = new CloudSchedulerClient();

/**
 * Deletes a Cloud Scheduler job.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} jobId - ID of the Job (for example, 'example-job-id')
 */
async function deleteJob(projectId, locationId, jobId) {
  try {
    const name = client.jobPath(projectId, locationId, jobId);
    const request = {
      name,
    };

    await client.deleteJob(request);
    console.log(`Deleted job: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Job not found: ${jobId}`);
      return;
    }
    console.error(`Failed to delete job: ${err.message}`);
    throw err;
  }
}

module.exports = { deleteJob };
// [END cloudscheduler_v1_cloudscheduler_job_delete]
