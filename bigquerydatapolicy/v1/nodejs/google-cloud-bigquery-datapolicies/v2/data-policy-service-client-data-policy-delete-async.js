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

const process = require('process');

// [START bigquerydatapolicy_v1_datapolicyservice_datapolicy_delete_async]
const {DataPolicyServiceClient} = require('@google-cloud/bigquery-datapolicies').v1;
const {status} = require('@grpc/grpc-js');

const client = new DataPolicyServiceClient();

/**
 * Deletes a data policy specified by its resource name.
 *
 * This sample demonstrates how to delete an existing data policy. It's crucial
 * to handle potential 'NOT_FOUND' errors, as attempting to delete a non-existent
 * data policy will result in an error.
 *
 * @param {string} [projectId='my-project-id'] The Google Cloud project ID. Example: 'my-project-id'
 * @param {string} [location='us-central1'] The Google Cloud location. Example: 'us-central1'
 * @param {string} [dataPolicyId='my-data-policy-id'] The ID of the data policy to delete. Example: 'my-data-policy-id'
 */
async function deleteDataPolicy(
  projectId = 'my-project-id',
  location = 'us-central1',
  dataPolicyId = 'my-data-policy-id'
) {
  // Construct the full resource name of the data policy.
  const name = client.dataPolicyPath(projectId, location, dataPolicyId);

  const request = {
    name: name,
  };

  try {
    await client.deleteDataPolicy(request);
    console.log(`Successfully deleted data policy: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.log(
        `Data policy ${name} not found. It may have already been deleted or never existed.`
      );
    } else {
      console.error(`Error deleting data policy ${name}:`, err.message);
      // For other errors, log the error and suggest corrective action.
      // For example, a PERMISSION_DENIED error would indicate insufficient IAM permissions.
      // Do not re-throw the error or cause the program to crash.
      process.exitCode = 1;
    }
  }
}
// [END bigquerydatapolicy_v1_datapolicyservice_datapolicy_delete_async]

async function main(args) {
  if (args.length !== 3) {
    throw new Error(`Expected 3 arguments, got ${args.length}.`);
  }
  await deleteDataPolicy(args[0], args[1], args[2]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify three arguments:
 - Google Cloud Project like 'example-project-id'
 - Google Cloud Location like 'us-central1'
 - Data Policy ID like 'example-data-policy-id'
Usage:
 node data-policy-service-client-data-policy-delete-async.js example-project-id us-central1 example-data-policy-id
`);

    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  deleteDataPolicy,
};
