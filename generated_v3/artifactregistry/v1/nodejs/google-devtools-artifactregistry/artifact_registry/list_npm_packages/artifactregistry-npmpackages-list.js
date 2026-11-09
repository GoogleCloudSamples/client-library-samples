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

// [START artifactregistry_v1_artifactregistry_npmpackages_list]
'use strict';

const {ArtifactRegistryClient} = require('@google-cloud/artifact-registry');
const {status} = require('@grpc/grpc-js');

const client = new ArtifactRegistryClient();

/**
 * Use the listNpmPackages method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location of the repository (e.g., 'us-central1').
 * @param {string} repositoryId - The identifier of the npm repository in Artifact Registry.
 */
async function listNpmPackages(projectId, locationId, repositoryId) {
  try {
    const parent = client.repositoryPath(projectId, locationId, repositoryId);
    const request = {
      parent,
    };

    const [packages] = await client.listNpmPackages(request);
    console.log(`Retrieved ${packages.length} npm package(s):`);
    for (const npmPackage of packages) {
      console.log(`- ${npmPackage.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Repository not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid request parameters: ${err.message}`);
    } else {
      console.error(`Failed to list npm packages: ${err.message}`);
    }
  }
}

module.exports = { listNpmPackages };
// [END artifactregistry_v1_artifactregistry_npmpackages_list]
