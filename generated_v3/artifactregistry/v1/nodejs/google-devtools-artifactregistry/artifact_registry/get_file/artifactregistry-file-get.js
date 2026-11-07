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

// [START artifactregistry_v1_artifactregistry_file_get]
'use strict';

const {ArtifactRegistryClient} = require('@google-cloud/artifact-registry');
const {status} = require('@grpc/grpc-js');

const client = new ArtifactRegistryClient();

/**
 * Retrieves metadata for a specific file in an Artifact Registry repository.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The regional or multi-regional location of the repository (for example, us-central1).
 * @param {string} repositoryId - The repository identifier.
 * @param {string} fileId - The file identifier or relative path within the repository. Slashes in file names should be URL-escaped (for example, '%2F').
 */
async function getFile(projectId, locationId, repositoryId, fileId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}/files/${fileId}`;
    const request = {
      name,
    };

    const [file] = await client.getFile(request);

    console.log(`File Name: ${file.name}`);
    console.log(`Size (bytes): ${file.sizeBytes}`);
    return file;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`File not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Error retrieving file: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getFile };
// [END artifactregistry_v1_artifactregistry_file_get]
