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

// [START bigquerydatapolicy_v2_datapolicyservice_iampolicy_get_async]
const {DataPolicyServiceClient} =
  require('@google-cloud/bigquery-datapolicies').v2;
const {status} = require('@grpc/grpc-js');

const client = new DataPolicyServiceClient();

/**
 * Gets the IAM policy for a data policy.
 *
 * This sample demonstrates how to retrieve the Identity and Access Management (IAM)
 * policy associated with a specific BigQuery Data Policy. The IAM policy defines
 * who has what permissions on the data policy resource.
 *
 * @param {string} projectId Google Cloud Project ID (e.g., 'my-project-id')
 * @param {string} location Google Cloud Location (e.g., 'us-central1')
 * @param {string} dataPolicyId The ID of the data policy (e.g., 'my-data-policy-id')
 */
async function getIamPolicy(projectId, location, dataPolicyId) {
  const resourceName = client.dataPolicyPath(projectId, location, dataPolicyId);

  const request = {
    resource: resourceName,
  };

  try {
    const [policy] = await client.getIamPolicy(request);
    console.log(
      'Successfully retrieved IAM policy for data policy %s:',
      resourceName,
    );
    console.log(JSON.stringify(policy, null, 2));
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Data Policy '${dataPolicyId}' not found in location '${location}' of project '${projectId}'. ` +
          'Ensure the data policy exists and the resource name is correct.',
      );
    } else {
      console.error(
        `Error getting IAM policy for data policy '${dataPolicyId}':`,
        err,
      );
    }
  }
}
// [END bigquerydatapolicy_v2_datapolicyservice_iampolicy_get_async]

async function main(args) {
  if (args.length !== 3) {
    throw new Error(`Expected 3 arguments, got ${args.length}.`);
  }
  await getIamPolicy(args[0], args[1], args[2]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, specify three arguments:
 - Google Cloud Project ID like 'my-project-id'
 - Google Cloud Location like 'us-central1'
 - Data Policy ID like 'my-data-policy-id'
Usage:
 node data-policy-service-client-iam-policy-get-async.js my-project-id us-central1 my-data-policy-id
`);

  });
  main(process.argv.slice(2));
}

module.exports = {
  getIamPolicy,
};
