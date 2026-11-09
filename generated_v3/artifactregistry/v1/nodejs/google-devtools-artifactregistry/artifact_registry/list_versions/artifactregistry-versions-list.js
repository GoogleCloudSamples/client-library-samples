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

// [START artifactregistry_v1_artifactregistry_versions_list]
'use strict';

const {ArtifactRegistryClient} = require('@google-cloud/artifact-registry');
const {status} = require('@grpc/grpc-js');

const client = new ArtifactRegistryClient();

/**
 * Use the listVersions method
 *
 * @param {string} projectId - The Google Cloud project ID containing the Artifact Registry repository.
 * @param {string} locationId - The Google Cloud region or location of the repository (for example, 'us-central1').
 * @param {string} repositoryId - The ID of the Artifact Registry repository.
 * @param {string} packageId - The package ID whose versions will be listed.
 */
async function listVersions(projectId, locationId, repositoryId, packageId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}/packages/${packageId}`;

    const request = {
      parent,
    };

    const [versions] = await client.listVersions(request);

    for (const version of versions) {
      console.log(`Version name: ${version.name}`);
      console.log(`Description: ${version.description}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Error listing versions: ${err.message}`);
    }
  }
}

module.exports = { listVersions };
// [END artifactregistry_v1_artifactregistry_versions_list]
