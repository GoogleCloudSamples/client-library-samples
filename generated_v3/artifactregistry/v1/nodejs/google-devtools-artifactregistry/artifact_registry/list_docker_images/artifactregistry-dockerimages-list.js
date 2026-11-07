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

// [START artifactregistry_v1_artifactregistry_dockerimages_list]
'use strict';

const {ArtifactRegistryClient} = require('@google-cloud/artifact-registry');
const {status} = require('@grpc/grpc-js');

const client = new ArtifactRegistryClient();

/**
 * Use the listDockerImages method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Artifact Registry location ID (for example, 'us-central1').
 * @param {string} repositoryId - The ID of the Artifact Registry repository containing the Docker images.
 */
async function listDockerImages(projectId, locationId, repositoryId) {
  try {
    const parent = client.repositoryPath(projectId, locationId, repositoryId);
    const request = {
      parent,
    };

    const [dockerImages] = await client.listDockerImages(request);

    console.log(`Retrieved ${dockerImages.length} Docker image(s) from ${parent}:`);
    for (const image of dockerImages) {
      console.log(`Image name: ${image.name}`);
      console.log(`URI: ${image.uri}`);
      console.log(`Tags: ${image.tags && image.tags.length > 0 ? image.tags.join(', ') : 'none'}`);
      console.log(`Size (bytes): ${image.imageSizeBytes}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Repository not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`Failed to list Docker images: ${err.message}`);
    }
  }
}

module.exports = { listDockerImages };
// [END artifactregistry_v1_artifactregistry_dockerimages_list]
