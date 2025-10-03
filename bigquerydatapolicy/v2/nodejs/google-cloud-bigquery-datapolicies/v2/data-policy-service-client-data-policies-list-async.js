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

// Imports for the command-line runner must be before the region tag start.
const process = require('process');

// [START bigquerydatapolicy_v2_datapolicyservice_datapolicies_list_async]
const {DataPolicyServiceClient} =
  require('@google-cloud/bigquery-datapolicies').v2;
const {status} = require('@grpc/grpc-js');

const client = new DataPolicyServiceClient();

/**
 * Lists all data policies in a given Google Cloud project and location.
 *
 * Data policies define rules for data masking, row-level security, or column-level security.
 * This sample demonstrates how to retrieve a paginated list of these policies.
 *
 * @param {string} projectId The Google Cloud project ID. (e.g., 'my-project-123')
 * @param {string} location The Google Cloud location of the data policies. (e.g., 'us')
 */
async function listDataPolicies(projectId, location) {
  const parent = `projects/${projectId}/locations/${location}`;

  const request = {
    parent: parent,
  };

  try {
    console.log(
      `Listing data policies for project: ${projectId} in location: ${location}`,
    );
    let policyCount = 0;
    for (const dataPolicy of client.listDataPolicies(request)) {
      console.log(`Data Policy Name: ${dataPolicy.name}`);
      console.log(`  ID: ${dataPolicy.dataPolicyId}`);
      console.log(`  Type: ${dataPolicy.dataPolicyType}`);
      if (dataPolicy.policyTag) {
        console.log(`  Policy Tag: ${dataPolicy.policyTag}`);
      }
      if (dataPolicy.grantees && dataPolicy.grantees.length > 0) {
        console.log(`  Grantees: ${dataPolicy.grantees.join(', ')}`);
      }
      if (dataPolicy.dataMaskingPolicy) {
        if (dataPolicy.dataMaskingPolicy.predefinedExpression) {
          console.log(
            `  Data Masking Predefined Expression: ${dataPolicy.dataMaskingPolicy.predefinedExpression}`,
          );
        } else if (dataPolicy.dataMaskingPolicy.routine) {
          console.log(
            `  Data Masking Routine: ${dataPolicy.dataMaskingPolicy.routine}`,
          );
        }
      }
      policyCount++;
    }

    if (policyCount === 0) {
      console.log(
        `No data policies found in location ${location} for project ${projectId}.`,
      );
    } else {
      console.log(`Successfully listed ${policyCount} data policies.`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: The project or location '${location}' for project '${projectId}' was not found. ` +
          'Ensure the project ID and location are correct and that the BigQuery Data Policy API is enabled.',
      );
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(
        `Error: Permission denied when listing data policies for project '${projectId}' in location '${location}'. ` +
          'Ensure the authenticated account has the necessary permissions (e.g., bigquery.datapolicies.list).',
      );
    } else {
      console.error(`Error listing data policies: ${err.message}`);
    }
  }
}
// [END bigquerydatapolicy_v2_datapolicyservice_datapolicies_list_async]

async function main(args) {
  if (args.length !== 2) {
    throw new Error(`Expected 2 arguments, got ${args.length}.`);
  }
  await listDataPolicies(args[0], args[1]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify two arguments:
 - Google Cloud Project like 'example-project-id'
 - Google Cloud Location like 'us'
Usage:
 node data-policy-service-client-data-policies-list-async.js example-project-id us
`);

  });
  main(process.argv.slice(2));
}

module.exports = {
  listDataPolicies,
};
