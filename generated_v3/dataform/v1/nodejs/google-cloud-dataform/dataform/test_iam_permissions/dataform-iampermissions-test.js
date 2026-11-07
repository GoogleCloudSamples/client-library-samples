// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// [START dataform_v1_dataform_test_iam_permissions]
'use strict';

const {DataformClient} = require('@google-cloud/dataform');
const {status} = require('@grpc/grpc-js');

const client = new DataformClient();

/**
 * Use the testIamPermissions method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region for the Dataform repository.
 * @param {string} repositoryId - The ID of the Dataform repository. This is caller-chosen upon creation.
 */
async function testIamPermissions(projectId, locationId, repositoryId) {
  try {
    const resource = `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}`;
    const permissions = [
      'dataform.repositories.get',
      'dataform.repositories.update',
    ];

    const request = {
      resource,
      permissions,
    };

    const [response] = await client.testIamPermissions(request);
    const grantedPermissions = response.permissions || [];
    console.log(`Granted permissions: ${grantedPermissions.join(', ')}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Repository not found at resource: ${projectId}/${locationId}/${repositoryId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Caller lacks permission to test IAM policies on the specified repository.');
    } else {
      console.error(`Failed to test IAM permissions: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { testIamPermissions };
// [END dataform_v1_dataform_test_iam_permissions]
