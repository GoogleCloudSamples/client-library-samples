// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

// [START cloudrun_v2_jobs_job_update_async]
const {JobsClient} = require('@google-cloud/run').v2;
const {status} = require('@grpc/grpc-js');

// Instantiate the client.
const client = new JobsClient();

/**
 * Updates a Cloud Run job's container image.
 *
 * This sample demonstrates how to update an existing Cloud Run job by changing
 * the container image used by its first container. The `updateJob` method
 * is a long-running operation, so the sample waits for the operation to complete
 * before returning the updated job details.
 *
 * @param {string} projectId Your Google Cloud Project ID (e.g., 'my-project-id').
 * @param {string} locationId The region ID where the job is located (e.g., 'us-central1').
 * @param {string} jobId The ID of the job to update (e.g., 'my-job').
 * @param {string} newImage The new container image URL to deploy (e.g., 'gcr.io/cloudrun/hello:latest').
 */
async function updateJob(projectId, locationId, jobId, newImage) {
  // Construct the full resource name for the job.
  const jobName = client.jobPath(projectId, locationId, jobId);

  // Define the updated job object.
  // Only specify the fields that need to be updated. When updating a repeated
  // field like 'containers', you generally provide the entire updated list.
  // In this example, we assume we are updating the first container's image.
  const updatedJob = {
    name: jobName,
    template: {
      template: {
        containers: [
          {
            image: newImage,
          },
        ],
      },
    },
  };

  // The update mask specifies which fields of the Job are being updated.
  // It's crucial for partial updates to avoid unintended side effects.
  // Here, we are updating the 'containers' field within the job template.
  const updateMask = {
    paths: ['template.template.containers'],
  };

  const request = {
    job: updatedJob,
    updateMask,
  };

  try {
    // The updateJob method returns a long-running operation.
    // We await the operation to ensure the update is complete.
    const [operation] = await client.updateJob(request);
    const [job] = await operation.promise();

    console.log(`Job ${job.name} updated successfully.`);
    console.log(
      `New container image: ${job.template.template.containers[0].image}`,
    );
  } catch (err) {
    // Handle specific API errors.
    // The 'status' object from '@grpc/grpc-js' provides gRPC status codes.
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Job '${jobId}' not found in location '${locationId}' for project '${projectId}'. ` +
          'Please ensure the job name and location are correct and the job exists.',
      );
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(
        `Error: Invalid argument provided for job update. Details: ${err.message}. ` +
          'Please check the provided job configuration and parameters.',
      );
    } else {
      // Log any other unexpected errors.
      console.error('Failed to update job:', err);
    }
  }
}
// [END cloudrun_v2_jobs_job_update_async]

async function main(args) {
  if (args.length !== 4) {
    throw new Error(`4 arguments required but received ${args.length}.`);
  }
  await updateJob(args[0], args[1], args[2], args[3]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, provide the following arguments:
 - Google Cloud Project ID like 'my-project-id'
 - Google Cloud Location like 'us-central1'
 - Job ID like 'my-job'
 - New container image URL like 'gcr.io/cloudrun/hello:latest'

Usage:

 node jobs-client-job-update-async.js my-project-id us-central1 my-job gcr.io/cloudrun/hello:latest
`);
    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}

module.exports = {
  updateJob,
};
