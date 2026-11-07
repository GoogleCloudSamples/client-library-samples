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

// [START run_v2_jobs_job_create]
'use strict';

const {JobsClient} = require('@google-cloud/run');
const {status} = require('@grpc/grpc-js');

const client = new JobsClient();

/**
 * Use the createJob method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} jobId - ID of the Job (for example, 'example-job-id')
 */
async function createJob(projectId, locationId, jobId) {
  try {
    const parent = client.locationPath(projectId, locationId);

    const taskTemplate = {
      containers: [
        {
          image: 'us-docker.pkg.dev/cloudrun/container/job:latest',
        },
      ],
    };

    const executionTemplate = {
      template: taskTemplate,
    };

    const job = {
      template: executionTemplate,
    };

    const request = {
      parent,
      job,
      jobId,
    };

    const [operation] = await client.createJob(request);
    const [response] = await operation.promise();

    console.log(`Created job: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Job ${jobId} already exists.`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied to create job.');
    } else {
      console.error('Failed to create job:', err.message || err);
    }
  }
}

module.exports = { createJob };
// [END run_v2_jobs_job_create]
