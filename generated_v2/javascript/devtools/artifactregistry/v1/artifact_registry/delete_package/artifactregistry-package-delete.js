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

// [START artifactregistry_v1_artifactregistry_package_delete]
'use strict';

const {ArtifactRegistryClient} = require('@google-cloud/artifact-registry');
const {status} = require('@grpc/grpc-js');

const client = new ArtifactRegistryClient();

/**
 * Deletes a package from an Artifact Registry repository.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Artifact Registry repository location or region (for example, `us-central1`).
 * @param {string} repositoryId - The repository ID where the package is located.
 * @param {string} packageId - The ID of the package to delete. If the package ID contains slashes, the slashes must be URL-escaped.
 */
async function deletePackage(projectId, locationId, repositoryId, packageId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}/packages/${packageId}`;

    const [operation] = await client.deletePackage({name});
    await operation.promise();

    console.log(`Deleted package: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Package not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to delete package: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deletePackage };
// [END artifactregistry_v1_artifactregistry_package_delete]
