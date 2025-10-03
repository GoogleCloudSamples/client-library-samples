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

// [START bigquerydatapolicy_v2beta1_datapolicyservice_iampolicy_get_async]
const {DataPolicyServiceClient} =
  require('@google-cloud/bigquery-datapolicies').v2beta1;
const {status} = require('@grpc/grpc-js');

const client = new DataPolicyServiceClient();

/**
 * Retrieves the IAM policy for a specific BigQuery Data Policy.
 *
 * This sample demonstrates how to fetch the Identity and Access Management (IAM)
 * policy associated with a given BigQuery Data Policy. The IAM policy defines
 * who has what permissions for the data policy, controlling access to the
 * masked data or raw data governed by it.
 *
 * @param {string} projectId Your Google Cloud project ID.
 *     (e.g., 'my-project-123')
 * @param {string} location The Google Cloud location of the data policy.
 *     (e.g., 'us-central1')
 * @param {string} dataPolicyId The ID of the data policy.
 *     (e.g., 'my-data-policy-id')
 */
async function getIamPolicyForDataPolicy(
  projectId,
  location = 'us-central1',
  dataPolicyId,
) {
  const resourceName = client.dataPolicyPath(projectId, location, dataPolicyId);

  const request = {
    resource: resourceName,
  };

  try {
    const [policy] = await client.getIamPolicy(request);
    console.log(
      `Successfully retrieved IAM policy for Data Policy: ${resourceName}`,
    );
    console.log(
      'Policy Etag:',
      policy.etag ? policy.etag.toString('base64') : 'N/A',
    );
    if (policy.bindings && policy.bindings.length > 0) {
      console.log('Policy Bindings:');
      policy.bindings.forEach(binding => {
        console.log(`  Role: ${binding.role}`);
        console.log(`  Members: ${binding.members.join(', ')}`);
      });
    } else {
      console.log('No policy bindings found.');
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Data Policy '${dataPolicyId}' not found in location '${location}' for project '${projectId}'. ` +
          'Ensure the data policy exists and the resource name is correct.',
      );
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(
        `Permission denied to get IAM policy for Data Policy '${dataPolicyId}'. ` +
          'Ensure the authenticated account has the necessary permissions (e.g., bigquery.datapolicies.getIamPolicy).',
      );
    } else {
      console.error('Error getting IAM policy:', err.message);
    }
  }
}
// [END bigquerydatapolicy_v2beta1_datapolicyservice_iampolicy_get_async]

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
 - Google Cloud Location like 'us-central1'
 - Data Policy ID like 'my-data-policy-id'
Usage:
 node data-policy-service-client-iam-policy-get-async.js my-project-123 us-central1 my-data-policy-id
`);
  });
  main(process.argv.slice(2));
}

module.exports = {
  getIamPolicyForDataPolicy,
};
