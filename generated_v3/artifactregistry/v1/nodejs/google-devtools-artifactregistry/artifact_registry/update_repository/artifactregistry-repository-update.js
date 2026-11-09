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

// [START artifactregistry_v1_artifactregistry_repository_update]
'use strict';

const {ArtifactRegistryClient} = require('@google-cloud/artifact-registry');
const {status} = require('@grpc/grpc-js');

const client = new ArtifactRegistryClient();

/**
 * Use the updateRepository method
 *
 * @param {string} projectId - The Google Cloud project ID hosting the repository.
 * @param {string} locationId - The Google Cloud region or location of the repository.
 * @param {string} repositoryId - The caller-chosen identifier of the target repository.
 */
async function updateRepository(projectId, locationId, repositoryId) {
  try {
    const repository = {
      name: `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}`,
      description: 'Updated repository description',
    };
    const updateMask = {
      paths: ['description'],
    };

    const request = {
      repository,
      updateMask,
    };

    const [response] = await client.updateRepository(request);

    console.log(`Updated repository: ${response.name}`);
    console.log(`Repository description: ${response.description}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Repository not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`Failed to update repository: ${err.message}`);
    }
  }
}

module.exports = { updateRepository };
// [END artifactregistry_v1_artifactregistry_repository_update]
