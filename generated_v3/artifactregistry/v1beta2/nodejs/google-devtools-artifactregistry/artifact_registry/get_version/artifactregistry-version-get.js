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

// [START artifactregistry_v1beta2_artifactregistry_version_get]
'use strict';

const {ArtifactRegistryClient} = require('@google-cloud/artifact-registry');
const {status} = require('@grpc/grpc-js');

const client = new ArtifactRegistryClient();

/**
 * Use the getVersion method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location of the Artifact Registry repository, such as 'us-central1'.
 * @param {string} repositoryId - The caller-specified ID of the repository.
 * @param {string} packageId - The ID of the package containing the version. If the package ID contains slashes, they must be URL-escaped.
 * @param {string} versionId - The ID of the version to retrieve, such as a version string or digest. If the version ID contains slashes, they must be URL-escaped.
 */
async function getVersion(projectId, locationId, repositoryId, packageId, versionId) {
  try {
    // Construct the fully-qualified resource path for the version
    const name = client.versionPath(
      projectId,
      locationId,
      repositoryId,
      packageId,
      versionId
    );

    const request = {
      name,
      view: 'FULL',
    };

    const [version] = await client.getVersion(request);

    console.log(`Version name: ${version.name}`);
    console.log(`Description: ${version.description || 'None'}`);
    return version;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Version not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Artifact Registry error: ${err.message}`);
    }
  }
}

module.exports = { getVersion };
// [END artifactregistry_v1beta2_artifactregistry_version_get]
