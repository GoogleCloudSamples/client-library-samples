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

// [START cloudrun_v2_jobs_job_create_async]
const {JobsClient} = require('@google-cloud/run').v2;
const {status} = require('@grpc/grpc-js');

// The client is instantiated as a global variable, as it is thread-safe.
// This ensures that the client is reused across multiple invocations, reducing overhead.
const client = new JobsClient();

/**
 * Creates a new Cloud Run job. A Cloud Run job executes a container image to completion.
 *
 * This sample demonstrates how to create a basic Cloud Run job with a specified container image.
 * It configures the job to run a simple container from Google Container Registry.
 *
 * @param {string} projectId The Google Cloud project ID (e.g., 'my-project-id').
 * @param {string} location The Google Cloud region where the job will be created (e.g., 'us-central1').
 * @param {string} jobId The unique identifier for the new job (e.g., 'my-nodejs-job').
 */
async function createJob(projectId, location, jobId) {
  // Construct the parent path for the job.
  const parent = `projects/${projectId}/locations/${location}`;

  // Define the job configuration.
  // This example creates a simple job that runs a container image.
  const job = {
    template: {
      template: {
        containers: [
          {
            image: 'us-docker.pkg.dev/cloudrun/container/job',
            // You can specify other container properties here, e.g., command, args, env, resources.
            // For example, to pass arguments:
            // args: ['--name', 'World'],
          },
        ],
        // You can specify other task template properties here, e.g., serviceAccountName, volumes.
      },
      // You can specify other execution template properties here, e.g., taskCount, parallelism.
    },
    // You can specify other job properties here, e.g., labels, annotations, binaryAuthorization.
  };

  const request = {
    parent,
    job,
    jobId,
  };

  try {
    // Creates a Job using a long-running operation.
    // The operation.promise() waits for the job creation to complete.
    const [operation] = await client.createJob(request);
    const [response] = await operation.promise();
    console.log(`Job ${response.name} created successfully.`);
    console.log(`  Job ID: ${response.uid}`);
    console.log(`  Image: ${response.template.template.containers[0].image}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.log(
        `Job '${jobId}' already exists in location '${location}' of project '${projectId}'.`,
      );
    } else {
      console.error('Error creating job:', err);
      // For other errors, log the full error for debugging purposes.
      // In a production environment, consider more specific error handling based on err.code.
    }
  }
}

// [END cloudrun_v2_jobs_job_create_async]

module.exports = {
  createJob,
};
