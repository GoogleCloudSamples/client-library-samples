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

// [START artifactregistry_v1_artifactregistry_package_update]
const {ArtifactRegistryClient} = require('@google-cloud/artifact-registry');
const {status} = require('@grpc/grpc-js');

const client = new ArtifactRegistryClient();

/**
 * Updates an Artifact Registry package.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or multi-region of the repository (for example, 'us-central1').
 * @param {string} repositoryId - The ID of the Artifact Registry repository containing the package.
 * @param {string} packageId - The ID of the package to update.
 */
async function updatePackage(projectId, locationId, repositoryId, packageId) {
  try {
    const package = {
      name: `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}/packages/${packageId}`,
      annotations: {
        'example-key': 'example-value',
      },
    };
    const updateMask = {
      paths: ['annotations'],
    };

    const [response] = await client.updatePackage({
      package,
      updateMask,
    });

    console.log(`Updated package: ${response.name}`);
    console.log(`Annotations: ${JSON.stringify(response.annotations)}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Package not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`Failed to update package: ${err.message}`);
    }
  }
}

module.exports = { updatePackage };
// [END artifactregistry_v1_artifactregistry_package_update]
