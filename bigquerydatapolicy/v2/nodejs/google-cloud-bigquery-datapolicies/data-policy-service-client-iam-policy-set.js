// Copyright 2026 Google LLC
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

// [START bigquerydatapolicy_v2_datapolicyservice_iampolicy_set]
const {DataPolicyServiceClient} =
  require('@google-cloud/bigquery-datapolicies').v2;
const {status} = require('@grpc/grpc-js');

const client = new DataPolicyServiceClient();

/**
 * Set the IAM policy for a data policy.
 * Sets the IAM policy for a specified data policy resource from the BigQuery
 * Data Policy API. This is useful for granting specific roles to members on
 * the policy.
 *
 * @param {string} projectId The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} location The geographic location of the data policy (for example, 'us').
 * @param {string} dataPolicyId The ID of the data policy.
 * @param {string} member The IAM principal to be added (for example, 'user:example@gmail.com').
 * @param {string} role The IAM role to grant (for example, 'roles/bigquery.dataPolicyUser').
 */
async function setDataPolicyIamPolicy(
  projectId,
  location,
  dataPolicyId,
  member,
  role,
) {
  const resourceName = client.dataPolicyPath(projectId, location, dataPolicyId);

  try {
    // First, get the current policy to preserve it (standard ETag management).
    const [currentPolicy] = await client.getIamPolicy({resource: resourceName});

    // Add a new binding for the specified role and member.
    const newBinding = {
      role,
      members: [member],
    };
    currentPolicy.bindings.push(newBinding);

    const request = {
      resource: resourceName,
      policy: currentPolicy,
    };

    const [updatedPolicy] = await client.setIamPolicy(request);

    console.log(
      `Successfully updated IAM policy for data policy: ${resourceName}`,
    );
    console.log(`New Binding added: ${role} for ${member}`);
    console.log(`Updated ETag: ${updatedPolicy.etag}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Error: Data policy '${resourceName}' not found.`);
    } else {
      console.error('An API error occurred:', err.message);
    }
  }
}
// [END bigquerydatapolicy_v2_datapolicyservice_iampolicy_set]

module.exports = {
  setDataPolicyIamPolicy,
};
