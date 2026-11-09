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

// [START artifactregistry_v1_artifactregistry_version_delete]
'use strict';

const {ArtifactRegistryClient} = require('@google-cloud/artifact-registry');
const {status} = require('@grpc/grpc-js');

const client = new ArtifactRegistryClient();

/**
 * Use the deleteVersion method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location of the repository.
 * @param {string} repositoryId - The ID of the Artifact Registry repository.
 * @param {string} packageId - The ID of the package containing the version to delete.
 * @param {string} versionId - The ID of the package version to delete.
 */
async function deleteVersion(projectId, locationId, repositoryId, packageId, versionId) {
  try {
    // Forbid version aliases to prevent accidental deletion of floating tags
    if (versionId === 'latest') {
      throw new Error('Version aliases such as "latest" are not permitted; provide an exact version ID.');
    }

    // Package identifiers containing slashes require percent-encoding in resource paths
    const formattedPackageId = packageId.replace(/\//g, '%2F');

    const name = client.versionPath(
      projectId,
      locationId,
      repositoryId,
      formattedPackageId,
      versionId
    );

    const request = {
      name,
    };

    // DeleteVersion triggers a long-running operation
    const [operation] = await client.deleteVersion(request);
    await operation.promise();

    console.log(`Successfully deleted version: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Version not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to delete version: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteVersion };
// [END artifactregistry_v1_artifactregistry_version_delete]
