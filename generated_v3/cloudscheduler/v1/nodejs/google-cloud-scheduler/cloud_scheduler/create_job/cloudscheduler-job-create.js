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

// [START cloudscheduler_v1_cloudscheduler_job_create]
'use strict';

const {CloudSchedulerClient} = require('@google-cloud/scheduler');
const {status} = require('@grpc/grpc-js');

const client = new CloudSchedulerClient();

/**
 * Creates a Cloud Scheduler job.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud location ID (for example, 'us-central1').
 */
async function createJob(projectId, locationId) {
  try {
    const parent = client.locationPath(projectId, locationId);
    const job = {
      name: client.jobPath(projectId, locationId, 'scheduled-job'),
      httpTarget: {
        uri: 'https://example.com/ping',
        httpMethod: 'GET',
      },
      schedule: '* * * * *',
      timeZone: 'UTC',
    };

    const [response] = await client.createJob({parent, job});
    console.log(`Created job: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error('Job already exists.');
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied when creating job.');
    } else {
      console.error(`Failed to create job: ${err.message}`);
    }
  }
}

module.exports = { createJob };
// [END cloudscheduler_v1_cloudscheduler_job_create]
