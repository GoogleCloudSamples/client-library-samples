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

// [START batch_v1_batchservice_job_create]
'use strict';

const {BatchServiceClient} = require('@google-cloud/batch');
const {status} = require('@grpc/grpc-js');

const client = new BatchServiceClient();

/**
 * Use the createJob method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 */
async function createJob(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const jobId = `example-job-${Date.now()}`;

    const runnable = {
      script: {
        commands: ['echo Hello world!'],
      },
    };

    const taskGroup = {
      taskCount: 1,
      taskSpec: {
        runnables: [runnable],
      },
    };

    const job = {
      taskGroups: [taskGroup],
      logsPolicy: {
        destination: 'CLOUD_LOGGING',
      },
    };

    const request = {
      parent,
      jobId,
      job,
    };

    const [response] = await client.createJob(request);
    console.log(`Job created: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Job already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { createJob };
// [END batch_v1_batchservice_job_create]
