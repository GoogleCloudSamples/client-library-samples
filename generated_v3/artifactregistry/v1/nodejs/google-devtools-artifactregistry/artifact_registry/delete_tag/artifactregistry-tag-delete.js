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

// [START artifactregistry_v1_artifactregistry_tag_delete]
'use strict';

const {ArtifactRegistryClient} = require('@google-cloud/artifact-registry');
const {status} = require('@grpc/grpc-js');

const client = new ArtifactRegistryClient();

/**
 * Deletes a tag from a package in an Artifact Registry repository.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Artifact Registry location ID (for example, "us-central1").
 * @param {string} repositoryId - The Artifact Registry repository ID.
 * @param {string} packageId - The Artifact Registry package ID.
 * @param {string} tagId - The Artifact Registry tag ID to delete.
 */
async function deleteTag(projectId, locationId, repositoryId, packageId, tagId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}/packages/${packageId}/tags/${tagId}`;

    const request = {
      name,
    };

    await client.deleteTag(request);
    console.log(`Deleted tag: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Tag not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteTag };
// [END artifactregistry_v1_artifactregistry_tag_delete]
