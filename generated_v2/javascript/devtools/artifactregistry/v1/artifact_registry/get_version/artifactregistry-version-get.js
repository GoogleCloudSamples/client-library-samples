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

// [START artifactregistry_v1_artifactregistry_version_get]
'use strict';

const {ArtifactRegistryClient} = require('@google-cloud/artifact-registry');
const {status} = require('@grpc/grpc-js');

const client = new ArtifactRegistryClient();

/**
 * Retrieves details for a specified package version.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or multi-region of the repository (for example, 'us-central1').
 * @param {string} repositoryId - The caller-specified identifier of the Artifact Registry repository.
 * @param {string} packageId - The package identifier within the repository. Slashes in the package name must be URL-escaped.
 * @param {string} versionId - The identifier of the version to retrieve, sourced from an existing version resource or ListVersions response. Slashes in the version name must be URL-escaped.
 */
async function getVersion(projectId, locationId, repositoryId, packageId, versionId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}/packages/${packageId}/versions/${versionId}`;

    const request = {
      name,
    };

    const [response] = await client.getVersion(request);

    console.log(`Retrieved version: ${response.name}`);
    console.log(`Description: ${response.description}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Version not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getVersion };
// [END artifactregistry_v1_artifactregistry_version_get]
