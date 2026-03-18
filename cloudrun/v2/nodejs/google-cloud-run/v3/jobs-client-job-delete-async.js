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

// [START cloudrun_v2_jobs_job_delete_async]
const {JobsClient} = require('@google-cloud/run').v2;
const {status} = require('@grpc/grpc-js');

// Instantiate the client. It's a good practice to instantiate clients outside
// of the function if they are used multiple times, to avoid repeated setup.
const client = new JobsClient();

/**
 * Deletes a Cloud Run job.
 *
 * This function demonstrates how to delete a Cloud Run job using the
 * `@google-cloud/run` client library. It handles potential `NOT_FOUND` errors
 * gracefully.
 *
 * @param {string} projectId The Google Cloud Project ID. Example: 'my-project-id'
 * @param {string} location The Google Cloud region where the job is located. Example: 'us-central1'
 * @param {string} jobId The ID of the job to delete. Example: 'my-job-to-delete'
 */
async function deleteJob(projectId, location, jobId) {
  const name = `projects/${projectId}/locations/${location}/jobs/${jobId}`;

  const request = {
    name,
    // Set to true to validate the request without performing the actual deletion.
    // For this example, we want to perform the deletion, so it's false.
    validateOnly: false,
    // Optional: A system-generated fingerprint for this version of the resource.
    // May be used to detect modification conflict during updates.
    // etag: 'some-etag-value',
  };

  try {
    // The deleteJob method returns a long-running operation.
    // Await the operation's promise to ensure the deletion process completes.
    const [operation] = await client.deleteJob(request);
    const [job] = await operation.promise();

    console.log(`Job '${job.name}' deleted successfully.`);
  } catch (err) {
    // Check if the error is a NOT_FOUND error, indicating the job doesn't exist.
    if (err.code === status.NOT_FOUND) {
      console.log(
        `Job '${jobId}' not found in location '${location}' of project '${projectId}'. ` +
          'It might have already been deleted or the name is incorrect.',
      );
    } else {
      console.error('Error deleting job:', err);
      // For other types of errors (e.g., PERMISSION_DENIED, INVALID_ARGUMENT),
      // a real application would likely log the error and potentially re-throw
      // or handle it based on the application's specific requirements.
    }
  }
}
// [END cloudrun_v2_jobs_job_delete_async]

async function main(args) {
  if (args.length !== 3) {
    throw new Error(`3 arguments required but received ${args.length}.`);
  }
  await deleteJob(args[0], args[1], args[2]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, provide the following arguments:
 - Google Cloud Project ID like 'my-project-id'
 - Google Cloud Location like 'us-central1'
 - Job ID like 'my-job-to-delete'

Usage:

 node jobs-client-job-delete-async.js my-project-id us-central1 my-job-to-delete
`);
    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}

module.exports = {
  deleteJob,
};
