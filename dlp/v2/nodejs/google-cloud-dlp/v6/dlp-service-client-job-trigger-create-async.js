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

// [START dlp_v2_dlpservice_jobtrigger_create_async]
const {DlpServiceClient} = require('@google-cloud/dlp').v2;
const {status} = require('@grpc/grpc-js');

const client = new DlpServiceClient();

/**
 * Creates a recurring job trigger to scan a Google Cloud Storage bucket for sensitive data.
 *
 * @param {string} projectId The Google Cloud Project ID.
 * @param {string} locationId The Google Cloud location (e.g., 'global', 'us-central1').
 * @param {string} bucketName The name of the GCS bucket to scan (e.g., 'my-unique-bucket').
 */
async function createJobTrigger(projectId, locationId, bucketName) {
  const parent = `projects/${projectId}/locations/${locationId}`;
  const request = {
    parent,
    jobTrigger: {
      displayName: 'My Recurring GCS Scan',
      description:
        'A job trigger to scan a GCS bucket for sensitive data on a schedule.',
      status: 'HEALTHY', // Set to 'HEALTHY' to enable the trigger immediately
      inspectJob: {
        storageConfig: {
          cloudStorageOptions: {
            fileSet: {
              url: `gs://${bucketName}/*`, // Scan all files in the specified bucket
            },
          },
        },
        inspectConfig: {
          // For a complete list of info types, see https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference
          infoTypes: [
            {name: 'EMAIL_ADDRESS'},
            {name: 'PHONE_NUMBER'},
            {name: 'CREDIT_CARD_NUMBER'},
          ],
          minLikelihood: 'POSSIBLE', // See https://cloud.google.com/sensitive-data-protection/docs/likelihood
        },
      },
      triggers: [
        {
          schedule: {
            recurrencePeriodDuration: {
              seconds: 86400, // 86400 seconds = 1 day.
            },
          },
        },
      ],
    },
    // Optional: You can provide a custom trigger ID. If not provided, a system-generated ID will be used.
    // triggerId: 'my-custom-trigger-id',
  };

  try {
    const [jobTrigger] = await client.createJobTrigger(request);
    console.log(`Successfully created job trigger: ${jobTrigger.name}`);
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.log(
        `Job trigger with that ID already exists in location '${locationId}' of project '${projectId}'.`,
      );
    } else {
      console.error('Error creating job trigger:', err);
    }
  }
}
// [END dlp_v2_dlpservice_jobtrigger_create_async]

async function main(args) {
  if (args.length !== 3) {
    throw new Error(`Expected 3 arguments, got ${args.length}.`);
  }
  await createJobTrigger(args[0], args[1], args[2]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify three arguments:
 - Google Cloud Project like 'example-project-id'
 - Google Cloud Location like 'us-central1'
 - GCS Bucket Name like 'my-bucket'
Usage:
 node dlp-service-client-job-trigger-create-async.js example-project-id us-central1 my-bucket
`);

    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  createJobTrigger,
};
