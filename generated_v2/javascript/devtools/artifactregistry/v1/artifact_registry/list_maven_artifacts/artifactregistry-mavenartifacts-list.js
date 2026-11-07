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

// [START artifactregistry_v1_artifactregistry_mavenartifacts_list]
'use strict';

const {ArtifactRegistryClient} = require('@google-cloud/artifact-registry');
const {status} = require('@grpc/grpc-js');

const client = new ArtifactRegistryClient();

/**
 * Use the listMavenArtifacts method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location or region of the repository.
 * @param {string} repositoryId - The Artifact Registry repository ID.
 */
async function listMavenArtifacts(projectId, locationId, repositoryId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}`;
    const request = {
      parent,
    };

    // Retrieve the list of Maven artifacts in the specified repository
    const [artifacts] = await client.listMavenArtifacts(request);

    if (artifacts.length === 0) {
      console.log('No Maven artifacts found in the repository.');
      return;
    }

    for (const artifact of artifacts) {
      console.log(`Maven artifact: ${artifact.name}`);
      console.log(`  Group: ${artifact.groupId}`);
      console.log(`  Artifact: ${artifact.artifactId}`);
      console.log(`  Version: ${artifact.version}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Repository not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied for repository: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to list Maven artifacts: ${err.message}`);
    }
  }
}

module.exports = { listMavenArtifacts };
// [END artifactregistry_v1_artifactregistry_mavenartifacts_list]
