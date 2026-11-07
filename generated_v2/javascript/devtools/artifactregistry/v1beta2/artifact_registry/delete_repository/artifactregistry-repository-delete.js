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

// [START artifactregistry_v1beta2_artifactregistry_repository_delete]
'use strict';

const {ArtifactRegistryClient} = require('@google-cloud/artifact-registry');
const {status} = require('@grpc/grpc-js');

const client = new ArtifactRegistryClient();

/**
 * Use the deleteRepository method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or multi-region of the repository.
 * @param {string} repositoryId - The caller-specified ID of the repository to delete.
 */
async function deleteRepository(projectId, locationId, repositoryId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}`;

    const [operation] = await client.deleteRepository({name});

    // Wait for the long-running operation to complete.
    await operation.promise();

    console.log(`Repository ${name} deleted successfully.`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Repository not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to delete repository: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteRepository };
// [END artifactregistry_v1beta2_artifactregistry_repository_delete]
