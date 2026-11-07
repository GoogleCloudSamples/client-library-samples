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

// [START artifactregistry_v1_artifactregistry_import_yum_artifacts]
'use strict';

const {ArtifactRegistryClient} = require('@google-cloud/artifact-registry');
const {status} = require('@grpc/grpc-js');

const client = new ArtifactRegistryClient();

/**
 * Use the importYumArtifacts method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location of the Artifact Registry repository.
 * @param {string} repositoryId - The ID of the target Yum repository in Artifact Registry.
 */
async function importYumArtifacts(projectId, locationId, repositoryId) {
  try {
    const parent = client.repositoryPath(projectId, locationId, repositoryId);

    const gcsSource = {
      uris: ['gs://example-bucket/packages/example-package.rpm'],
      useWildcards: false,
    };

    const request = {
      parent,
      gcsSource,
    };

    const [operation] = await client.importYumArtifacts(request);
    const [response] = await operation.promise();

    console.log('Yum artifacts imported successfully.');
    if (response.yumArtifacts) {
      for (const artifact of response.yumArtifacts) {
        console.log(`Imported artifact: ${artifact.name}`);
      }
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Repository or resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
    } else {
      console.error(`Failed to import Yum artifacts: ${err.message}`);
    }
  }
}

module.exports = { importYumArtifacts };
// [END artifactregistry_v1_artifactregistry_import_yum_artifacts]
