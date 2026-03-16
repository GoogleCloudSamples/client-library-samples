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

// [START dlp_v2_dlpservice_dlpjob_get_async]
const {DlpServiceClient} = require('@google-cloud/dlp').v2;
const {status} = require('@grpc/grpc-js');

const dlp = new DlpServiceClient();

/**
 * Gets the latest state of a long-running DlpJob.
 *
 * This method retrieves the current status and details of a specified DLP job.
 * DLP jobs can be inspection jobs (scanning storage for sensitive data) or
 * risk analysis jobs (calculating re-identification risk metrics).
 *
 * @param {string} projectId The Google Cloud Project ID to use as a parent resource.
 * @param {string} location The Google Cloud location (e.g., 'global', 'us-central1') of the job.
 * @param {string} jobName The name of the DLP job to retrieve (e.g., 'i-1234567890').
 */
async function getDlpJob(projectId, location, jobName) {
  const name = `projects/${projectId}/locations/${location}/dlpJobs/${jobName}`;

  const request = {
    name,
  };

  try {
    const [job] = await dlp.getDlpJob(request);

    console.log(`DLP Job ${job.name} details:`);
    console.log(`State: ${job.state}`);
    console.log(`Type: ${job.type}`);
    if (job.createTime) {
      const createTime = new Date(
        job.createTime.seconds * 1000 + job.createTime.nanos / 1000000,
      );
      console.log(`Created: ${createTime}`);
    }
    if (job.errors && job.errors.length > 0) {
      console.log('Errors:');
      job.errors.forEach(error => {
        console.log(`  Code: ${error.details?.code}`);
        console.log(`  Message: ${error.details?.message}`);
      });
    }
    if (job.inspectDetails) {
      const inspectDetails = job.inspectDetails;
      console.log('Inspect Details:');
      console.log(
        `  Processed Bytes: ${inspectDetails.result?.processedBytes}`,
      );
      console.log(
        `  Total Estimated Bytes: ${inspectDetails.result?.totalEstimatedBytes}`,
      );
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `DLP Job ${jobName} not found in location ${location} of project ${projectId}.`,
      );
      console.error(
        'Please ensure the job name and location are correct and the job exists.',
      );
    } else {
      console.error(`Error getting DLP job ${jobName}:`, err);
    }
  }
}
// [END dlp_v2_dlpservice_dlpjob_get_async]

async function main(args) {
  if (args.length !== 3) {
    throw new Error(`Expected 3 arguments, got ${args.length}.`);
  }
  const projectId = args[0];
  const location = args[1];
  const dlpJobName = args[2];
  await getDlpJob(projectId, location, dlpJobName);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify three arguments:
 - Google Cloud Project like 'my-project-id'
 - Google Cloud Location like 'global'
 - DLP Job name like 'i-1234567890'
Usage:
 node dlp-service-client-dlp-job-get-async.js my-project-id global i-1234567890
`);

    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  getDlpJob,
};
