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

// [START batch_v1alpha_batchservice_job_cancel]
'use strict';

const {BatchServiceClient} = require('@google-cloud/batch');
const {status} = require('@grpc/grpc-js');

const client = new BatchServiceClient();

/**
 * Cancels a Batch job.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the Batch job was created (for example, 'us-central1').
 * @param {string} jobId - The unique identifier of the Job. Can be caller-specified or server-generated at creation time.
 */
async function cancelJob(projectId, locationId, jobId) {
  const name = `projects/${projectId}/locations/${locationId}/jobs/${jobId}`;

  try {
    const [operation] = await client.cancelJob({name});
    console.log(`Job cancellation operation started: ${operation.name}`);

    // Wait for the long-running operation to complete
    const [response] = await operation.promise();
    console.log(`Job cancelled successfully: ${name}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Job not found: ${name}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Job cannot be cancelled in current state: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`Google API error [${err.code}]: ${err.message}`);
    } else {
      console.error(`Unexpected error cancelling job: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { cancelJob };
// [END batch_v1alpha_batchservice_job_cancel]
