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

// [START artifactregistry_v1_artifactregistry_tag_get]
'use strict';

const {ArtifactRegistryClient} = require('@google-cloud/artifact-registry');
const {status} = require('@grpc/grpc-js');

const client = new ArtifactRegistryClient();

/**
 * Retrieves an Artifact Registry tag.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location of the repository (for example, 'us-central1').
 * @param {string} repositoryId - The repository identifier within the location.
 * @param {string} packageId - The package identifier within the repository. If the package ID contains slashes, they must be escaped.
 * @param {string} tagId - The tag identifier to retrieve. Characters must be in [a-zA-Z0-9\-._~:@] or URL-encoded.
 */
async function getTag(projectId, locationId, repositoryId, packageId, tagId) {
  try {
    // Construct the fully-qualified tag resource path
    const name = client.tagPath(
      projectId,
      locationId,
      repositoryId,
      packageId,
      tagId
    );

    const request = {
      name,
    };

    const [tag] = await client.getTag(request);

    console.log(`Tag Name: ${tag.name}`);
    console.log(`Resolved Version: ${tag.version}`);

    return tag;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Tag not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to retrieve tag: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getTag };
// [END artifactregistry_v1_artifactregistry_tag_get]
