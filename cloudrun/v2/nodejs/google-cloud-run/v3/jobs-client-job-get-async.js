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

// [START cloudrun_v2_jobs_job_get_async]
const {JobsClient} = require('@google-cloud/run').v2;
const {status} = require('@grpc/grpc-js');

const client = new JobsClient();

/**
 * Get information about a Cloud Run job.
 *
 * @param {string} projectId The Google Cloud project ID.
 * @param {string} location The location of the job.
 * @param {string} jobName The name of the job to retrieve.
 */
async function getJob(
  projectId = 'your-project-id',
  location = 'us-central1',
  jobName = 'my-job',
) {
  const name = client.jobPath(projectId, location, jobName);

  const request = {
    name,
  };

  try {
    const [job] = await client.getJob(request);
    console.log(`Successfully retrieved job: ${job.name}`);
    console.log(`  UID: ${job.uid}`);
    if (
      job.template &&
      job.template.containers &&
      job.template.containers.length > 0
    ) {
      console.log(`  Container Image: ${job.template.containers[0].image}`);
    }
    console.log(`  Reconciling: ${job.reconciling}`);
    if (job.terminalCondition) {
      console.log(
        `  Terminal Condition Status: ${job.terminalCondition.state}`,
      );
      if (job.terminalCondition.message) {
        console.log(
          `  Terminal Condition Message: ${job.terminalCondition.message}`,
        );
      }
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Job ${jobName} not found in location ${location} of project ${projectId}.`,
      );
      console.error('Please ensure the job name and location are correct.');
    } else {
      console.error(`Error getting job ${jobName}:`, err);
    }
  }
}
// [END cloudrun_v2_jobs_job_get_async]

async function main(args) {
  if (args.length !== 3) {
    throw new Error(`3 arguments required but received ${args.length}.`);
  }
  await getJob(args[0], args[1], args[2]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, provide the following arguments:
 - Google Cloud Project ID like 'my-project-id'
 - Google Cloud Location like 'us-central1'
 - Job Name like 'my-job'

Usage:

 node jobs-client-job-get-async.js my-project-id us-central1 my-job
`);
    process.exitCode = 1;
  });

  main(process.argv.slice(2)).catch(err => {
    console.error(`Error running sample: ${err.message}`);
    process.exitCode = 1;
  });
}

module.exports = {
  getJob,
};
