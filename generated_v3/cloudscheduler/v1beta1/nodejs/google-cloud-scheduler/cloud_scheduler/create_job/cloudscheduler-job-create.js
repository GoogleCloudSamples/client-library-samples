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

// [START cloudscheduler_v1beta1_cloudscheduler_job_create]
'use strict';

const {CloudSchedulerClient} = require('@google-cloud/scheduler');
const {status} = require('@grpc/grpc-js');

const client = new CloudSchedulerClient();

/**
 * Creates a scheduled job using Cloud Scheduler.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1').
 */
async function createJob(projectId, locationId) {
  try {
    // Construct the parent resource path from the project and location identifiers.
    const parent = client.locationPath(projectId, locationId);

    // Define the scheduled job configuration.
    const job = {
      description: 'Scheduled job created via Cloud Scheduler API',
      schedule: '* * * * *',
      timeZone: 'UTC',
      httpTarget: {
        uri: 'https://example.com/ping',
        httpMethod: 'GET',
      },
    };

    const request = {
      parent,
      job,
    };

    const [response] = await client.createJob(request);
    console.log(`Created job: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Job already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid job configuration: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while creating job: ${err.message}`);
    } else {
      console.error(`Failed to create job: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createJob };
// [END cloudscheduler_v1beta1_cloudscheduler_job_create]
