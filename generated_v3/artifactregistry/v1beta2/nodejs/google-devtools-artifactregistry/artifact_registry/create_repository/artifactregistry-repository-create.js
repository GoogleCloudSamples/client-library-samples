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

// [START artifactregistry_v1beta2_artifactregistry_repository_create]
'use strict';

const {ArtifactRegistryClient} = require('@google-cloud/artifact-registry');
const {status} = require('@grpc/grpc-js');

const client = new ArtifactRegistryClient();

/**
 * Use the createRepository method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location for the repository (for example, 'us-central1').
 * @param {string} repositoryId - The ID of the repository to create. Must be unique within the project and location.
 */
async function createRepository(projectId, locationId, repositoryId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const repository = {
      format: 'DOCKER',
      description: 'Docker package repository',
    };

    const request = {
      parent,
      repository,
      repositoryId,
    };

    // Initiate the long-running operation to create the repository
    const [operation] = await client.createRepository(request);

    // Wait for the long-running operation to complete
    const [response] = await operation.promise();

    console.log(`Repository created: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Repository already exists: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to create repository: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createRepository };
// [END artifactregistry_v1beta2_artifactregistry_repository_create]
