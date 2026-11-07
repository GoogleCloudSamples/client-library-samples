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

// [START artifactregistry_v1beta2_artifactregistry_import_apt_artifacts]
'use strict';

const {ArtifactRegistryClient} = require('@google-cloud/artifact-registry');
const {status} = require('@grpc/grpc-js');

const client = new ArtifactRegistryClient();

/**
 * Imports Apt artifacts into an Artifact Registry repository.
 *
 * @param {string} projectId - The Google Cloud project ID hosting the Artifact Registry repository.
 * @param {string} locationId - The regional or multi-regional location of the repository (for example, 'us-central1').
 * @param {string} repositoryId - The ID of the target Apt repository in Artifact Registry.
 */
async function importAptArtifacts(projectId, locationId, repositoryId) {
  try {
    // Construct the resource parent identifier
    const parent = client.repositoryPath(projectId, locationId, repositoryId);

    // Specify the Cloud Storage source containing the Debian package files
    const gcsSource = {
      uris: ['gs://example-bucket/path/to/package.deb'],
      useWildcards: false,
    };

    const request = {
      parent,
      gcsSource,
    };

    // Initiate the long-running import operation and wait for completion
    const [operation] = await client.importAptArtifacts(request);
    const [response] = await operation.promise();

    console.log(`Import operation completed successfully.`);
    if (response.aptArtifacts) {
      for (const artifact of response.aptArtifacts) {
        console.log(`Imported artifact URI: ${artifact.uri}`);
      }
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Target repository or source package not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`Google API operation failed with status code ${err.code}: ${err.message}`);
    } else {
      console.error(`Non-API error encountered: ${err.message}`);
    }
  }
}

module.exports = { importAptArtifacts };
// [END artifactregistry_v1beta2_artifactregistry_import_apt_artifacts]
