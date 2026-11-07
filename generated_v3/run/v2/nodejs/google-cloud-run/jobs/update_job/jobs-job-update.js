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

// [START run_v2_jobs_job_update]
'use strict';

const {JobsClient} = require('@google-cloud/run');
const {status} = require('@grpc/grpc-js');

const client = new JobsClient();

/**
 * Updates an existing Cloud Run job using a read-modify-write pattern.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Cloud Run region (for example, us-central1).
 * @param {string} jobId - The ID of the Cloud Run Job to update.
 */
async function updateJob(projectId, locationId, jobId) {
  try {
    const name = client.jobPath(projectId, locationId, jobId);

    // Retrieve the existing job to obtain the current configuration and etag
    const [existingJob] = await client.getJob({name});

    // Update fields while preserving the etag for optimistic concurrency control
    const job = existingJob;
    job.labels = Object.assign({}, job.labels, {environment: 'production'});

    // UpdateJob executes as a long-running operation
    const [operation] = await client.updateJob({job});
    const [response] = await operation.promise();

    console.log(`Job updated successfully: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Job ${jobId} not found: ${err.message}`);
    } else if (err.code === status.ABORTED) {
      console.error(`Concurrency conflict updating job ${jobId}: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed for job ${jobId}: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument for job ${jobId}: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { updateJob };
// [END run_v2_jobs_job_update]
