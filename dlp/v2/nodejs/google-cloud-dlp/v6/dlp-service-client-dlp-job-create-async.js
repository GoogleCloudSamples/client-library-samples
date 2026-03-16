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

// [START dlp_v2_dlpservice_dlpjob_create_async]
const {DlpServiceClient} = require('@google-cloud/dlp').v2;
const {status} = require('@grpc/grpc-js');

const client = new DlpServiceClient();

/**
 * Creates a new asynchronous DLP job to inspect a Google Cloud Storage bucket.
 *
 * This sample demonstrates how to create an inspection job that scans a
 * specified Cloud Storage bucket for sensitive data, such as credit card
 * numbers and email addresses.
 *
 * @param {string} projectId The Google Cloud Project ID to run the API call under.
 * @param {string} locationId The GCP location of the job (e.g., 'global', 'us-central1').
 */
async function createDlpJob(projectId, locationId = 'global') {
  const parent = `projects/${projectId}/locations/${locationId}`;

  const request = {
    parent,
    inspectJob: {
      storageConfig: {
        cloudStorageOptions: {
          fileSet: {
            url: 'gs://cloud-samples-data/dlp/sample-file-1.txt',
          },
        },
      },
      inspectConfig: {
        infoTypes: [{name: 'CREDIT_CARD_NUMBER'}, {name: 'EMAIL_ADDRESS'}],
        minLikelihood: 'POSSIBLE',
        // To increase the number of findings returned, consider adjusting these limits.
        // Note: These limits are soft limits and the actual number of findings returned
        // might be higher.
        limits: {
          maxFindingsPerItem: 100,
          maxFindingsPerRequest: 1000,
        },
      },
      actions: [
        {
          saveFindings: {
            outputConfig: {
              table: {
                // This dataset and table must already exist to save results to
                projectId,
                datasetId: 'my_dataset',
                tableId: 'my_table',
              },
            },
          },
        },
      ],
    },
  };

  try {
    const [job] = await client.createDlpJob(request);
    console.log(`Successfully created DLP job: ${job.name}`);
    console.log(`Job status: ${job.state}`);
    console.log(`Job type: ${job.type}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        'Error: The specified parent resource or GCS bucket was not found. ' +
          'Please check the Project ID and Location ID.',
      );
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(
        'Error: Permission denied. Ensure the service account has the necessary ' +
          'roles (e.g., DLP User, Storage Object Viewer) for the project and bucket.',
      );
    } else {
      console.error(`Error creating DLP job: ${err.message}`);
    }
    process.exitCode = 1;
  }
}
// [END dlp_v2_dlpservice_dlpjob_create_async]

async function main(args) {
  if (args.length !== 2) {
    throw new Error(`Expected 2 arguments, got ${args.length}.`);
  }
  const projectId = args[0];
  const location = args[1];
  await createDlpJob(projectId, location);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify two arguments:
 - Google Cloud Project like 'example-project-id'
 - Google Cloud Location like 'global' or 'us-central1'
Usage:
 node dlp-service-client-dlp-job-create-async.js example-project-id global
`);

    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  createDlpJob,
};
