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

// [START bigquerydatapolicy_v2_datapolicyservice_datapolicy_delete_async]
const {DataPolicyServiceClient} =
  require('@google-cloud/bigquery-datapolicies').v2;
const {status} = require('@grpc/grpc-js');

const client = new DataPolicyServiceClient();

/**
 * Deletes a data policy by its resource name.
 * This sample demonstrates how to delete an existing data policy.
 *
 * @param {string} projectId The Google Cloud project ID.
 * @param {string} location The Google Cloud location (e.g., 'us').
 * @param {string} dataPolicyId The ID of the data policy to delete (e.g., 'my-data-policy').
 */
async function deleteDataPolicy(projectId, location, dataPolicyId) {
  const name = client.dataPolicyPath(projectId, location, dataPolicyId);

  const request = {
    name: name,
  };

  try {
    await client.deleteDataPolicy(request);
    console.log(`Successfully deleted data policy: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Data policy ${name} not found. Ensure the data policy ID and location are correct.`,
      );
    } else {
      console.error(`Error deleting data policy ${name}:`, err.message);
    }
  }
}
// [END bigquerydatapolicy_v2_datapolicyservice_datapolicy_delete_async]

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
 - Resource name like 'example-resource-id'
Usage:
 node data-policy-service-client-data-policy-delete-async.js example-project-id us-central1 example-resource-id
`);

  });
  main(process.argv.slice(2));
}

module.exports = {
  deleteDataPolicy,
};
