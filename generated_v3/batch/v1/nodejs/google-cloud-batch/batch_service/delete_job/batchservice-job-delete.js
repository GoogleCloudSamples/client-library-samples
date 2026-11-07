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

// [START batch_v1_batchservice_job_delete]
'use strict';

const {BatchServiceClient} = require('@google-cloud/batch');
const {status} = require('@grpc/grpc-js');

const client = new BatchServiceClient();

/**
 * Use the deleteJob method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the batch job is located (e.g., 'us-central1').
 * @param {string} jobId - The ID of the batch job to delete.
 */
async function deleteJob(projectId, locationId, jobId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/jobs/${jobId}`;
    const request = {
      name,
    };

    const [operation] = await client.deleteJob(request);
    await operation.promise();

    console.log(`Job deleted: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Job not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { deleteJob };
// [END batch_v1_batchservice_job_delete]
