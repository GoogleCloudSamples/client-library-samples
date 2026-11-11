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

// [START batch_v1_batchservice_job_cancel]
'use strict';

const {BatchServiceClient} = require('@google-cloud/batch');
const {status} = require('@grpc/grpc-js');

const client = new BatchServiceClient();

/**
 * Use the cancelJob method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the Batch job is located, such as 'us-central1'.
 * @param {string} jobId - The ID of the Batch job to cancel. Must contain 1-63 lowercase alphanumeric characters or hyphens, starting with a letter and not ending with a hyphen.
 */
async function cancelJob(projectId, locationId, jobId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/jobs/${jobId}`;

    const [operation] = await client.cancelJob({name});
    console.log(`Cancellation initiated for job: ${name}`);

    await operation.promise();
    console.log(`Successfully cancelled job: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Job not found: ${jobId}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Job cannot be cancelled in its current state: ${jobId}`);
    } else {
      console.error(`Failed to cancel job: ${err.message}`);
    }
  }
}

module.exports = { cancelJob };
// [END batch_v1_batchservice_job_cancel]
