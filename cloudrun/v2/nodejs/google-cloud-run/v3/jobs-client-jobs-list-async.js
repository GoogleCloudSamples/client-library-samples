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

// [START cloudrun_v2_jobs_jobs_list_async]
const {JobsClient} = require('@google-cloud/run').v2;
const {status} = require('@grpc/grpc-js'); // For error handling

// Instantiate the JobsClient. This client is used to interact with the Cloud Run Jobs API.
// It's recommended to instantiate the client outside of the function to avoid
// recreating it on every call, which can impact performance and resource usage.
const client = new JobsClient();

/**
 * Lists all Cloud Run jobs in a given project and location.
 *
 * This sample demonstrates how to list existing jobs using the `listJobs` method.
 * It iterates through the results and prints key details for each job.
 *
 * @param {string} projectId Your Google Cloud Project ID.
 * @param {string} location The Google Cloud location (e.g., 'us-central1') where jobs are deployed.
 */
async function listJobs(projectId, location) {
  // Construct the full parent path for the request.
  // This path identifies the project and location where jobs are to be listed.
  const parent = `projects/${projectId}/locations/${location}`;

  const request = {
    parent,
  };

  try {
    // Call the listJobs method to retrieve the jobs.
    // The API returns a promise that resolves to an array containing:
    // 1. An array of Job objects.
    // 2. The request object used for the next page (null if no more pages).
    // 3. The raw response object.
    const [jobs] = await client.listJobs(request);

    if (jobs.length === 0) {
      console.log(
        `No jobs found in project ${projectId} at location ${location}.`,
      );
      return;
    }

    console.log(`Jobs in project ${projectId}, location ${location}:`);
    for (const job of jobs) {
      console.log(`- Job Name: ${job.name}`);
      console.log(`  Creation Time: ${job.createTime}`);
      if (job.latestCreatedExecution && job.latestCreatedExecution.name) {
        console.log(`  Latest Execution: ${job.latestCreatedExecution.name}`);
      } else {
        console.log('  No latest execution found.');
      }
    }
  } catch (err) {
    // Handle specific API errors.
    // For example, if the specified location does not exist or is invalid.
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: The specified project (${projectId}) or location (${location}) was not found or is invalid.`,
      );
      console.error('Please ensure the project ID and location are correct.');
    } else {
      // Log other unexpected errors.
      console.error('Failed to list jobs:', err);
    }
  }
}
// [END cloudrun_v2_jobs_jobs_list_async]

async function main(args) {
  if (args.length !== 2) {
    throw new Error(`2 arguments required but received ${args.length}.`);
  }
  await listJobs(args[0], args[1]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, provide the following arguments:
 - Google Cloud Project ID like 'my-project-id'
 - Google Cloud Location like 'us-central1'

Usage:

 node jobs-client-jobs-list-async.js my-project-id us-central1
`);
    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}

module.exports = {
  listJobs,
};
