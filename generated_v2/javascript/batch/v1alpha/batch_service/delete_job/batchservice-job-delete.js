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

// [START batch_v1alpha_batchservice_job_delete]
'use strict';

const {BatchServiceClient} = require('@google-cloud/batch');
const {status} = require('@grpc/grpc-js');

const client = new BatchServiceClient();

/**
 * Use the deleteJob method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region where the Batch job is located (for example, 'us-central1').
 * @param {string} jobId - The ID of the Batch job to delete. Must be 1 to 63 characters, begin with a lowercase letter, and contain only lowercase letters, numbers, and hyphens ('-'), not ending in a hyphen.
 */
async function deleteJob(projectId, locationId, jobId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/jobs/${jobId}`;
    const request = {
      name,
    };

    // DeleteJob initiates a long-running operation
    const [operation] = await client.deleteJob(request);
    await operation.promise();

    console.log(`Deleted job: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Job ${jobId} not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while deleting job ${jobId}: ${err.message}`);
    } else {
      console.error(`Failed to delete job ${jobId}: ${err.message}`);
    }
  }
}

module.exports = { deleteJob };
// [END batch_v1alpha_batchservice_job_delete]
