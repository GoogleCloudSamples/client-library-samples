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

// [START artifactregistry_v1_artifactregistry_file_update]
'use strict';

const {ArtifactRegistryClient} = require('@google-cloud/artifact-registry');
const {status} = require('@grpc/grpc-js');

const client = new ArtifactRegistryClient();

/**
 * Updates metadata for a file in an Artifact Registry repository.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The regional or multi-regional location of the repository (for example, 'us-central1').
 * @param {string} repositoryId - The ID of the existing Artifact Registry repository.
 * @param {string} fileId - The ID of the file to update (for example, 'a%2Fb%2Fc.txt'). If the file path contains slashes, they must be URL-escaped.
 */
async function updateFile(projectId, locationId, repositoryId, fileId) {
  try {
    const updateMask = {
      paths: ['annotations'],
    };
    const file = {
      name: `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}/files/${fileId}`,
      annotations: {
        env: 'staging',
      },
    };

    const request = {
      file,
      updateMask,
    };

    const [response] = await client.updateFile(request);
    console.log(`Updated file: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`File not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API call failed: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { updateFile };
// [END artifactregistry_v1_artifactregistry_file_update]
