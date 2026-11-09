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

// [START dataform_v1beta1_dataform_test_iam_permissions]
'use strict';

const {DataformClient} = require('@google-cloud/dataform');
const {status} = require('@grpc/grpc-js');

const client = new DataformClient();

/**
 * Tests IAM permissions on a Dataform repository.
 *
 * @param {string} projectId - The Google Cloud project ID where the Dataform repository resides.
 * @param {string} locationId - The Google Cloud region or location for the Dataform repository (for example, "us-central1").
 * @param {string} repositoryId - The ID of the Dataform repository to test IAM permissions on.
 */
async function testIamPermissions(projectId, locationId, repositoryId) {
  try {
    const permissions = [
      'dataform.repositories.get',
      'dataform.repositories.update',
    ];
    const resource = `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}`;

    const request = {
      resource,
      permissions,
    };

    const [response] = await client.testIamPermissions(request);
    console.log(`Permissions granted: ${response.permissions?.join(', ') || 'None'}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Repository not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to test IAM permissions: ${err.message}`);
    }
  }
}

module.exports = { testIamPermissions };
// [END dataform_v1beta1_dataform_test_iam_permissions]
