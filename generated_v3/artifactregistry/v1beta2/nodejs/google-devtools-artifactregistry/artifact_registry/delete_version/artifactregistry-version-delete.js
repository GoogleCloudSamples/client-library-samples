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

// [START artifactregistry_v1beta2_artifactregistry_version_delete]
'use strict';

const {ArtifactRegistryClient} = require('@google-cloud/artifact-registry');
const {status} = require('@grpc/grpc-js');

const client = new ArtifactRegistryClient();

/**
 * Use the deleteVersion method
 *
 * @param {string} projectId - The Google Cloud project ID containing the Artifact Registry repository.
 * @param {string} locationId - The regional or multi-regional location of the repository.
 * @param {string} repositoryId - The caller-chosen identifier of the repository.
 * @param {string} packageId - The identifier of the package containing the version to delete.
 * @param {string} versionId - The identifier of the version to delete, retrieved from a list or get call.
 */
async function deleteVersion(projectId, locationId, repositoryId, packageId, versionId) {
  try {
    const name = client.versionPath(
      projectId,
      locationId,
      repositoryId,
      packageId,
      versionId
    );

    const [operation] = await client.deleteVersion({name});
    await operation.promise();

    console.log(`Deleted version: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Version not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { deleteVersion };
// [END artifactregistry_v1beta2_artifactregistry_version_delete]
