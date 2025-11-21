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

// [START bigquerydatapolicy_v2beta1_datapolicyservice_iampolicy_get]
const {DataPolicyServiceClient} =
  require('@google-cloud/bigquery-datapolicies').v2beta1;
const {status} = require('@grpc/grpc-js');

const client = new DataPolicyServiceClient();

/**
 * Gets the IAM policy for a specified data policy.
 * The policy defines the roles and members that have access to that data policy resource.
 *
 *
 * @param {string} projectId Your Google Cloud project ID. Example: 'example-project-id'
 * @param {string} location The Google Cloud location of the data policy. Example: 'us-central1'
 * @param {string} dataPolicyId The ID of the data policy. Example: 'example-data-policy-id'
 */
async function getIamPolicy(
  projectId,
  location = 'us-central1',
  dataPolicyId = 'example-data-policy-id',
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
          'Make sure the data policy exists and the resource name is correct.',
      );
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(
        `Permission denied to get IAM policy for Data Policy '${dataPolicyId}'. ` +
          'Make sure the authenticated account has the necessary permissions (For example, bigquery.datapolicies.getIamPolicy).',
      );
    } else {
      console.error('Error getting IAM policy:', err.message);
    }
  }
}
// [END bigquerydatapolicy_v2beta1_datapolicyservice_iampolicy_get]

module.exports = {
  getIamPolicy,
};
