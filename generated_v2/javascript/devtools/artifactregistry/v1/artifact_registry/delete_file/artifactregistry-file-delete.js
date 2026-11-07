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

// [START artifactregistry_v1_artifactregistry_file_delete]
'use strict';

const {ArtifactRegistryClient} = require('@google-cloud/artifact-registry');
const {status} = require('@grpc/grpc-js');

const client = new ArtifactRegistryClient();

/**
 * Deletes a file from an Artifact Registry repository.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The regional location of the repository (for example, 'us-central1').
 * @param {string} repositoryId - The caller-specified ID of the Artifact Registry repository. Must be a generic repository.
 * @param {string} fileId - The ID of the file to delete. If the file ID contains slashes, they must be URL-escaped (for example, 'a%2Fb%2Fc.txt').
 */
async function deleteFile(projectId, locationId, repositoryId, fileId) {
  // Construct the file resource name.
  const name = `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}/files/${fileId}`;

  try {
    // DeleteFile initiates a long-running operation.
    const [operation] = await client.deleteFile({name});
    await operation.promise();
    console.log(`Deleted file: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`File not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to delete file: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteFile };
// [END artifactregistry_v1_artifactregistry_file_delete]
