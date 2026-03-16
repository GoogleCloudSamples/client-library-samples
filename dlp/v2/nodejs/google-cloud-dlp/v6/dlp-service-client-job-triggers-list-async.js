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

// [START dlp_v2_dlpservice_jobtriggers_list_async]
const {DlpServiceClient} = require('@google-cloud/dlp').v2;
const {status} = require('@grpc/grpc-js');

const client = new DlpServiceClient();

/**
 * Lists all DLP job triggers for a given project and location.
 *
 * @param {string} projectId The Google Cloud project ID to use.
 * @param {string} locationId The Google Cloud location (e.g., 'global', 'us-central1').
 */
async function listJobTriggers(projectId, locationId) {
  const parent = `projects/${projectId}/locations/${locationId}`;

  const request = {
    parent,
  };

  try {
    const [jobTriggers] = await client.listJobTriggers(request);

    if (jobTriggers.length === 0) {
      console.log(
        `No job triggers found for project ${projectId} in location ${locationId}.`,
      );
      return;
    }

    for (const trigger of jobTriggers) {
      console.log(`Name: ${trigger.name}`);
      console.log(`  Display Name: ${trigger.displayName}`);
      console.log(`  Description: ${trigger.description}`);
      console.log(`  Status: ${trigger.status}`);
      if (trigger.createTime && trigger.createTime.seconds) {
        const createTime = new Date(
          trigger.createTime.seconds * 1000 +
            (trigger.createTime.nanos || 0) / 1000000,
        );
        console.log(`  Create Time: ${createTime}`);
      }
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.log(`The specified parent resource '${parent}' does not exist.`);
    } else {
      console.error('Error listing job triggers:', err);
    }
  }
}
// [END dlp_v2_dlpservice_jobtriggers_list_async]

async function main(args) {
  if (args.length !== 2) {
    throw new Error(`Expected 2 arguments, got ${args.length}.`);
  }
  await listJobTriggers(args[0], args[1]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify two arguments:
 - Google Cloud Project like 'example-project-id'
 - Google Cloud Location like 'us-central1'
Usage:
 node dlp-service-client-job-triggers-list-async.js example-project-id us-central1
`);

    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  listJobTriggers,
};
