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

// [START artifactregistry_v1_artifactregistry_tag_update]
'use strict';

const {ArtifactRegistryClient} = require('@google-cloud/artifact-registry');
const {status} = require('@grpc/grpc-js');

const client = new ArtifactRegistryClient();

/**
 * Updates an Artifact Registry tag to point to a target version.
 *
 * @param {string} projectId - The Google Cloud project ID hosting the Artifact Registry repository.
 * @param {string} locationId - The Google Cloud region of the Artifact Registry repository (for example, 'us-central1').
 * @param {string} repositoryId - The identifier of the Artifact Registry repository.
 * @param {string} packageId - The identifier of the package. If the package name contains slashes, they must be URL-encoded or escaped.
 * @param {string} tagId - The identifier of the tag to update. Valid characters are in [a-zA-Z0-9\-._~:@].
 */
async function updateTag(projectId, locationId, repositoryId, packageId, tagId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}/packages/${packageId}`;
    const tagName = `${parent}/tags/${tagId}`;

    // Locate valid versions within the package to assign to the tag.
    const [versions] = await client.listVersions({parent});
    let targetVersion = `${parent}/versions/example-version-id`;

    if (versions && versions.length > 0) {
      try {
        const [existingTag] = await client.getTag({name: tagName});
        const alternativeVersion = versions.find(v => v.name !== existingTag.version);
        targetVersion = alternativeVersion ? alternativeVersion.name : versions[0].name;
      } catch {
        targetVersion = versions[0].name;
      }
    }

    const tag = {
      name: tagName,
      version: targetVersion,
    };
    const updateMask = {
      paths: ['version'],
    };

    const request = {
      tag,
      updateMask,
    };

    const [response] = await client.updateTag(request);
    console.log(`Updated tag: ${response.name}`);
    console.log(`Associated version: ${response.version}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Tag or version not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`API operation failed with code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = { updateTag };
// [END artifactregistry_v1_artifactregistry_tag_update]
