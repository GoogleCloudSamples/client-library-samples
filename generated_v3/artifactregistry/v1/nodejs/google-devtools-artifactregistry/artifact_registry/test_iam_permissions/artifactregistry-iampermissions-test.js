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

// [START artifactregistry_v1_artifactregistry_test_iam_permissions]
'use strict';

const {ArtifactRegistryClient} = require('@google-cloud/artifact-registry');
const {status} = require('@grpc/grpc-js');

const client = new ArtifactRegistryClient();

/**
 * Use the testIamPermissions method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or multi-region of the repository.
 * @param {string} repositoryId - The Artifact Registry repository ID.
 */
async function testIamPermissions(projectId, locationId, repositoryId) {
  try {
    const permissions = [
      'artifactregistry.repositories.get',
      'artifactregistry.repositories.update',
    ];
    const resource = `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}`;

    const [response] = await client.testIamPermissions({
      resource,
      permissions,
    });

    console.log('Granted permissions:', response.permissions);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error('Resource not found:', err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied:', err.message);
    } else {
      console.error('Failed to test IAM permissions:', err.message);
    }
  }
}

module.exports = { testIamPermissions };
// [END artifactregistry_v1_artifactregistry_test_iam_permissions]
