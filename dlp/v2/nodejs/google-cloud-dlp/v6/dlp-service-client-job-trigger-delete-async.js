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

// [START dlp_v2_dlpservice_jobtrigger_delete_async]
const {DlpServiceClient} = require('@google-cloud/dlp').v2;
const {status} = require('@grpc/grpc-js');

const client = new DlpServiceClient();

/**
 * Deletes a job trigger.
 *
 * A job trigger is a resource that allows you to configure and schedule recurring
 * DLP jobs. Deleting it removes the trigger and prevents future jobs from being
 * started by this trigger. Any jobs already running or completed are not affected.
 *
 * @param {string} projectId The Google Cloud project ID to use.
 * @param {string} locationId The Google Cloud location ID (e.g., 'us-central1' or 'global').
 * @param {string} jobTriggerId The ID of the job trigger to delete (e.g., 'my-job-trigger-id').
 */
async function deleteJobTrigger(projectId, locationId, jobTriggerId) {
  const name = `projects/${projectId}/locations/${locationId}/jobTriggers/${jobTriggerId}`;
  const request = {
    name,
  };

  try {
    await client.deleteJobTrigger(request);
    console.log(`Successfully deleted job trigger: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.log(
        `Job trigger '${jobTriggerId}' not found in location '${locationId}' of project '${projectId}'.`,
      );
    } else {
      console.error('Error deleting job trigger:', err);
    }
  }
}
// [END dlp_v2_dlpservice_jobtrigger_delete_async]

async function main(args) {
  if (args.length !== 3) {
    throw new Error(`Expected 3 arguments, got ${args.length}.`);
  }
  await deleteJobTrigger(args[0], args[1], args[2]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify three arguments:
 - Google Cloud Project like 'example-project-id'
 - Google Cloud Location like 'us-central1'
 - Job Trigger ID like 'example-job-trigger-id'
Usage:
 node dlp-service-client-job-trigger-delete-async.js example-project-id us-central1 example-job-trigger-id
`);
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  deleteJobTrigger,
};
