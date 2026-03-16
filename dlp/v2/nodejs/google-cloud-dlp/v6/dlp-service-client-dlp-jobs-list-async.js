// Copyright 2025 Google LLC
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

// [START dlp_v2_dlpservice_dlpjobs_list_async]
const {DlpServiceClient} = require('@google-cloud/dlp').v2;
const {status} = require('@grpc/grpc-js');

const client = new DlpServiceClient();

/**
 * Lists all DLP jobs for a given project and location.
 *
 * DLP jobs can be used to inspect storage or calculate risk metrics.
 *
 * @param {string} projectId The Google Cloud Project ID.
 * @param {string} location The Google Cloud location (e.g., 'global', 'us-central1').
 * @returns {void}
 */
async function listDlpJobs(projectId, location) {
  const parent = `projects/${projectId}/locations/${location}`;

  const request = {
    parent,
  };

  try {
    const [jobs] = await client.listDlpJobs(request);

    if (jobs && jobs.length > 0) {
      console.log(`DLP Jobs in ${parent}:`);
      for (const job of jobs) {
        console.log(`  Job Name: ${job.name}`);
        console.log(`  Job Type: ${job.type}`);
        console.log(`  Job State: ${job.state}`);
        if (job.createTime) {
          const createTime = new Date(
            job.createTime.seconds * 1000 + job.createTime.nanos / 1000000,
          );
          console.log(`  Create Time: ${createTime}`);
        }
      }
    } else {
      console.log(`No DLP jobs found in ${parent}.`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: The specified parent resource '${parent}' was not found.`,
      );
      console.error('Please ensure the project ID and location are correct.');
      process.exitCode = 1;
    } else {
      console.error('Error listing DLP jobs:', err.message);
      process.exitCode = 1;
    }
  }
}
// [END dlp_v2_dlpservice_dlpjobs_list_async]

async function main(args) {
  if (args.length !== 2) {
    throw new Error(`Expected 2 arguments, got ${args.length}.`);
  }
  const projectId = args[0];
  const location = args[1];
  await listDlpJobs(projectId, location);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify two arguments:
 - Google Cloud Project like 'example-project-id'
 - Google Cloud Location like 'global'
Usage:
 node dlp-service-client-dlp-jobs-list-async.js example-project-id global
`);

    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  listDlpJobs,
};
