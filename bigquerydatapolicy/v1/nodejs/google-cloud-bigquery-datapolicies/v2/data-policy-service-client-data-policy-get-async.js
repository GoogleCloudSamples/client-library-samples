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

// [START bigquerydatapolicy_v1_datapolicyservice_datapolicy_get_async]
const {DataPolicyServiceClient} = require('@google-cloud/bigquery-datapolicies').v1;
const {status} = require('@grpc/grpc-js');

const client = new DataPolicyServiceClient();

/**
 * Retrieves a data policy by its resource name.
 *
 * This sample demonstrates how to retrieve the details of a specific data policy
 * using its project ID, location, and data policy ID.
 *
 * @param {string} projectId Your Google Cloud project ID (e.g., 'your-project-id').
 * @param {string} locationId The ID of the location where the data policy resides (e.g., 'us').
 * @param {string} dataPolicyId The ID of the data policy to retrieve (e.g., 'my-data-policy-123').
 */
async function getDataPolicy(
  projectId = 'my-project-id', // Replace with your project ID
  locationId = 'us', // Replace with your data policy's location
  dataPolicyId = 'my-data-policy-123' // Replace with your data policy ID
) {
  // Construct the full resource name for the data policy.
  // Format: projects/{project_number}/locations/{location_id}/dataPolicies/{data_policy_id}
  const name = client.dataPolicyPath(projectId, locationId, dataPolicyId);

  const request = {
    name: name,
  };

  try {
    const [dataPolicy] = await client.getDataPolicy(request);
    console.log(`Successfully retrieved data policy: ${dataPolicy.name}`);
    console.log(`  Data Policy ID: ${dataPolicy.dataPolicyId}`);
    console.log(`  Policy Tag: ${dataPolicy.policyTag || 'N/A'}`);
    console.log(`  Data Policy Type: ${dataPolicy.dataPolicyType}`);
    if (dataPolicy.dataMaskingPolicy) {
      console.log(`  Data Masking Policy:`);
      if (dataPolicy.dataMaskingPolicy.predefinedExpression) {
        console.log(`    Predefined Expression: ${dataPolicy.dataMaskingPolicy.predefinedExpression}`);
      } else if (dataPolicy.dataMaskingPolicy.routine) {
        console.log(`    Routine: ${dataPolicy.dataMaskingPolicy.routine}`);
      }
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Data policy '${dataPolicyId}' not found in project '${projectId}' at location '${locationId}'.`
      );
      console.error('Please ensure the data policy ID and location are correct and that you have the necessary permissions.');
    } else {
      console.error('Error getting data policy:', err.message);
      // Log the full error object for debugging purposes in a development environment.
      // In production, consider more structured logging or alerting.
      console.error(err);
    }
  }
}
// [END bigquerydatapolicy_v1_datapolicyservice_datapolicy_get_async]

async function main(args) {
  if (args.length !== 3) {
    throw new Error(`Expected 3 arguments, got ${args.length}.`);
  }
  await getDataPolicy(args[0], args[1], args[2]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify three arguments:
 - Google Cloud Project ID like 'example-project-id'
 - Google Cloud Location ID like 'us'
 - Data Policy ID like 'example-data-policy-id'
Usage:
 node data-policy-service-client-data-policy-get-async.js example-project-id us example-data-policy-id
`);
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = { getDataPolicy };
