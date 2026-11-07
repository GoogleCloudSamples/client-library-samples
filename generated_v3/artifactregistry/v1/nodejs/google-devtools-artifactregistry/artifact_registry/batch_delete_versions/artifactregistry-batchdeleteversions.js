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

// [START artifactregistry_v1_artifactregistry_versions_batchdelete]
'use strict';

const {ArtifactRegistryClient} = require('@google-cloud/artifact-registry');
const {status} = require('@grpc/grpc-js');

const client = new ArtifactRegistryClient();

/**
 * Use the batchDeleteVersions method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location/region of the Artifact Registry repository (e.g., us-central1).
 * @param {string} repositoryId - The Artifact Registry repository ID.
 * @param {string} packageId - The package ID containing the versions to delete.
 * @param {string} versionId - The version ID to delete. Version aliases such as 'latest' are not allowed.
 */
async function batchDeleteVersions(projectId, locationId, repositoryId, packageId, versionId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}/packages/${packageId}`;
    const names = [
      `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}/packages/${packageId}/versions/${versionId}`,
    ];

    // Initiate the batch deletion and await completion of the long-running operation
    const [operation] = await client.batchDeleteVersions({
      parent,
      names,
    });
    await operation.promise();

    console.log(`Successfully batch deleted versions: ${names.join(', ')}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Batch delete operation failed with code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { batchDeleteVersions };
// [END artifactregistry_v1_artifactregistry_versions_batchdelete]
