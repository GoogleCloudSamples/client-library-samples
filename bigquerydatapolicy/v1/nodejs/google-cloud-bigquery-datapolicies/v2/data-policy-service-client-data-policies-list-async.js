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

// [START bigquerydatapolicy_v1_datapolicyservice_datapolicies_list_async]
const {DataPolicyServiceClient} = require('@google-cloud/bigquery-datapolicies').v1;
const {status} = require('@grpc/grpc-js');

const client = new DataPolicyServiceClient();

/**
 * Lists all data policies in a given Google Cloud project and location.
 *
 * Data policies define rules for data masking or column-level security on BigQuery tables.
 * This function demonstrates how to retrieve a list of these policies.
 *
 * @param {string} projectId Your Google Cloud Project ID (e.g., 'my-project-id')
 * @param {string} location The Google Cloud location of the data policies (e.g., 'us-central1')
 */
async function listDataPolicies(projectId, location) {
  // Construct the parent resource name.
  const parent = `projects/${projectId}/locations/${location}`;

  const request = {
    parent: parent,
    // Optional: specify the maximum number of policies to return per page.
    // pageSize: 10,
    // Optional: filter policies by policy tag.
    // filter: 'policy_tag:projects/1/locations/us/taxonomies/2/policyTags/3'
  };

  try {
    console.log(`Listing data policies for project: ${projectId}, location: ${location}`);
    // The listDataPoliciesAsync method returns an AsyncIterable.
    // It automatically handles pagination, fetching all available data policies.
    for await (const dataPolicy of client.listDataPoliciesAsync(request)) {
      console.log(`Data Policy Name: ${dataPolicy.name}`);
      console.log(`  Data Policy ID: ${dataPolicy.dataPolicyId}`);
      console.log(`  Data Policy Type: ${dataPolicy.dataPolicyType}`);

      if (dataPolicy.policyTag) {
        console.log(`  Policy Tag: ${dataPolicy.policyTag}`);
      }
      if (dataPolicy.dataMaskingPolicy) {
        console.log(`  Data Masking Policy:`);
        if (dataPolicy.dataMaskingPolicy.predefinedExpression) {
          console.log(`    Predefined Expression: ${dataPolicy.dataMaskingPolicy.predefinedExpression}`);
        } else if (dataPolicy.dataMaskingPolicy.routine) {
          console.log(`    Routine: ${dataPolicy.dataMaskingPolicy.routine}`);
        }
      }
      console.log('---');
    }
    console.log('Finished listing data policies.');
  } catch (err) {
    // Handle specific API errors. For example, if the project or location is not found.
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Project '${projectId}' or location '${location}' not found, or no data policies exist. Details: ${err.message}`
      );
      // Suggest corrective action.
      console.error(
        'Please ensure the project ID and location are correct and that data policies have been created.'
      );
    } else {
      // Log other unexpected errors.
      console.error('Error listing data policies:', err);
    }
  }
}
// [END bigquerydatapolicy_v1_datapolicyservice_datapolicies_list_async]

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
 - Google Cloud Project ID like 'my-project-id'
 - Google Cloud Location like 'us-central1'
Usage:
 node data-policy-service-client-data-policies-list-async.js my-project-id us-central1
`);
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  listDataPolicies,
};
