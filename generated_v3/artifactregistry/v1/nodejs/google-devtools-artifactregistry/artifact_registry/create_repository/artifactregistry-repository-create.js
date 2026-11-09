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

// [START artifactregistry_v1_artifactregistry_repository_create]
'use strict';

const {ArtifactRegistryClient} = require('@google-cloud/artifact-registry');
const {status} = require('@grpc/grpc-js');

const client = new ArtifactRegistryClient();

/**
 * Creates an Artifact Registry repository.
 *
 * @param {string} repositoryId - ID of the Repository (for example, 'example-repository-id')
 */
async function createRepository(repositoryId) {
  try {
    const projectId = await client.getProjectId();
    const location = 'us-central1';
    const parent = `projects/${projectId}/locations/${location}`;
    const repository = {
      format: 'DOCKER',
      description: 'Example Docker repository',
    };

    const request = {
      parent,
      repositoryId,
      repository,
    };

    const [operation] = await client.createRepository(request);
    const [response] = await operation.promise();

    console.log(`Created repository: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Repository already exists: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to create repository: ${err.message}`);
    }
    throw err;
  }
}

module.exports = {createRepository};
// [END artifactregistry_v1_artifactregistry_repository_create]
