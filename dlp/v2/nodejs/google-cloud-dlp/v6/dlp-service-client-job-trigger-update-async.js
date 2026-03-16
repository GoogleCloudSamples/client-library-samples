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

// [START dlp_v2_dlpservice_jobtrigger_update_async]
const {DlpServiceClient} = require('@google-cloud/dlp').v2;
const {status} = require('@grpc/grpc-js');

const client = new DlpServiceClient();

/**
 * Updates an existing DLP job trigger.
 *
 * @param {string} projectId The Google Cloud project ID to use.
 * @param {string} locationId The GCP location of the job trigger (e.g., 'global', 'us-central1').
 * @param {string} jobTriggerId The ID of the job trigger to update.
 * @param {string} newDisplayName The new display name for the job trigger.
 * @param {string} newDescription The new description for the job trigger.
 */
async function updateJobTrigger(
  projectId,
  locationId,
  jobTriggerId,
  newDisplayName,
  newDescription,
) {
  const name = `projects/${projectId}/locations/${locationId}/jobTriggers/${jobTriggerId}`;

  const request = {
    name,
    jobTrigger: {
      displayName: newDisplayName,
      description: newDescription,
    },
    updateMask: {
      paths: ['display_name', 'description'],
    },
  };

  try {
    const [updatedJobTrigger] = await client.updateJobTrigger(request);
    console.log(`Successfully updated job trigger: ${updatedJobTrigger.name}`);
    console.log(`  Display Name: ${updatedJobTrigger.displayName}`);
    console.log(`  Description: ${updatedJobTrigger.description}`);
    console.log(`  Status: ${updatedJobTrigger.status}`);
    if (updatedJobTrigger.createTime) {
      const createTime = new Date(
        updatedJobTrigger.createTime.seconds * 1000 +
          updatedJobTrigger.createTime.nanos / 1000000,
      );
      console.log(`  Create Time: ${createTime}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.log(
        `Job trigger '${jobTriggerId}' not found in location '${locationId}' of project '${projectId}'.`,
      );
    } else {
      console.error('Error updating job trigger:', err);
    }
  }
}
// [END dlp_v2_dlpservice_jobtrigger_update_async]

async function main(args) {
  if (args.length !== 5) {
    throw new Error(`Expected 5 arguments, got ${args.length}.`);
  }
  await updateJobTrigger(args[0], args[1], args[2], args[3], args[4]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify five arguments:
 - Google Cloud Project ID like 'example-project-id'
 - Google Cloud Location like 'global'
 - Job Trigger ID like 'my-job-trigger'
 - New Display Name like 'My Updated Job Trigger'
 - New Description like 'This is an updated job trigger.'
Usage:
 node dlp-service-client-job-trigger-update-async.js example-project-id global my-job-trigger 'My Updated Job Trigger' 'This is an updated job trigger.'
`);
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  updateJobTrigger,
};
