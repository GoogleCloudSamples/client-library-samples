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

// [START batch_v1_batchservice_job_get]
'use strict';

const {BatchServiceClient} = require('@google-cloud/batch');
const {status} = require('@grpc/grpc-js');

const client = new BatchServiceClient();

/**
 * Use the getJob method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the Batch job resides (for example, us-central1).
 * @param {string} jobId - The ID of the Batch job to retrieve. Sourced from a previously created Batch job or ListJobs response. Must be up to 63 lowercase characters, digits, or hyphens, starting with a letter.
 */
async function getJob(projectId, locationId, jobId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/jobs/${jobId}`;
    const [job] = await client.getJob({name});

    console.log(`Retrieved job: ${job.name}`);
    console.log(`Job state: ${job.status?.state}`);
    return job;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Job not found: projects/${projectId}/locations/${locationId}/jobs/${jobId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied when accessing the requested Batch job.');
    } else {
      console.error(`API error retrieving job: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getJob };
// [END batch_v1_batchservice_job_get]
