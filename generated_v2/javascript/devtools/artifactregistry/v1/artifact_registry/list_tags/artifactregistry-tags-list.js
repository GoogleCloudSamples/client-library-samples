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

// [START artifactregistry_v1_artifactregistry_tags_list]
'use strict';

const {ArtifactRegistryClient} = require('@google-cloud/artifact-registry');
const {status} = require('@grpc/grpc-js');

const client = new ArtifactRegistryClient();

/**
 * Use the listTags method
 *
 * @param {string} projectId - The Google Cloud project ID containing the Artifact Registry repository.
 * @param {string} locationId - The Google Cloud location or region of the Artifact Registry repository (e.g., 'us-central1').
 * @param {string} repositoryId - The caller-specified ID or name of an existing Artifact Registry repository.
 * @param {string} packageId - The caller-specified ID or name of an existing package in the repository.
 */
async function listTags(projectId, locationId, repositoryId, packageId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}/packages/${packageId}`;
    const request = {
      parent,
    };

    const [tags] = await client.listTags(request);
    for (const tag of tags) {
      console.log(`Tag: ${tag.name}`);
      console.log(`Version: ${tag.version}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { listTags };
// [END artifactregistry_v1_artifactregistry_tags_list]
