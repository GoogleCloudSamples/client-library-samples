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

// [START bigquerydatapolicy_v2_datapolicyservice_iam_permissions_test]
const {DataPolicyServiceClient} =
  require('@google-cloud/bigquery-datapolicies').v2;
const {status} = require('@grpc/grpc-js');

const client = new DataPolicyServiceClient();

/**
 * Test IAM permissions for a data policy.
 * Tests whether the caller has the specified IAM permissions for a data
 * policy resource.
 *
 * @param {string} projectId The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} location The geographic location of the data policy (for example, 'us').
 * @param {string} dataPolicyId The ID of the data policy to test permissions for.
 * @param {string[]} permissions A list of permissions to test (for example, ['bigquery.dataPolicies.get']).
 */
async function testDataPolicyIamPermissions(
  projectId,
  location,
  dataPolicyId,
  permissions,
) {
  const resourceName = client.dataPolicyPath(projectId, location, dataPolicyId);

  // Ensure permissions is an array (helper for CLI runner)
  const permissionsArray = Array.isArray(permissions)
    ? permissions
    : [permissions];

  const request = {
    resource: resourceName,
    permissions: permissionsArray,
  };

  try {
    const [response] = await client.testIamPermissions(request);

    console.log(`Tested permissions for data policy: ${resourceName}`);
    if (response.permissions && response.permissions.length > 0) {
      console.log(
        `Caller has the following permissions: ${response.permissions.join(', ')}`,
      );
    } else {
      console.log('Caller has NONE of the requested permissions.');
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Error: Data policy '${resourceName}' not found.`);
    } else {
      console.error('An API error occurred:', err.message);
    }
  }
}
// [END bigquerydatapolicy_v2_datapolicyservice_iam_permissions_test]

module.exports = {
  testDataPolicyIamPermissions,
};
