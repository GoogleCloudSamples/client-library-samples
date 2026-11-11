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

// [START cloudscheduler_v1beta1_cloudscheduler_job_get]
'use strict';

const {CloudSchedulerClient} = require('@google-cloud/scheduler');
const {status} = require('@grpc/grpc-js');

const client = new CloudSchedulerClient();

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
    const request = {
      name,
    };

    const [job] = await client.getJob(request);

    console.log(`Job name: ${job.name}`);
    console.log(`Schedule: ${job.schedule}`);
    console.log(`State: ${job.state}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Job does not exist.');
    } else {
      console.error(`Failed to retrieve job: ${err.message}`);
    }
  }
}

module.exports = { getJob };
// [END cloudscheduler_v1beta1_cloudscheduler_job_get]
