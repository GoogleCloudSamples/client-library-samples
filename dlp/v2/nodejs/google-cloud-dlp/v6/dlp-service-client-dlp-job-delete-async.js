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

// [START dlp_v2_dlpservice_dlpjob_delete_async]
const {DlpServiceClient} = require('@google-cloud/dlp').v2;
const {status} = require('@grpc/grpc-js');

const dlp = new DlpServiceClient();

/**
 * Deletes a long-running DLP job. This method indicates that the client is
 * no longer interested in the DlpJob result. The job will be canceled if
 * possible.
 *
 * @param {string} projectId The Google Cloud project ID (e.g., 'my-project-id').
 * @param {string} locationId The location of the DLP job (e.g., 'global', 'us-central1').
 * @param {string} jobId The ID of the DLP job to delete (e.g., 'i-1234567890').
 */
async function deleteDlpJob(projectId, locationId, jobId) {
  const name = `projects/${projectId}/locations/${locationId}/dlpJobs/${jobId}`;

  const request = {
    name,
  };

  try {
    await dlp.deleteDlpJob(request);
    console.log(`Successfully deleted DLP job: ${jobId}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.log(
        `DLP job ${jobId} not found in location ${locationId} of project ${projectId}. ` +
          'It may have already been deleted or the name is incorrect.',
      );
    } else {
      console.error(`Error deleting DLP job ${jobId}:`, err.message);
      throw err;
    }
  }
}
// [END dlp_v2_dlpservice_dlpjob_delete_async]

async function main(args) {
  if (args.length !== 3) {
    throw new Error(`Expected 3 arguments, got ${args.length}.`);
  }
  const projectId = args[0];
  const location = args[1];
  const jobId = args[2];
  await deleteDlpJob(projectId, location, jobId);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify three arguments:
 - Google Cloud Project like 'example-project-id'
 - Google Cloud Location like 'us-central1'
 - DLP Job ID like 'example-job-id'
Usage:
 node dlp-service-client-dlp-job-delete-async.js example-project-id us-central1 example-job-id
`);

    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  deleteDlpJob,
};
