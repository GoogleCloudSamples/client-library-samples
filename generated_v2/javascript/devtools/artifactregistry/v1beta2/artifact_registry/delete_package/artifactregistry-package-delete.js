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

// [START artifactregistry_v1beta2_artifactregistry_package_delete]
'use strict';

const {ArtifactRegistryClient} = require('@google-cloud/artifact-registry');
const {status} = require('@grpc/grpc-js');

const client = new ArtifactRegistryClient();

/**
 * Use the deletePackage method
 *
 * @param {string} projectId - The Google Cloud project ID hosting the Artifact Registry repository.
 * @param {string} locationId - The Google Cloud region or multi-region of the repository (e.g., 'us-central1').
 * @param {string} repositoryId - The ID of the repository containing the package to delete.
 * @param {string} packageId - The name or identifier of the package to delete.
 */
async function deletePackage(projectId, locationId, repositoryId, packageId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}/packages/${packageId}`;

    // Initiates the long-running operation to delete the package.
    const [operation] = await client.deletePackage({name});
    console.log(`Deletion initiated for package: ${name}`);

    // Waits for the operation to complete.
    await operation.promise();
    console.log(`Package ${name} deleted successfully.`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Package not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to delete package: ${err.message}`);
    }
  }
}

module.exports = { deletePackage };
// [END artifactregistry_v1beta2_artifactregistry_package_delete]
