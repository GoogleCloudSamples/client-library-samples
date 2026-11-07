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

// [START artifactregistry_v1beta2_artifactregistry_files_list]
'use strict';

const {ArtifactRegistryClient} = require('@google-cloud/artifact-registry');
const {status} = require('@grpc/grpc-js');

const client = new ArtifactRegistryClient();

/**
 * Use the listFiles method
 *
 * @param {string} projectId - The Google Cloud project ID hosting the repository.
 * @param {string} locationId - The Google Cloud location (region or multi-region) of the repository (for example, 'us-central1').
 * @param {string} repositoryId - The caller-chosen identifier of the Artifact Registry repository.
 */
async function listFiles(projectId, locationId, repositoryId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/repositories/${repositoryId}`;
    const request = {
      parent,
    };

    const [files] = await client.listFiles(request);
    console.log(`Retrieved ${files.length} file(s) in repository ${parent}`);
    for (const file of files) {
      console.log(`File: ${file.name}`);
      console.log(`Size: ${file.sizeBytes} bytes`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Repository not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Access denied: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      console.error(`Unexpected error: ${err.message || err}`);
    }
  }
}

module.exports = { listFiles };
// [END artifactregistry_v1beta2_artifactregistry_files_list]
