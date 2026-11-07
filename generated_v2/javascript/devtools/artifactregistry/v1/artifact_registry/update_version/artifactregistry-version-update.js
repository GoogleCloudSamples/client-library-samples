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

// [START artifactregistry_v1_artifactregistry_version_update]
'use strict';

const {ArtifactRegistryClient} = require('@google-cloud/artifact-registry');
const {status} = require('@grpc/grpc-js');

const client = new ArtifactRegistryClient();

/**
 * Updates annotations for an Artifact Registry package version.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Cloud region of the Artifact Registry repository (for example, 'us-central1').
 * @param {string} repositoryId - The Artifact Registry repository ID.
 * @param {string} packageId - The package name or ID within the repository.
 * @param {string} versionId - The version ID of the package, retrieved from an existing Version resource.
 */
async function updateVersion(projectId, locationId, repositoryId, packageId, versionId) {
  try {
    const version = {
      name: `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}/packages/${packageId}/versions/${versionId}`,
      annotations: {
        'example-key': 'example-value',
      },
    };
    const updateMask = {
      paths: ['annotations'],
    };

    const request = {
      version,
      updateMask,
    };

    const [updatedVersion] = await client.updateVersion(request);

    console.log(`Updated version: ${updatedVersion.name}`);
    console.log(`Annotations: ${JSON.stringify(updatedVersion.annotations)}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Version not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to update version: ${err.message}`);
    }
  }
}

module.exports = { updateVersion };
// [END artifactregistry_v1_artifactregistry_version_update]
