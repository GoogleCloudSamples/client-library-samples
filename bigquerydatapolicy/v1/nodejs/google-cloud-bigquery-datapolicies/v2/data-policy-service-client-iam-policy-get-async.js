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

// [START bigquerydatapolicy_v1_datapolicyservice_iampolicy_get_async]
const {DataPolicyServiceClient} = require('@google-cloud/bigquery-datapolicies').v1;
const {status} = require('@grpc/grpc-js');

// Instantiates a client. This client is used to interact with the Data Policy API.
// It should be instantiated only once and reused throughout the application.
const client = new DataPolicyServiceClient();

/**
 * Gets the IAM policy for a specified data policy.
 *
 * This sample demonstrates how to retrieve the Identity and Access Management (IAM)
 * policy associated with a BigQuery Data Policy. IAM policies define who has
 * what permissions for a resource.
 *
 * @param {string} projectId The Google Cloud project ID.
 * @param {string} locationId The ID of the location of the data policy (e.g., 'us').
 * @param {string} dataPolicyId The ID of the data policy.
 */
async function getIamPolicyForDataPolicy(
  projectId = 'your-project-id',
  locationId = 'us',
  dataPolicyId = 'your-data-policy-id'
) {
  const dataPolicyResourceName = client.dataPolicyPath(
    projectId,
    locationId,
    dataPolicyId
  );

  const request = {
    resource: dataPolicyResourceName,
  };

  try {
    const [policy] = await client.getIamPolicy(request);
    console.log(`IAM Policy for Data Policy '${dataPolicyId}':`);
    // The policy object contains bindings, etag, and version.
    // We stringify it for pretty printing.
    console.log(JSON.stringify(policy, null, 2));
  } catch (err) {
    // Handle the case where the data policy is not found.
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Data Policy '${dataPolicyId}' not found in location '${locationId}' ` +
          `for project '${projectId}'.\n` +
          'Please ensure the data policy exists and the resource name is correct.'
      );
    } else {
      // Log any other errors that occur during the API call.
      console.error(
        `Error getting IAM policy for data policy '${dataPolicyId}':`, err
      );
    }
  }
}

// [END bigquerydatapolicy_v1_datapolicyservice_iampolicy_get_async]

async function main(args) {
  if (args.length !== 3) {
    throw new Error(`Expected 3 arguments, got ${args.length}.`);
  }
  await getIamPolicyForDataPolicy(args[0], args[1], args[2]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify three arguments:
 - Google Cloud Project ID like 'my-project-123'
 - Google Cloud Location ID like 'us'
 - Data Policy ID like 'my-data-policy'
Usage:
 node data-policy-service-client-iam-policy-get-async.js my-project-123 us my-data-policy
`);
    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}

module.exports = {
  getIamPolicyForDataPolicy,
};
